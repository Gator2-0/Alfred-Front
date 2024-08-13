
import { useState } from 'react';
import './App.css';
import DivingCard from './components/divingCard';

function App() {
  const [divingForecast, setDivingForecast] = useState(["Diving data goes here..."]);

  const handleDivingForecast = async () => {
    try {
      const response = await fetch("https://localhost:7116/DivingControllers/divingForecast");
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setDivingForecast(data);
    } catch (error) {
      console.error("Failed to fetch diving forecast:", error);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleDivingForecast}>Get diving forecast</button>
        {divingForecast && (
        <div>
          {divingForecast.map((weatherData, index) =>(
            <DivingCard weatherData={weatherData} key={index}/>
          ))}
        </div>
      )}
      </header>
    </div>
  );
}

export default App;
