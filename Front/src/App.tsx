import { useEffect, useState, type ChangeEvent } from "react";
import Task from "./Task";
import type { Tasks } from "./Tasks";

function App() {
  const [tasks, setTasks] = useState<Tasks[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const HandleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const HandleNameDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/get-tasks");

      if (!response.ok) {
        throw new Error(`Error ${response.status}: Failed to fetch tasks`);
      }

      const data: Tasks[] = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const HandlePostTask = async () => {
    const payload = {
      name: name,
      description: description,
    };

    try {
      const response = await fetch("http://localhost:8080/create-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      const newTask = await response.json();
      console.log("Created task: ", newTask);

      await fetchTasks();

      setName("");
      setDescription("");
    } catch (error) {
      console.log("Error creating task: ", error);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-slate-300">
      <div className="flex flex-col gap-10 justify-center h-screen py-20 w-1/2 items-center">
        <h1 className="text-5xl font-bold text-slate-600">To Do List</h1>
        <div className="flex w-full gap-3 items-center">
          <button
            className="text-2xl font-semibold text-slate-600 bg-slate-400 w-full p-4 rounded-2xl hover:bg-slate-500"
            onClick={HandlePostTask}
          >
            Add Task
          </button>
          <div className="flex flex-col gap-2 justify-center w-full">
            <p className="text-xl font-semibold text-slate-600">Task Name</p>
            <input
              className="w-full outline-none border border-slate-500 rounded-2xl p-2 text-slate-500 font-semibold"
              placeholder="Name..."
              onChange={HandleNameDescription}
            />
          </div>
          <div className="flex flex-col gap-2 justify-center w-full">
            <p className="text-xl font-semibold text-slate-600">Description</p>
            <input
              className="w-full outline-none border border-slate-500 rounded-2xl p-2 text-slate-500 font-semibold"
              placeholder="Description"
              onChange={HandleChangeDescription}
            />
          </div>
        </div>
        {loading && (
          <p className="text-6xl text-slate-600 font-bold">Loading...</p>
        )}
        {error && (
          <p className="text-6xl text-pink-500 font-bold">ERROR: {error}</p>
        )}
        {tasks?.length === 0 ? (
          <p>No task found :c</p>
        ) : (
          <div className="h-full w-full flex flex-col items-center gap-5 max-h-300 min-h-150 overflow-auto scrollbar-thin">
            {tasks?.map((t) => (
              <Task name={t.name} description={t.description} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
