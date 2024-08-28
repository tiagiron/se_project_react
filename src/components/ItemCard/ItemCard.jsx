// The WeatherCard receives data from its parent (props chain example: App → Main → WeatherCard). The weather data itself can be a big object, but we only need the temperature to render in the card. The measurement units aren’t important at this stage. We’ll only use Fahrenheit for now.
import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };
  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.link}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
