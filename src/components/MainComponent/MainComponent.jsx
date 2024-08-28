import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";
import "./MainComponent.css";

// The Main component
// The Main component is a wrapper for the main content of the app. It includes:

// The WeatherCard component shows the current temperature. Weather data is sent here, in addition to the Header, as props. Note that the weather data is not stored in Main, so you need to pass it down from the App component.
// Clothing item cards, which are filtered based on the current weather. Wrap the ItemCard component into the unordered list and use the filter() and map() methods.

function Main({ weatherData, handleCardClick }) {
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp.F}&deg;F / You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
