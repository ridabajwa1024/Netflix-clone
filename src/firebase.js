import { initializeApp } from "firebase/app";
import { 
  createUserWithEmailAndPassword, 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { 
  setDoc, 
  doc, 
  getFirestore, 
  getDoc 
} from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDwcEEwTxAdEPQBgUhjBCFO2tYfW-Vd6T0",
  authDomain: "netflix-clone-5b379.firebaseapp.com",
  projectId: "netflix-clone-5b379",
  storageBucket: "netflix-clone-5b379.firebasestorage.app",
  messagingSenderId: "567051877853",
  appId: "1:567051877853:web:e55165b2ad390589294a34",
  measurementId: "G-D9Q64C1NK8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const user  = auth.currentUser;
if(user){
  const uid = user.uid;
  alert("firebase uid " , uid)
}
const db = getFirestore(app);

// ✅ SIGN UP (role = "user" OR "admin")
const signUp = async (name, email, password, role = "user") => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Save user data in Firestore (single collection)
    await setDoc(doc(db, "admin", user.uid), {
      uid: user.uid,
      name,
      email,
      role, // "admin" or "user"
      authProvider: "local",
    });

    return { user, role };
  } catch (error) {
    console.log("SignUp Error:", error);
    throw error;
  }
};

// ✅ LOGIN
const login = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// ✅ LOGOUT
const logout = () => {
  return signOut(auth);
};

// ✅ GET USER ROLE
const getUserRole = async (uid) => {
  try {
    const userSnap = await getDoc(doc(db, "users", uid));
    if (userSnap.exists()) {
      return userSnap.data().role; // "admin" or "user"
    }
    return "guest";
  } catch (error) {
    console.error("Get user role error:", error);
    return "guest";
  }
};

export { auth, db, signUp, login, logout, getUserRole };
