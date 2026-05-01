import { useState } from "react";

import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  function handleSignup() {

    if (!name || !email || !password) {

      alert("Please fill all fields");

      return;
    }

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    navigate("/");
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">

      <div className="bg-white p-10 rounded-2xl shadow w-[400px]">

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
            className="border p-3 rounded-lg"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="border p-3 rounded-lg"
          />

          <button
            onClick={handleSignup}
            className="bg-black text-white py-3 rounded-lg"
          >
            Signup
          </button>

        </div>

      </div>

    </div>
  );
}

export default Signup;