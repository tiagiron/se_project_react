// The WeatherCard receives data from its parent (props chain example: App → Main → WeatherCard). The weather data itself can be a big object, but we only need the temperature to render in the card. The measurement units aren’t important at this stage. We’ll only use Fahrenheit for now.
import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F}&deg;F</p>
      <img
        src={weatherOption?.url}
        alt={`Card showing ${weatherOption?.day ? "day" : "night"}-time ${weatherOption?.condition} weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
