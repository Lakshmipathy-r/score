import { db } from "./firebase";
import { collection, addDoc, getDocs, query, where, orderBy } from "firebase/firestore";

export const addReview = async (reviewData) => {
  /*
  reviewData = {
    gigId,
    fromId,
    toId,
    rating,
    comment,
    fromName,
    fromRole,
    fromPhotoURL
  }
  */
  const newReview = {
    ...reviewData,
    createdAt: new Date().toISOString()
  };
  
  const docRef = await addDoc(collection(db, "reviews"), newReview);
  return { id: docRef.id, ...newReview };
};

export const getReviewsForUser = async (uid) => {
  // Can't orderBy createdAt without composite index natively if where clause has different field...
  const q = query(
    collection(db, "reviews"),
    where("toId", "==", uid)
  );
  
  const querySnapshot = await getDocs(q);
  const reviews = [];
  querySnapshot.forEach((doc) => {
    reviews.push({ id: doc.id, ...doc.data() });
  });
  
  return reviews.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
};
