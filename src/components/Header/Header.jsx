// This is a child component of App.jsx. The component includes:

// A logo
// The current date that can be generated using the Date() object: javascript const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });
// The current location (see Section 5 for details)
// An “Add Clothes” button that opens ModalWithForm
// The user’s name and avatar (both are hardcoded at this point)
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";

function Header({ weatherData, handleAddClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <img className="header__logo" src={logo} />
      <p className="header__location">
        {currentDate}, {weatherData.city}
      </p>
      <button
        type="button"
        className="header__button"
        id="navbar"
        onClick={handleAddClick}
      >
        + Add Clothes
      </button>
      <div className="header__user-container" id="navbar">
        <p className="header__username">Tia Giron</p>
        <img src={avatar} alt="Name" className="header__avatar" />
      </div>
      {/* Working on Responsive Design */}
      <div className="header__dropdown-container">
        <button className="header__dropbtn"></button>
        <div className="header__dropdown-content">
          <div className="header__user-container-dropdown">
            <p className="header__username-dropdown">Tia Giron</p>
            <img src={avatar} alt="Name" className="header__avatar-dropdown" />
          </div>
          <button
            type="button"
            className="header__button-dropdown"
            onClick={handleAddClick}
          >
            + Add Clothes
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
