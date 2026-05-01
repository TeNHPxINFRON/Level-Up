import { signInWithPopup } from "firebase/auth";

import { GoogleAuthProvider } from "firebase/auth";

import { auth } from "../firebase";

import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  async function handleGoogleLogin() {

    try {

      const provider =
        new GoogleAuthProvider();

      await signInWithPopup(
        auth,
        provider
      );

      navigate("/dashboard");

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