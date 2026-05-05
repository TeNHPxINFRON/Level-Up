import Layout from "../components/Layout";

import {
  useContext,
  useEffect,
  useState,
} from "react";

import { ThemeContext } from "../context/ThemeContext";

import { motion } from "framer-motion";

import { auth, db } from "../firebase";

import {
  collection,
  onSnapshot,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

function Profile() {

  const { darkMode } =
    useContext(ThemeContext);

  const [tasks, setTasks] =
    useState([]);

  const [xp, setXP] =
    useState(0);

  useEffect(() => {

    const unsubscribeAuth =
      auth.onAuthStateChanged(
        (user) => {

          if (!user) {
            return;
          }

          const unsubscribeTasks =
            onSnapshot(

              collection(
                db,
                "users",
                user.uid,
                "tasks"
              ),

              (snapshot) => {

                const taskList = [];

                let earnedXP = 0;

                snapshot.forEach(
                  (docItem) => {

                    const taskData = {
                      id: docItem.id,
                      ...docItem.data(),
                    };

                    taskList.push(taskData);

                    if (
                      taskData.xpClaimed
                    ) {

                      earnedXP +=
                        taskData.xp;
                    }
                  }
                );

                setTasks(taskList);

                setXP(earnedXP);
              }
            );

          return () =>
            unsubscribeTasks();
        }
      );

    return () =>
      unsubscribeAuth();

  }, []);

  async function resetProgress() {

    try {

      const user =
        auth.currentUser;

      if (!user) {
        return;
      }

      const querySnapshot =
        await getDocs(

          collection(
            db,
            "users",
            user.uid,
            "tasks"
          )
        );

      const promises = [];

      querySnapshot.forEach(
        (docItem) => {

          promises.push(

            updateDoc(

              doc(
                db,
                "users",
                user.uid,
                "tasks",
                docItem.id
              ),

              {
                completed: false,
                xpClaimed: false,
              }
            )
          );
        }
      );

      await Promise.all(promises);

      alert("Progress Reset");

    } catch (error) {

      console.log(error);
    }
  }

  const completedTasks =
    tasks.filter(
      (task) => task.completed
    ).length;

  const pendingTasks =
    tasks.filter(
      (task) => !task.completed
    ).length;

  const level =
    Math.floor(xp / 100) + 1;

  return (

    <Layout>

      <motion.div

        initial={{
          opacity: 0,
          y: 20,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.3,
        }}

      >

        <h1 className="text-4xl font-bold mb-8">
          Profile
        </h1>

        <div
          className={`p-8 rounded-2xl shadow mb-8 ${
            darkMode
              ? "bg-gray-800 text-white"
              : "bg-white"
          }`}
        >

          <h2 className="text-2xl font-bold mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-400">
            Track your productivity journey.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div
            className={`p-6 rounded-2xl shadow ${
              darkMode
                ? "bg-gray-800 text-white"
                : "bg-white"
            }`}
          >

            <h3 className="text-gray-500 mb-2">
              Total Tasks
            </h3>

            <p className="text-4xl font-bold">
              {tasks.length}
            </p>

          </div>

          <div
            className={`p-6 rounded-2xl shadow ${
              darkMode
                ? "bg-gray-800 text-white"
                : "bg-white"
            }`}
          >

            <h3 className="text-gray-500 mb-2">
              Completed
            </h3>

            <p className="text-4xl font-bold text-green-500">
              {completedTasks}
            </p>

          </div>

          <div
            className={`p-6 rounded-2xl shadow ${
              darkMode
                ? "bg-gray-800 text-white"
                : "bg-white"
            }`}
          >

            <h3 className="text-gray-500 mb-2">
              Pending
            </h3>

            <p className="text-4xl font-bold text-red-500">
              {pendingTasks}
            </p>

          </div>

          <div
            className={`p-6 rounded-2xl shadow ${
              darkMode
                ? "bg-gray-800 text-white"
                : "bg-white"
            }`}
          >

            <h3 className="text-gray-500 mb-2">
              Current Level
            </h3>

            <p className="text-4xl font-bold text-yellow-500">
              Level {level}
            </p>

          </div>

        </div>

        <button
          onClick={resetProgress}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl mt-8 transition"
        >
          Reset Progress
        </button>

      </motion.div>

    </Layout>
  );
}

export default Profile;