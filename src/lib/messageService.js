import { db } from "./firebase";
import { collection, doc, addDoc, getDoc, getDocs, updateDoc, setDoc, query, where, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";

// Helper: safely parse any timestamp (Firestore timestamp, ISO string, milliseconds, null) to a JS Date
export const parseMessageDate = (timestamp) => {
  if (!timestamp) return new Date();
  if (timestamp.seconds !== undefined) return new Date(timestamp.seconds * 1000);
  if (typeof timestamp === 'number') return new Date(timestamp);
  const parsed = new Date(timestamp);
  return isNaN(parsed.getTime()) ? new Date() : parsed;
};

// Helper: format time for individual message bubbles (e.g. "10:45 AM")
export const formatMessageTime = (timestamp) => {
  const d = parseMessageDate(timestamp);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Helper: format date & time for conversation list last message preview
export const formatContactTime = (timestamp) => {
  if (!timestamp) return "";
  const d = parseMessageDate(timestamp);
  const now = new Date();
  
  const isSameDay = d.getFullYear() === now.getFullYear() &&
                    d.getMonth() === now.getMonth() &&
                    d.getDate() === now.getDate();
  if (isSameDay) {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = d.getFullYear() === yesterday.getFullYear() &&
                      d.getMonth() === yesterday.getMonth() &&
                      d.getDate() === yesterday.getDate();
  if (isYesterday) {
    return "Yesterday";
  }

  if (d.getFullYear() === now.getFullYear()) {
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
  return d.toLocaleDateString([], { year: '2-digit', month: 'numeric', day: 'numeric' });
};

// Helper: format date header dividers for chat message history grouping
export const getFormattedDateHeader = (timestamp) => {
  const d = parseMessageDate(timestamp);
  const now = new Date();

  const isSameDay = d.getFullYear() === now.getFullYear() &&
                    d.getMonth() === now.getMonth() &&
                    d.getDate() === now.getDate();
  if (isSameDay) return "Today";

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = d.getFullYear() === yesterday.getFullYear() &&
                      d.getMonth() === yesterday.getMonth() &&
                      d.getDate() === yesterday.getDate();
  if (isYesterday) return "Yesterday";

  if (d.getFullYear() === now.getFullYear()) {
    return d.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
  }
  return d.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
};

export const getConversations = async (uid) => {
  const q = query(
    collection(db, "conversations"),
    where("participants", "array-contains", uid)
  );
  
  const querySnapshot = await getDocs(q);
  const conversations = [];
  querySnapshot.forEach((doc) => {
    conversations.push({ id: doc.id, ...doc.data() });
  });
  
  return conversations.sort((a, b) => {
    const timeA = parseMessageDate(a.updatedAt || a.lastMessageTime).getTime();
    const timeB = parseMessageDate(b.updatedAt || b.lastMessageTime).getTime();
    return timeB - timeA;
  });
};

export const subscribeToConversations = (uid, callback) => {
  const q = query(
    collection(db, "conversations"),
    where("participants", "array-contains", uid)
  );
  
  return onSnapshot(q, (snapshot) => {
    const convs = [];
    snapshot.forEach((doc) => {
      convs.push({ id: doc.id, ...doc.data() });
    });
    convs.sort((a, b) => {
      const timeA = parseMessageDate(a.updatedAt || a.lastMessageTime).getTime();
      const timeB = parseMessageDate(b.updatedAt || b.lastMessageTime).getTime();
      return timeB - timeA;
    });
    callback(convs);
  });
};

export const subscribeToMessages = (conversationId, callback) => {
  const q = query(
    collection(db, `conversations/${conversationId}/messages`),
    orderBy("timestamp", "asc")
  );
  
  return onSnapshot(q, (snapshot) => {
    const msgs = [];
    snapshot.forEach((doc) => {
      msgs.push({ id: doc.id, ...doc.data() });
    });
    // Ensure strict ascending chronological ordering by parsed date & time
    msgs.sort((a, b) => {
      const timeA = parseMessageDate(a.timestamp).getTime();
      const timeB = parseMessageDate(b.timestamp).getTime();
      return timeA - timeB;
    });
    callback(msgs);
  });
};

export const sendMessage = async (conversationId, senderId, text, participants = []) => {
  const msgData = {
    senderId,
    text,
    timestamp: serverTimestamp() // B-07: use serverTimestamp for consistent Firestore ordering
  };
  
  const convRef = doc(db, "conversations", conversationId);
  const convSnap = await getDoc(convRef);
  const nowIso = new Date().toISOString();
  
  if (!convSnap.exists() && participants.length > 0) {
    // Create conversation if it doesn't exist yet
    await setDoc(convRef, {
      participants,
      lastMessage: text,
      updatedAt: nowIso
    });
  } else if (convSnap.exists()) {
    // Update last message
    await updateDoc(convRef, {
      lastMessage: text,
      updatedAt: nowIso
    });
  }

  const messagesRef = collection(db, `conversations/${conversationId}/messages`);
  await addDoc(messagesRef, msgData);
};

export const editMessage = async (conversationId, messageId, newText) => {
  const msgRef = doc(db, `conversations/${conversationId}/messages`, messageId);
  await updateDoc(msgRef, {
    text: newText,
    isEdited: true,
    updatedAt: new Date().toISOString()
  });
};


