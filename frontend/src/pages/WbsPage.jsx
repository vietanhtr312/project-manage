import { useContext } from "react";
import WBSBoard from "../components/wbs/WbsBoard";
import { ProjectContext } from "../context/ProjectContext";

export const WbsPage = () => {
  const { projectStructure } = useContext(ProjectContext);
  
  return <div className="bg-white/10 backdrop-blur-md">
    <WBSBoard projectStructure={projectStructure}/>
  </div>;
};
