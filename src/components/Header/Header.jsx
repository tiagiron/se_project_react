import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import AppContext from "../../contexts/AppContext";

function Header({
  weatherData,
  handleAddClick,
  toggleMobileMenu,
  openLogInModal,
  openRegisterModal,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);
  const { isLoggedIn } = useContext(AppContext);

  const getInitial = (name) => {
    if (name) {
      return name[0].toUpperCase();
    }
    return "?";
  };

  return (
    <header className="header">
      <nav className="header__content">
        <Link to="/">
          <img className="header__logo" src={logo} alt="Logo" />
        </Link>
        <p className="header__location">
          {currentDate}, {weatherData.city}
        </p>

        {isLoggedIn ? (
          <div className="header__right-content">
            <button
              className="header__menu"
              type="button"
              onClick={toggleMobileMenu}
            />

            <div className="header__nav-container mobile-menu">
              <ToggleSwitch />
              <button
                type="button"
                className="header__button"
                onClick={handleAddClick}
              >
                + Add Clothes
              </button>
              <Link to="/profile" className="header__user-container">
                <p className="header__username">{currentUser.name}</p>
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt="Avatar"
                    className="header__avatar"
                  />
                ) : (
                  <div className="header__avatar-default">
                    {getInitial(currentUser.name)}
                  </div>
                )}
              </Link>
            </div>
          </div>
        ) : (
          <div className="header__guest-nav">
            <ToggleSwitch />
            <button
              onClick={openRegisterModal}
              type="button"
              className="header__register"
            >
              Sign Up
            </button>
            <button
              onClick={openLogInModal}
              type="button"
              className="header__login"
            >
              Log In
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
