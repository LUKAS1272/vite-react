import { useState } from 'react'
import Story from './Story';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { changeStat } from './DatabaseControl'

changeStat(110, 50);

function App() {
  const [showStory, setShowStory] = useState(false);  // Stav pro zobrazení Story komponenty

  const GenerateStory = () => {
    const txtInput = document.getElementById('MainTxtInput') as HTMLInputElement;
    if (txtInput && txtInput.value.trim() !== '') {
      setShowStory(true);  // Po kliknutí na Submit se Story komponenta zobrazí
    }
  };

  return (
    <>
      {!showStory && (
        <div>
          <h2>Zadejte téma příběhu</h2>
          <input id="MainTxtInput" type="text" placeholder="Napište téma zde" />
          <br />
          <br />
          <button onClick={GenerateStory} id="SubmitBtn">Submit</button>
        </div>
      )}

      {showStory && <Story />} {/* Zobrazí Story komponentu pouze pokud je showStory true */}
    </>
  );
}

export default App;
