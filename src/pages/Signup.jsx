import { useState } from "react";

import {
  useNavigate,
  Link,
} from "react-router-dom";

function Signup() {

  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  function handleSignup() {

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {

      alert(
        "Please fill all fields"
      );

      return;
    }

    if (
      password !==
      confirmPassword
    ) {

      alert(
        "Passwords do not match"
      );

      return;
    }

    if (password.length < 6) {

      alert(
        "Password must be at least 6 characters"
      );

      return;
    }

    const userData = {
      name,
      email,
      password,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    alert(
      "Signup Successful!"
    );

    navigate("/");
  }

  return (

    <div className="min-h-screen bg-black flex items-center justify-center px-4">

      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-4xl font-bold mb-8 text-center">

          Signup

        </h1>

        <div className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            className="border p-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
          />

          <button
            onClick={handleSignup}
            className="bg-black hover:bg-gray-800 text-white py-3 rounded-lg transition"
          >

            Signup

          </button>

          <p className="text-center text-sm text-gray-600">

            Already have an account?

            {" "}

            <Link
              to="/login"
              className="font-semibold hover:underline"
            >

              Login

            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Signup;