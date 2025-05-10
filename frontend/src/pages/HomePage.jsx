import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

function HomePage() {
  const [message, setMessage] = useState('');

  return <>
    <Navbar />
    <div className='mt-16 ml-[250px] p-6'>Home Page</div></>;
}

export default HomePage;
