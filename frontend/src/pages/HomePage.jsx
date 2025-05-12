import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectFolder from "../components/project/ProjectFolder";

function HomePage() {
  const [message, setMessage] = useState("");

  return <>
    <div className=''>
      <ProjectFolder />
    </div></>;
}

export default HomePage;
