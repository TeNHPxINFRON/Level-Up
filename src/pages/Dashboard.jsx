import Layout from "../components/Layout";

import {
  useContext,
  useEffect,
  useState,
} from "react";

import { ThemeContext } from "../context/ThemeContext";

import { motion } from "framer-motion";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { auth, db } from "../firebase";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

function Dashboard() {

  const { darkMode } =
    useContext(ThemeContext);

  const [tasks, setTasks] =
    useState([]);

  const [totalXP, setTotalXP] =
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

                let xp = 0;

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

                      xp += taskData.xp;
                    }
                  }
                );

                setTasks(taskList);

                setTotalXP(xp);
              }
            );

          return () =>
            unsubscribeTasks();
        }
      );

    return () =>
      unsubscribeAuth();

  }, []);

  const level =
    Math.floor(totalXP / 100) + 1;

  const nextLevelXP =
    level * 100;

  const currentLevelXP =
    totalXP % 100;

  const completedTasks =
    tasks.filter(
      (task) => task.completed
    );

  const pendingTasks =
    tasks.filter(
      (task) => !task.completed
    );

  const chartData = [
    {
      name: "Completed",
      value: completedTasks.length,
    },
    {
      name: "Pending",
      value: pendingTasks.length,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#ef4444",
  ];

  return (

    <Layout>

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <motion.div
          whileHover={{
            scale: 1.03,
          }}
          className={`p-6 rounded-xl shadow ${
            darkMode
              ? "bg-gray-800 text-white"
              : "bg-white"
          }`}
        >

          <h2 className="text-gray-500 mb-2">
            Total Tasks
          </h2>

          <p className="text-4xl font-bold">
            {tasks.length}
          </p>

        </motion.div>

        <motion.div
          whileHover={{
            scale: 1.03,
          }}
          className={`p-6 rounded-xl shadow ${
            darkMode
              ? "bg-gray-800 text-white"
              : "bg-white"
          }`}
        >

          <h2 className="text-gray-500 mb-2">
            Completed Tasks
          </h2>

          <p className="text-4xl font-bold text-green-500">
            {completedTasks.length}
          </p>

        </motion.div>

        <motion.div
          whileHover={{
            scale: 1.03,
          }}
          className={`p-6 rounded-xl shadow ${
            darkMode
              ? "bg-gray-800 text-white"
              : "bg-white"
          }`}
        >

          <h2 className="text-gray-500 mb-2">
            Total XP
          </h2>

          <p className="text-4xl font-bold">
            {totalXP}
          </p>

        </motion.div>

        <motion.div
          whileHover={{
            scale: 1.03,
          }}
          className={`p-6 rounded-xl shadow ${
            darkMode
              ? "bg-gray-800 text-white"
              : "bg-white"
          }`}
        >

          <h2 className="text-gray-500 mb-2">
            Current Level
          </h2>

          <p className="text-4xl font-bold text-yellow-500">
            Level {level}
          </p>

        </motion.div>

      </div>

      <div
        className={`p-6 rounded-xl shadow mb-8 ${
          darkMode
            ? "bg-gray-800 text-white"
            : "bg-white"
        }`}
      >

        <div className="flex justify-between mb-3">

          <h2 className="text-2xl font-semibold">
            Level Progress
          </h2>

          <span>
            {currentLevelXP} / 100 XP
          </span>

        </div>

        <div className="w-full bg-gray-300 rounded-full h-5 overflow-hidden">

          <div
            className="bg-yellow-500 h-5"
            style={{
              width: `${currentLevelXP}%`,
            }}
          />

        </div>

        <p className="mt-3 text-sm text-gray-500">

          Reach

          {" "}

          <span className="font-bold">
            Level {level + 1}
          </span>

          {" "}

          at

          {" "}

          <span className="font-bold">
            {nextLevelXP} XP
          </span>

        </p>

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 min-w-0">

        <div
          className={`p-6 rounded-xl shadow min-h-[450px] ${
            darkMode
              ? "bg-gray-800 text-white"
              : "bg-white"
          }`}
        >

          <h2 className="text-2xl font-semibold mb-4">
            Task Overview
          </h2>

          <div className="w-full h-[350px] min-w-0">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={chartData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  label
                >

                  {chartData.map(
                    (entry, index) => (

                      <Cell
                        key={index}
                        fill={COLORS[index]}
                      />

                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        <div
          className={`p-6 rounded-xl shadow ${
            darkMode
              ? "bg-gray-800 text-white"
              : "bg-white"
          }`}
        >

          <h2 className="text-2xl font-semibold mb-4">
            Recent Tasks
          </h2>

          <div className="flex flex-col gap-4">

            {tasks.length > 0 ? (

              tasks.slice(0, 5).map(
                (task) => (

                  <div
                    key={task.id}
                    className={`border p-4 rounded-lg ${
                      darkMode
                        ? "bg-gray-700 border-gray-600"
                        : "bg-gray-50"
                    }`}
                  >

                    <h3 className="font-semibold">
                      {task.title}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {task.category}
                    </p>

                  </div>

                )
              )

            ) : (

              <p className="text-gray-500">
                No tasks available
              </p>

            )}

          </div>

        </div>

      </div>

    </Layout>

  );
}

export default Dashboard;