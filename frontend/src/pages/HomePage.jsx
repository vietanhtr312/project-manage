import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectFolder from "../components/project/ProjectFolder";

function HomePage() {
  const [message, setMessage] = useState("");

  return <>
    <div className='mt-16 ml-[250px] p-6'>
      <ProjectFolder />
    </div></>;
}

export default HomePage;
