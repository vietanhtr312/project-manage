import { TaskCard } from "./TaskCard";

const Column = ({ title, tasks }) => {
  return (
    <div className="bg-[#F1F1F1] rounded-lg p-4 shadow min-h-[300px]">
      <h3 className="font-bold text-blue-800 mb-4 text-sm">{title}</h3>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} title={task.title} progress={task.progress} />
        ))}
      </div>
      <button className="font-bold mt-3 text-[#B5ABAB]">+ Add task</button>
    </div>
  );
};

export default Column;
