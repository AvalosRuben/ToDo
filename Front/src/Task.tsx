import type { Tasks } from "./Tasks";

function Task({ name, description, done }: Tasks) {
  return (
    <div className="w-full h-30 rounded-2xl border border-slate-500 bg-slate-400 p-4 flex gap-4 justify-center text-lg text-slate-200 font-bold">
      <div className="w-full h-full flex flex-col gap-4 justify-center">
        <p className={`${done ? "line-through" : ""}`}>Task: {name}</p>
        <p className={`${done ? "line-through" : ""}`}>
          Description: {description}
        </p>
      </div>
      <div className="flex flex-col gap-2 ml-auto mr-2">
        <button
          className="px-2 rounded-lg border border-slate-500 hover:bg-slate-500"
          onClick={() => console.log("Toggle Done!")}
        >
          ✓
        </button>
      </div>
    </div>
  );
}

export default Task;
