import { useContext, useState } from "react";
import WBSBoard from "../components/wbs/WbsBoard";
import { ProjectContext } from "../context/ProjectContext";
import AddProjectPopup from "../components/wbs/AddProjectPopup";
import AddMemberPopup from "../components/wbs/AddMemberPopup";

export const WbsPage = () => {
  const { projectStructure, createModule, createTask, assignTask } =
    useContext(ProjectContext);
  const [moduleId, setModuleId] = useState(null);
  const [parentId, setParentId] = useState(null);
  const [showAddProjectPopup, setShowAddProjectPopup] = useState(false);
  const [showAddMemberPopup, setShowAddMemberPopup] = useState(false);
  const [taskId, setTaskId] = useState(null);

  const handleAddToProject = (type, data) => {
    if (type === "module") {
      createModule(projectStructure._id, data);
    } else if (type === "submodule") {
      createModule(moduleId, data, moduleId);
    } else if (type === "task") {
      if (moduleId === parentId) createTask(moduleId, data);
      else createTask(moduleId, data, parentId);
    }
    setModuleId(null);
    setParentId(null);
  };

  return (
    <>
      <div className="bg-white/10 backdrop-blur-md">
        <WBSBoard
          setModuleId={setModuleId}
          setParentId={setParentId}
          setShowAddProjectPopup={setShowAddProjectPopup}
          setTaskId={setTaskId}
          setShowAddMemberPopup={setShowAddMemberPopup}
          onAdd={assignTask}
        />
      </div>
      {showAddProjectPopup && (
        <AddProjectPopup
          type={moduleId ? (parentId ? "task" : "submodule") : "module"}
          onClose={() => setShowAddProjectPopup(false)}
          onAdd={handleAddToProject}
          assignTask={assignTask}
          taskId={taskId}
        />
      )}
      {showAddMemberPopup && (
        <AddMemberPopup
          onClose={() => setShowAddMemberPopup(false)}
          onAdd={assignTask}
          taskId={taskId}
        />
      )}
    </>
  );
};
