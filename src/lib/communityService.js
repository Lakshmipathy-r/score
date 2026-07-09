import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  increment,
  query,
  where,
  orderBy,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

const VALID_CATEGORIES = [
  "Web Development",
  "Machine Learning",
  "UI/UX",
  "Resume & Placements",
  "General Doubts",
];

// ─── Threads ──────────────────────────────────────────────────────────────────

/**
 * Create a new community thread in Firestore.
 */
export const createCommunityThread = async (category, title, description, user) => {
  if (!VALID_CATEGORIES.includes(category)) {
    throw new Error(`Invalid category: ${category}`);
  }
  const docRef = await addDoc(collection(db, "communityThreads"), {
    category,
    title,
    description,
    createdBy: {
      uid: user.uid,
      name: user.name || "Anonymous",
      role: user.role || "student",
    },
    uplinkCount: 0,
    repliesCount: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};

/**
 * Get all threads for a category, ordered by newest first.
 */
export const getThreadsByCategory = async (category) => {
  const q = query(
    collection(db, "communityThreads"),
    where("category", "==", category),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
    createdAt: d.data().createdAt?.toDate().toISOString() || new Date().toISOString(),
  }));
};

/**
 * Get all threads (all categories), ordered by newest first.
 */
export const getAllThreads = async () => {
  const q = query(collection(db, "communityThreads"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
    createdAt: d.data().createdAt?.toDate().toISOString() || new Date().toISOString(),
  }));
};

/**
 * Get a single thread by ID.
 */
export const getThreadById = async (threadId) => {
  const docRef = doc(db, "communityThreads", threadId);
  const snap = await getDoc(docRef);
  if (!snap.exists()) throw new Error("Thread not found");
  const data = snap.data();
  return {
    id: snap.id,
    ...data,
    createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
  };
};

/**
 * Subscribe to real-time updates for a thread's replies.
 */
export const subscribeToThreadReplies = (threadId, callback) => {
  const q = query(
    collection(db, `communityThreads/${threadId}/replies`),
    orderBy("createdAt", "asc")
  );
  return onSnapshot(q, (snap) => {
    const replies = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
      createdAt: d.data().createdAt?.toDate().toISOString() || new Date().toISOString(),
    }));
    callback(replies);
  });
};

// ─── Replies ─────────────────────────────────────────────────────────────────

/**
 * Add a reply to a community thread.
 */
export const addReplyToThread = async (threadId, user, content) => {
  if (!content?.trim()) throw new Error("Reply content cannot be empty");

  const replyRef = await addDoc(
    collection(db, `communityThreads/${threadId}/replies`),
    {
      content,
      userId: user.uid,
      userName: user.name || "Anonymous",
      userRole: user.role || "student",
      createdAt: serverTimestamp(),
    }
  );

  // Increment reply count on the parent thread
  await updateDoc(doc(db, "communityThreads", threadId), {
    repliesCount: increment(1),
    updatedAt: serverTimestamp(),
  });

  return replyRef.id;
};

// ─── Uplinks ─────────────────────────────────────────────────────────────────

/**
 * Uplink (upvote) a thread. Increments uplinkCount atomically.
 */
export const uplinkThread = async (threadId) => {
  const threadRef = doc(db, "communityThreads", threadId);
  await updateDoc(threadRef, {
    uplinkCount: increment(1),
  });
  const updated = await getDoc(threadRef);
  return updated.data()?.uplinkCount ?? 0;
};
