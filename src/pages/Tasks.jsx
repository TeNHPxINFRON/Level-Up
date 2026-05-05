import {
  useState,
  useEffect,
  useContext,
} from "react";

import Layout from "../components/Layout";
import TaskCard from "../components/TaskCard";

import { ThemeContext } from "../context/ThemeContext";

import { auth, db } from "../firebase";

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

function Tasks() {

  const { darkMode } =
    useContext(ThemeContext);

  const [tasks, setTasks] =
    useState([]);

  const [totalXP, setTotalXP] =
    useState(0);

  const [title, setTitle] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [priority, setPriority] =
    useState("Medium");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [filterStatus, setFilterStatus] =
    useState("All");

  const [sortOrder, setSortOrder] =
    useState("Default");

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

  let filteredTasks = [...tasks];

  filteredTasks =
    filteredTasks.filter((task) =>
      task.title
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
    );

  if (filterStatus === "Completed") {

    filteredTasks =
      filteredTasks.filter(
        (task) => task.completed
      );
  }

  if (filterStatus === "Pending") {

    filteredTasks =
      filteredTasks.filter(
        (task) => !task.completed
      );
  }

  if (sortOrder === "High") {

    filteredTasks.sort((a, b) => {

      const priorityValue = {
        High: 3,
        Medium: 2,
        Low: 1,
      };

      return (
        priorityValue[b.priority] -
        priorityValue[a.priority]
      );
    });
  }

  async function addTask() {

    if (!title || !category) {

      alert(
        "Please fill all fields"
      );

      return;
    }

    const user =
      auth.currentUser;

    if (!user) {
      return;
    }

    let xpReward = 20;

    if (priority === "High") {
      xpReward = 50;
    }

    if (priority === "Low") {
      xpReward = 10;
    }

    const newTask = {

      createdAt: Date.now(),

      title,

      category,

      priority,

      xp: xpReward,

      completed: false,

      xpClaimed: false,
    };

    try {

      await addDoc(

        collection(
          db,
          "users",
          user.uid,
          "tasks"
        ),

        newTask
      );

      setTitle("");
      setCategory("");
      setPriority("Medium");

    } catch (error) {

      console.log(error);
    }
  }

  async function deleteTask(id) {

    try {

      const user =
        auth.currentUser;

      if (!user) {
        return;
      }

      await deleteDoc(

        doc(
          db,
          "users",
          user.uid,
          "tasks",
          id
        )
      );

    } catch (error) {

      console.log(error);
    }
  }

  async function toggleComplete(id) {

    try {

      const user =
        auth.currentUser;

      if (!user) {
        return;
      }

      const task =
        tasks.find(
          (task) => task.id === id
        );

      if (!task) {
        return;
      }

      await updateDoc(

        doc(
          db,
          "users",
          user.uid,
          "tasks",
          id
        ),

        {
          completed:
            !task.completed,

          xpClaimed:
            task.xpClaimed ||
            !task.completed,
        }
      );

    } catch (error) {

      console.log(error);
    }
  }

  return (

    <Layout>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Tasks
        </h1>

        <div className="bg-black text-white px-6 py-3 rounded-xl">
          Total XP: {totalXP}
        </div>

      </div>

      <div
        className={`p-6 rounded-xl shadow mb-6 ${
          darkMode
            ? "bg-gray-800"
            : "bg-white"
        }`}
      >

        <div className="flex flex-col xl:flex-row gap-4 mb-4">

          <input
            type="text"
            placeholder="Search Tasks"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
            className={`p-3 rounded-lg w-full border ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white"
            }`}
          />

          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(
                e.target.value
              )
            }
            className={`p-3 rounded-lg border ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white"
            }`}
          >

            <option>All</option>
            <option>Completed</option>
            <option>Pending</option>

          </select>

          <select
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(
                e.target.value
              )
            }
            className={`p-3 rounded-lg border ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white"
            }`}
          >

            <option>Default</option>
            <option>High</option>

          </select>

        </div>

        <div className="flex flex-col xl:flex-row gap-4">

          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className={`p-3 rounded-lg w-full border ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white"
            }`}
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
            className={`p-3 rounded-lg w-full border ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white"
            }`}
          />

          <select
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target.value
              )
            }
            className={`p-3 rounded-lg border ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white"
            }`}
          >

            <option>Low</option>
            <option>Medium</option>
            <option>High</option>

          </select>

          <button
            onClick={addTask}
            className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition"
          >

            Add

          </button>

        </div>

      </div>

      <div className="flex flex-col gap-4">

        {filteredTasks.map((task) => (

          <TaskCard
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleComplete={toggleComplete}
          />

        ))}

      </div>

    </Layout>
  );
}

export default Tasks;