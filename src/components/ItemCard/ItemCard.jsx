import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import active_like_button from "../../assets/like-button-active.png";
import like_button from "../../assets/like-button.png";

function ItemCard({ item, onCardClick, addCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  // Check if the item was liked by the current user
  // The likes array should be an array of ids
  const isLiked = item.likes.some((id) => id === currentUser._id);

  // Create a variable which you then set in `className` for the like button
  const itemLikeButtonClassName = `card__like-button ${currentUser._id ? "card__like-button-visible" : "card__like-button-hidden"}`;

  const handleCardClick = () => {
    onCardClick(item);
  };
  const handleLike = () => {
    addCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <div className="card__container">
        <h2 className="card__name">{item.name}</h2>
        <img
          className={itemLikeButtonClassName}
          type="button"
          aria-label="like"
          onClick={handleLike}
          src={isLiked ? active_like_button : like_button}
          alt={isLiked ? "liked" : "not liked"}
        />
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
