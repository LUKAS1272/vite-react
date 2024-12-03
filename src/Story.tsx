import { useState, useEffect } from 'react';
import './App.css';

function Story() {
  // Stav pro příběh, volby a statistiky
  const [storyText, setStoryText] = useState<string>('');  // Text příběhu
  const [options, setOptions] = useState<string[]>([]);  // Možnosti pro tlačítka
  const [chosenOption, setChosenOption] = useState<string | null>(null);  // Vybraná volba
  const [health, setHealth] = useState<number>();
  const [strength, setStrength] = useState<number>();

  useEffect(() => {
    fetch('/db.json') // Cesta k vašemu db.json
      .then((response) => response.json())
      .then((data) => {
        const firstStory = data.story[0]; // Předpokládáme, že máte pouze jeden příběh
        setStoryText(firstStory.text);
        setOptions(firstStory.options);  // Nastavíme možnosti pro tlačítka
        setHealth(data.stats.health);  // Nastavení health
        setStrength(data.stats.strength);  // Nastavení strength
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleButtonClick = (choice: string) => {
    setChosenOption(choice);
    setStoryText(`You chose: ${choice}`); // Měníme text příběhu na základě volby
  };

  return (
    <>
      <p id="TextBoxStory">{storyText}</p>
      <div>
        <p>Health: {health}</p>
        <p>Strength: {strength}</p>
      </div>
      <div>
        {/* Mapujeme možnosti do tlačítek */}
        {options.map((option, index) => (
          <button key={index} onClick={() => handleButtonClick(option)}>
            {option}
          </button>
        ))}
      </div>
    </>
  );
}

export default Story;
