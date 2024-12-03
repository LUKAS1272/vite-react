import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const GenareteStory = async() =>{
    <p>Submit</p>
  }
  return (
    <>
      <h2>Zadejte téma příběhu</h2>
      <input type="text" placeholder="Napište téma zde"/>
      <br></br>
      <br></br>
      <button onClick={GenareteStory}>Submit</button>
    </>
  );
}

export default App;
