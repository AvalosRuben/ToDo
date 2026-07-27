interface TaskProps {
  taskName: string;
  description: string;
}

function Task({ taskName, description }: TaskProps) {
  return (
    <div className="w-full h-30 rounded-2xl border border-slate-500 bg-slate-400 p-4 flex flex-col gap-4 justify-center text-lg text-slate-200 font-bold">
      <p>Task: {taskName}</p>
      <p>Description: {description}</p>
    </div>
  );
}

export default Task;
