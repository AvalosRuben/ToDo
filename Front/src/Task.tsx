import type { Tasks } from "./Tasks";

type TaskProps = Tasks & {
  onToggle?: () => void;
};

function Task({ name, description, done, id, onToggle }: TaskProps) {
  const toggleDone = async () => {
    try {
      const response = await fetch(`http://localhost:8080/toggle-done/${id}`, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error(
          `Error ${response.status}: Failed to toggle done status on task with id:${id}`,
        );
      }
      if (onToggle) onToggle();
    } catch (error) {
      console.log("Error toggling task: ", error);
    }
  };

  return (
    <div className="w-full h-30 rounded-2xl border border-slate-500 bg-slate-400 p-4 flex gap-4 justify-center text-lg text-slate-200 font-bold">
      <div className="w-full h-full flex flex-col gap-4 justify-center">
        <p className={` transition-all ${done ? "line-through" : ""}`}>
          Task: {name}
        </p>
        <p className={`transition-all ${done ? "line-through" : ""}`}>
          Description: {description}
        </p>
      </div>
      <div className="flex flex-col gap-2 ml-auto mr-2">
        <button
          className="px-2 rounded-lg border border-slate-500 hover:bg-slate-500"
          onClick={toggleDone}
        >
          ✓
        </button>
        <button
          className="px-2 rounded-lg border border-slate-500 hover:bg-slate-500"
          onClick={() => console.log("Delete!")}
        >
          Del
        </button>
      </div>
    </div>
  );
}

export default Task;
