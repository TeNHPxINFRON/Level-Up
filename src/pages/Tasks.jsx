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
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function Tasks() {

  const { darkMode } =
    useContext(ThemeContext);

  const [tasks, setTasks] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [priority, setPriority] =
    useState("Medium");

  const [totalXP, setTotalXP] =
    useState(() => {

      const savedXP =
        localStorage.getItem("xp");

      return savedXP
        ? JSON.parse(savedXP)
        : 0;
    });

  const [searchTerm, setSearchTerm] =
    useState("");

  const [filterStatus, setFilterStatus] =
    useState("All");

  const [sortOrder, setSortOrder] =
    useState("Default");

  useEffect(() => {

    fetchTasks();

  }, []);

  async function fetchTasks() {

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

      const taskList = [];

      querySnapshot.forEach((doc) => {

        taskList.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setTasks(taskList);

    } catch (error) {

      console.log(error);
    }
  }

  useEffect(() => {

    localStorage.setItem(
      "xp",
      JSON.stringify(totalXP)
    );

  }, [totalXP]);

  let filteredTasks = [...tasks];

  filteredTasks = filteredTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(
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

      title,
      category,
      priority,
      xp: xpReward,
      completed: false,
      xpClaimed: false,
    };

    try {

      const user =
        auth.currentUser;

      await addDoc(

        collection(
          db,
          "users",
          user.uid,
          "tasks"
        ),

        newTask
      );

      fetchTasks();

    } catch (error) {

      console.log(error);
    }

    setTitle("");
    setCategory("");
    setPriority("Medium");
  }

  async function deleteTask(id) {

    try {

      const user =
        auth.currentUser;

      await deleteDoc(

        doc(
          db,
          "users",
          user.uid,
          "tasks",
          id
        )
      );

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  }

  async function toggleComplete(id) {

    try {

      const user =
        auth.currentUser;

      const task =
        tasks.find(
          (task) => task.id === id
        );

      if (!task) {
        return;
      }

      if (
        !task.completed &&
        !task.xpClaimed
      ) {

        setTotalXP(
          (prevXP) =>
            prevXP + task.xp
        );
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

      fetchTasks();

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
            className="bg-black text-white px-6 rounded-lg"
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