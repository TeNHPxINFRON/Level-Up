import Layout from "../components/Layout";

import { useContext } from "react";

import { ThemeContext } from "../context/ThemeContext";

import { motion } from "framer-motion";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Analytics() {

  const { darkMode } =
    useContext(ThemeContext);

  const tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

  const totalXP =
    JSON.parse(localStorage.getItem("xp")) || 0;

  const completedTasks =
    tasks.filter(
      (task) => task.completed
    );

  const pendingTasks =
    tasks.filter(
      (task) => !task.completed
    );

  const completionRate =
    tasks.length > 0
      ? (
          (completedTasks.length /
            tasks.length) *
          100
        ).toFixed(1)
      : 0;

  const highPriority =
    tasks.filter(
      (task) =>
        task.priority === "High"
    ).length;

  const mediumPriority =
    tasks.filter(
      (task) =>
        task.priority === "Medium"
    ).length;

  const lowPriority =
    tasks.filter(
      (task) =>
        task.priority === "Low"
    ).length;

  const chartData = [
    {
      name: "High",
      tasks: highPriority,
    },
    {
      name: "Medium",
      tasks: mediumPriority,
    },
    {
      name: "Low",
      tasks: lowPriority,
    },
  ];

  return (

    <Layout>

      <h1 className="text-3xl font-bold mb-6">
        Analytics
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
              ? "bg-gray-800 text-white"
              : "bg-white"
          }`}
        >

          <h2 className="text-gray-500 mb-2">
            Completed
          </h2>

          <p className="text-4xl font-bold text-green-500">
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
              ? "bg-gray-800 text-white"
              : "bg-white"
          }`}
        >

          <h2 className="text-gray-500 mb-2">
            Pending
          </h2>

          <p className="text-4xl font-bold text-red-500">
            {pendingTasks.length}
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

      </div>

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
              ? "bg-gray-800 text-white"
              : "bg-white"
          }`}
        >

          <h2 className="text-2xl font-semibold mb-6">
            Productivity Score
          </h2>

          <div className="flex flex-col gap-4">

            <div>

              <div className="flex justify-between mb-2">

                <span>
                  Completion Rate
                </span>

                <span>
                  {completionRate}%
                </span>

              </div>

              <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">

                <div
                  className="bg-green-500 h-4"
                  style={{
                    width: `${completionRate}%`,
                  }}
                />

              </div>

            </div>

            <div className="mt-4 text-lg">

              You completed

              {" "}

              <span className="font-bold">
                {completedTasks.length}
              </span>

              {" "}

              out of

              {" "}

              <span className="font-bold">
                {tasks.length}
              </span>

              {" "}

              tasks.

            </div>

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
          className={`p-6 rounded-xl shadow min-h-[450px] ${
            darkMode
              ? "bg-gray-800 text-white"
              : "bg-white"
          }`}
        >

          <h2 className="text-2xl font-semibold mb-6">
            Priority Distribution
          </h2>

          <div className="w-full h-[320px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <BarChart
                data={chartData}
              >

                <XAxis
                  dataKey="name"
                  stroke={
                    darkMode
                      ? "#ffffff"
                      : "#000000"
                  }
                />

                <YAxis
                  stroke={
                    darkMode
                      ? "#ffffff"
                      : "#000000"
                  }
                />

                <Tooltip />

                <Bar
                  dataKey="tasks"
                  fill="#3b82f6"
                  radius={[8, 8, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </motion.div>

      </div>

    </Layout>

  );
}

export default Analytics;