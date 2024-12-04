import "./MobileMenu.css";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function MobileMenu({ toggleMobileMenu, isMobileMenuOpened, handleAddClick }) {
  return (
    <div className="mobile__menu">
      <div
        className={`mobile__user-container ${
          isMobileMenuOpened ? "mobile__user-container_active" : ""
        }`}
      >
        <button
          onClick={toggleMobileMenu}
          type="button"
          className="mobile__close"
        ></button>
        <p className="header__username"></p>
        <img src={avatar} alt="Avatar" className="mobile__avatar" />
        <button
          type="button"
          onClick={handleAddClick}
          className="mobile__add-clothes-btn"
        >
          + Add clothes
        </button>
        <ToggleSwitch />
      </div>
    </div>
  );
}

export default MobileMenu;
