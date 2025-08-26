import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, getDoc } from "firebase/firestore";
import Admin from "../Pages/Admin/Admin";

const AdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkadmin = async () => {
      try {
        const auth = getAuth();
        const db = getFirestore();
        const user = auth.currentUser;
        if (user) {
          const userdoc = await getDoc(doc(db, "admin", user.uid));
          if (userdoc.exists() && userdoc.data().role === "admin") {
            setIsAdmin(true);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    checkadmin();
  }, []);
  if (loading) {
    return <p>Loading...</p>; // or a spinner
  }

  if (!isAdmin) {
    return <Navigate to="/login" />; // redirect non-admins
  }

  return children; // show admin page
};

export default AdminRoute;
