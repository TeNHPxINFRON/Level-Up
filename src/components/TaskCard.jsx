import { useContext } from "react";

import { motion } from "framer-motion";

import { ThemeContext } from "../context/ThemeContext";

function TaskCard({
  task,
  deleteTask,
  toggleComplete,
}) {

  const { darkMode } =
    useContext(ThemeContext);

  return (

    <motion.div

      whileHover={{
        scale: 1.02,
      }}

      initial={{
        opacity: 0,
        y: 15,
      }}

      animate={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: 0.3,
      }}

      className={`p-4 rounded-xl shadow flex justify-between items-center ${
        task.completed
          ? "bg-green-100"
          : darkMode
          ? "bg-gray-800 text-white"
          : "bg-white"
      }`}
    >

      <div>

        <h2
          className={`text-xl font-semibold ${
            task.completed
              ? "line-through text-gray-500"
              : ""
          }`}
        >
          {task.title}
        </h2>

        <p className="text-gray-500">
          {task.category}
        </p>

        <p className="text-sm mt-1">
          Priority: {task.priority}
        </p>

        <p className="text-sm">
          XP Reward: {task.xp}
        </p>

      </div>

      <div className="flex gap-3">

        <button
          onClick={() =>
            toggleComplete(task.id)
          }
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          {task.completed
            ? "Undo"
            : "Complete"}
        </button>

        <button
          onClick={() =>
            deleteTask(task.id)
          }
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Delete
        </button>

      </div>

    </motion.div>
  );
}

export default TaskCard;