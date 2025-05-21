import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [projectId, setProjectId] = useState(null);
  const [projects, setProjects] = useState([]);
  const [onRefresh, setOnRefresh] = useState(false);

  return (
    <AppContext.Provider
      value={{
        projectId,
        setProjectId,
        projects,
        setProjects,
        onRefresh,
        setOnRefresh,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
