import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({
  weatherData,
  handleAddClick,
  isMobileMenuOpened,
  toggleMobileMenu,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <nav className="header__content">
        <Link to="/">
          <img className="header__logo" src={logo} alt="Logo" />
        </Link>
        <p className="header__location">
          {currentDate}, {weatherData.city}
        </p>
        {isMobileMenuOpened ? (
          <button
            className="header__menu_close"
            type="button"
            onClick={toggleMobileMenu}
          />
        ) : (
          <button
            className="header__menu"
            type="button"
            onClick={toggleMobileMenu}
          />
        )}
        <div
          className={`header__nav-container ${isMobileMenuOpened && "mobile-menu"}`}
        >
          <ToggleSwitch />
          <button
            type="button"
            className="header__button"
            onClick={handleAddClick}
          >
            + Add Clothes
          </button>
          <Link to="/profile" className="header__user-container">
            <p className="header__username">Tia Giron</p>
            <img src={avatar} alt="Avatar" className="header__avatar" />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
