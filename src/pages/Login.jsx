import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Logged in:", user);
  } else {
    console.log("Not logged in");
  }
});

import {
  useEffect,
} from "react";

import { auth } from "../firebase";

import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(

        auth,

        (user) => {

          if (user) {

            navigate("/");
          }
        }
      );

    return () => unsubscribe();

  }, [navigate]);

  async function handleGoogleLogin() {

    try {

      const provider =
        new GoogleAuthProvider();

      await signInWithPopup(auth, provider);

    } catch (error) {

      console.log(error);
    }
  }

  return (

    <div className="flex justify-center items-center min-h-screen bg-black">

      <div className="bg-white p-10 rounded-2xl w-96">

        <h1 className="text-4xl font-bold mb-8 text-center">

          LevelUp

        </h1>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-black text-white py-3 rounded-xl"
        >

          Continue with Google

        </button>

      </div>

    </div>
  );
}

export default Login;