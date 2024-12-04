import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  handleAddClick,
  handleCardClick,
  clothingItems,
  selectedCard,
  openEditProfileModal,
  handleLogout,
  addCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          openEditProfileModal={openEditProfileModal}
          handleLogOut={handleLogout}
        />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          handleAddClick={handleAddClick}
          handleCardClick={handleCardClick}
          clothingItems={clothingItems}
          selectedCard={selectedCard}
          addCardLike={addCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
