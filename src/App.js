
import { useState } from 'react';
import './App.css';
import DivingCard from './components/divingCard';

function App() {
  const [divingForecast, setDivingForecast] = useState(["Diving data goes here..."]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch("https://localhost:7089/Nlp/process-query",
        {
          method: 'POST', // Specify the method
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json' // Specify the return content type
          },
          body: JSON.stringify(inputValue) 
        });

      if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setDivingForecast(data.data);
      
    } catch (error) {
      console.error("Failed to fetch diving forecast:", error);
    }
  };

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
        <form onSubmit={handleSubmit}>
              <label>
                  Enter your query:
                  <input
                      type="text" 
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder="Type your question here..."
                  />
              </label>
              <button type="submit">Submit</button>
          </form>
          <button onClick={handleDivingForecast}>Get diving forecast</button>
          {divingForecast && (
            <div className='card-container'>
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
