import type { Tasks } from "./Tasks";

function Task({ name, description, done }: Tasks) {
  return (
    <div className="w-full h-30 rounded-2xl border border-slate-500 bg-slate-400 p-4 flex flex-col gap-4 justify-center text-lg text-slate-200 font-bold">
      <p className={`${done ? "line-through" : ""}`}>Task: {name}</p>
      <p className={`${done ? "line-through" : ""}`}>
        Description: {description}
      </p>
    </div>
  );
}

export default Task;
