import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {

  const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [priority, setPriority] = useState("medium");
const createTask = async (e) => {
  e.preventDefault();

  try {

    const token = localStorage.getItem("token");

    await axios.post(
      "http://localhost:5000/api/tasks",
      {
        title,
        description,
        priority,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchTasks();

    setTitle("");
    setDescription("");
    setPriority("medium");

  } catch (error) {
    console.log(error);
  }
};

  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>

      <h1>Dashboard</h1>
      <form onSubmit={createTask}>

  <input
    type="text"
    placeholder="Task title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />

  <br /><br />

  <textarea
    placeholder="Task description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
  />

  <br /><br />

  <select
    value={priority}
    onChange={(e) => setPriority(e.target.value)}
  >
    <option value="low">Low</option>
    <option value="medium">Medium</option>
    <option value="high">High</option>
  </select>

  <br /><br />

  <button type="submit">
    Create Task
  </button>

</form>

      {
        tasks.map((task) => (

          <div
            key={task._id}
            style={{
              border: "1px solid black",
              padding: "10px",
              margin: "10px",
            }}
          >

            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>Status: {task.status}</p>

            <p>Priority: {task.priority}</p>

          </div>
        ))
      }

    </div>
  );
};

export default Dashboard;