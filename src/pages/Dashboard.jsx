import Layout from "../components/Layout";

import { useContext } from "react";

import { ThemeContext } from "../context/ThemeContext";

import { motion } from "framer-motion";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {

  const { darkMode } =
    useContext(ThemeContext);

  const tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

  const totalXP =
    JSON.parse(localStorage.getItem("xp")) || 0;

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

          className={`p-6 rounded-xl shadow ${
            darkMode
              ? "bg-gray-800"
              : "bg-white"
          }`}
        >

          <h2 className="text-gray-500 mb-2">
            Total Tasks
          </h2>

          <p className="text-3xl md:text-4xl font-bold">
            {tasks.length}
          </p>

        </motion.div>

        <motion.div

          whileHover={{
            scale: 1.03,
          }}

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

          className={`p-6 rounded-xl shadow ${
            darkMode
              ? "bg-gray-800"
              : "bg-white"
          }`}
        >

          <h2 className="text-gray-500 mb-2">
            Completed Tasks
          </h2>

          <p className="text-3xl md:text-4xl font-bold text-green-500">
            {completedTasks.length}
          </p>

        </motion.div>

        <motion.div

          whileHover={{
            scale: 1.03,
          }}

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

          className={`p-6 rounded-xl shadow ${
            darkMode
              ? "bg-gray-800"
              : "bg-white"
          }`}
        >

          <h2 className="text-gray-500 mb-2">
            Total XP
          </h2>

          <p className="text-3xl md:text-4xl font-bold">
            {totalXP}
          </p>

        </motion.div>

        <motion.div

          whileHover={{
            scale: 1.03,
          }}

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

          className={`p-6 rounded-xl shadow ${
            darkMode
              ? "bg-gray-800"
              : "bg-white"
          }`}
        >

          <h2 className="text-gray-500 mb-2">
            Current Level
          </h2>

          <p className="text-3xl md:text-4xl font-bold text-yellow-500">
            Level {level}
          </p>

        </motion.div>

      </div>

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

        className={`p-6 rounded-xl shadow mb-8 ${
          darkMode
            ? "bg-gray-800"
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

        <div className="w-full bg-gray-300 rounded-full h-5">

          <div
            className="bg-yellow-500 h-5 rounded-full"
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

      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <motion.div

          whileHover={{
            scale: 1.02,
          }}

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

          className={`p-6 rounded-xl shadow ${
            darkMode
              ? "bg-gray-800"
              : "bg-white"
          }`}
        >

          <h2 className="text-2xl font-semibold mb-4">
            Task Overview
          </h2>

          <div className="h-80">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={100}
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

        </motion.div>

        <motion.div

          whileHover={{
            scale: 1.02,
          }}

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

          className={`p-6 rounded-xl shadow ${
            darkMode
              ? "bg-gray-800"
              : "bg-white"
          }`}
        >

          <h2 className="text-2xl font-semibold mb-4">
            Recent Tasks
          </h2>

          <div className="flex flex-col gap-4">

            {tasks.slice(0, 5).map(
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
            )}

          </div>

        </motion.div>

      </div>

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

        className={`p-6 rounded-xl shadow mt-8 ${
          darkMode
            ? "bg-gray-800"
            : "bg-white"
        }`}
      >

        <h2 className="text-2xl font-semibold mb-6">
          Achievements
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          <div className="bg-yellow-500 text-black p-5 rounded-xl">

            <h3 className="text-xl font-bold mb-2">
              Beginner
            </h3>

            <p>
              Earn 100 XP
            </p>

          </div>

          <div className="bg-gray-400 text-black p-5 rounded-xl">

            <h3 className="text-xl font-bold mb-2">
              Consistent
            </h3>

            <p>
              Complete 10 Tasks
            </p>

          </div>

          <div className="bg-orange-500 text-black p-5 rounded-xl">

            <h3 className="text-xl font-bold mb-2">
              Focus Master
            </h3>

            <p>
              Finish 5 Focus Sessions
            </p>

          </div>

        </div>

      </motion.div>

    </Layout>
  );
}

export default Dashboard;