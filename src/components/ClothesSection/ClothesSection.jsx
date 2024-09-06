import "./ClothesSection.css";
import { clothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ handleCardClick, handleCardDelete }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your items</p>
        <button className="clothes-section__add-button">+ Add new</button>
      </div>
      <ul className="clothes-section__cards-list">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              handleCardDelete={handleCardDelete}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
