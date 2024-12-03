import { useState } from 'react';
import './App.css';

function Story() {
  const [story, setStory] = useState<string>('Pribeh'); 
  const [health, setHealth] = useState<number>(100);
  const [armor, setArmor] = useState<number>(100); 
  const [strength, setStrength] = useState<number>(100);
  const [inventory, SetInventory] = useState<string>('');

  const buttonsArray: string[] = ['Choice1', 'Choice2', 'Choice3'];

  const handleButtonClick = (choice: string) => {
    setStory(`You chose: ${choice}`);
  };

  return (
    <>
      <p id="TextBoxStory">{story}</p>
      <div>
        <p>Health: {health}</p>
        <p>Armor: {armor}</p>
        <p>Strength: {strength}</p>
        <p>Inventory: {inventory}</p>
      </div>
      <div>
        {buttonsArray.map((goal, index) => (
          <button key={index} onClick={() => handleButtonClick(goal)}>
            {goal}
          </button>
        ))}
      </div>
    </>
  );
}

export default Story;
