import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  onAuthStateChanged,
  updatePassword as firebaseUpdatePassword,
  updateProfile as firebaseUpdateProfile
} from "firebase/auth";
import { auth } from "./firebase";
import { getUserProfile, createUserProfile } from "./userService";

// Listen to auth state changes
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      try {
        const userProfile = await getUserProfile(firebaseUser.uid);
        callback({ ...firebaseUser, ...userProfile });
      } catch (error) {
        console.error("Error fetching user profile:", error);
        callback(firebaseUser); // Fallback
      }
    } else {
      callback(null);
    }
  });
};

export const registerWithEmail = async (email, password, role, profileData) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  
  // Create profile in Firestore
  await createUserProfile(user.uid, email, role, profileData);
  
  // Send email verification
  await sendEmailVerification(user);
  
  return user;
};

export const loginWithEmail = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const loginWithGoogle = async (role = "student") => {
  const provider = new GoogleAuthProvider();
  const userCredential = await signInWithPopup(auth, provider);
  const user = userCredential.user;
  
  // Check if profile exists, if not create one
  try {
    const existingProfile = await getUserProfile(user.uid);
    if (!existingProfile) {
      await createUserProfile(user.uid, user.email, role, {
        fullName: user.displayName,
        photoURL: user.photoURL,
      });
    }
  } catch (error) {
    if (error.message.includes("does not exist")) {
        await createUserProfile(user.uid, user.email, role, {
          fullName: user.displayName,
          photoURL: user.photoURL,
        });
    } else {
        throw error;
    }
  }
  
  return user;
};

export const logoutUser = async () => {
  await signOut(auth);
};

export const sendVerification = async () => {
  if (auth.currentUser) {
    await sendEmailVerification(auth.currentUser);
  }
};

export const updatePassword = async (newPassword) => {
  if (auth.currentUser) {
    await firebaseUpdatePassword(auth.currentUser, newPassword);
  }
};

export const updateAuthProfile = async (displayName, photoURL) => {
  if (auth.currentUser) {
    await firebaseUpdateProfile(auth.currentUser, { displayName, photoURL });
  }
};
