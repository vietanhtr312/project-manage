import { TaskCard } from "./TaskCard";

const Column = ({ title, tasks }) => {
  return (
    <div className="bg-[#F1F1F1] rounded-lg p-4 shadow min-h-[300px]">
      <h3 className="font-bold text-blue-800 mb-4 text-sm">{title}</h3>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            title={task.name}
            progress={task.progress || 0}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
