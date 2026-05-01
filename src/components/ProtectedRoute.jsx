import { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase";

function ProtectedRoute({ children }) {

  const [user, setUser] =
    useState(undefined);

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(

        auth,

        (currentUser) => {

          setUser(currentUser);
        }
      );

    return () => unsubscribe();

  }, []);

  if (user === undefined) {

    return (

      <div className="flex justify-center items-center min-h-screen">

        Loading...

      </div>
    );
  }

  if (!user) {

    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;