import { TaskCard } from "./TaskCard";

const Column = ({ title, tasks, fetchTasks }) => {
  return (
    <div className="flex flex-col bg-[#F1F1F1] rounded-lg p-4 shadow w-full">
      <h3 className="font-bold text-blue-800 mb-4 text-sm">{title}</h3>
      <div className="flex flex-col gap-4">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} fetchTasks={fetchTasks} />
        ))}
      </div>
    </div>
  );
};

export default Column;
