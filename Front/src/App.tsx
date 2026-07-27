import Task from "./Task";

function App() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-slate-300">
      <div className="flex flex-col gap-10 justify-center h-screen py-20 w-1/2 items-center">
        <h1 className="text-5xl font-bold text-slate-600">To Do List</h1>
        <div className="h-full w-full flex flex-col items-center gap-5 max-h-300 min-h-150 overflow-auto">
          <Task taskName="Task name 1" description="description 1" />
          <Task taskName="Task name 2" description="description 2" />
          <Task taskName="Task name 3" description="description 3" />
          <Task taskName="Task name 4" description="description 4" />
          <Task taskName="Task name 5" description="description 5" />
          <Task taskName="Task name 6" description="description 6" />
          <Task taskName="Task name 7" description="description 7" />
          <Task taskName="Task name 8" description="description 8" />
        </div>
      </div>
    </div>
  );
}

export default App;
