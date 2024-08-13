import React from 'react';
import './divingCard.css';
import defaultImage from '../assets/weatherConditions/default.jpg';
import sunnyImage from '../assets/weatherConditions/Sunny.jpg';
import cloudyImage from '../assets/weatherConditions/Cloudy.jpg';
import partlyCloudyImage from '../assets/weatherConditions/PartlyCloudy.jpg';
import rainShowersImage from '../assets/weatherConditions/RainShowers.jpg';
import stormImage from '../assets/weatherConditions/Storms.jpg';
import rainImage from '../assets/weatherConditions/Rain.jpg';
import fogImage from '../assets/weatherConditions/fog.jpg';

export default function DivingCard({ weatherData }) {
    // Placeholder for image URL based on weather condition
  const getImageUrl = (condition) => {
    switch (condition) {
      case 'Clear sky':
      case 'Mainly clear':
        return sunnyImage;
      case 'partly cloudy':
        return partlyCloudyImage;
      case 'overcast':
        return cloudyImage;
      case 'Fog':
      case 'depositing rime fog':
        return fogImage;
      case "Rain showers Slight":
      case "Rain Slight":
        return rainShowersImage;
      case "Rain showers moderate":
        return rainImage;
      case 'Thunderstorm: Slight or moderate':
      case 'Rain showers violent':
        return stormImage;
      // Add more cases for different conditions
      default:
        return defaultImage;
    }
  };

  const imageUrl = getImageUrl(weatherData.condition);

  return (
    <div className="card">
      {<img src={imageUrl} alt={weatherData.condition} className="card-image" />}
      {weatherData.grade}/6
      <div className="card-content">
        <h3 className="card-title">{weatherData.date}</h3>
        <div className='card-widget-container'>
            <div className='widget'> {weatherData.temperarture}</div>
            <div className='widget'> {weatherData.precipitation}mm</div>
            <div className='widget'> {weatherData.windSpeed}km/h {weatherData.windCardinal}</div>
            <div className='widget'> {weatherData.waveHeight}m {weatherData.waveCardinal}</div>
        </div>
      </div>
    </div>
  );
}
