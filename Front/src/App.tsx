import { useEffect, useState } from "react";
import Task from "./Task";
import type { Tasks } from "./Tasks";

function App() {
  const [tasks, setTasks] = useState<Tasks[]>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
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

    fetchTasks();
  }, []);
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-slate-300">
      <div className="flex flex-col gap-10 justify-center h-screen py-20 w-1/2 items-center">
        <h1 className="text-5xl font-bold text-slate-600">To Do List</h1>
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
