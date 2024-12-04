import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import React from "react";

function ClothesSection({
  handleAddClick,
  handleCardClick,
  clothingItems,
  addCardLike,
}) {
  const isOwn = clothingItems === CurrentUserContext._id;
  const clothesSectionClassName = `clothes-section__cards-list ${isOwn ? "clothes-section__cards-list_visible" : "clothes-section__cards-list_hidden"}`;
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your items</p>
        <button
          className="clothes-section__add-button"
          onClick={handleAddClick}
        >
          + Add new
        </button>
      </div>
      <ul className={clothesSectionClassName}>
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              addCardLike={addCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
