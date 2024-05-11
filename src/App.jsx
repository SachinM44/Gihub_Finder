import React, { useState } from 'react';
import { RecoilRoot, useRecoilState } from 'recoil'; // Import RecoilRoot
import axios from 'axios';
import GithubCard from '../Githubcard';
import { userAtom } from './atoms';
import './App.css'

function App() {
  const [userName, setUserName] = useState('');
  const [user, setUser] = useRecoilState(userAtom);
  let timeOut;

  const changeInput = (e) => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      setUserName(e.target.value);
    }, 6000);
  };

  console.log("Outside function");

  async function generateUser() {
    setUser({});
    try {
      const res = await axios.get(`https://api.github.com/users/${userName}`);
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  console.log(user);

  return (
    <>
      <h1>Github Profile Card Generator</h1>
      <div>
        <input type="text" onChange={changeInput} placeholder='Enter your github user ID' />
        <button onClick={generateUser} >Generate Profile</button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
        {<GithubCard user={user} />}
      </div>
    </>
  )
}

// Wrap your App component with RecoilRoot
function Root() {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
}

export default Root;
