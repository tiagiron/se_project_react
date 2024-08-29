import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";

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
        <img className="header__logo" src={logo} alt="Logo" />

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
          <button
            type="button"
            className="header__button"
            onClick={handleAddClick}
          >
            + Add Clothes
          </button>
          <div className="header__user-container">
            <p className="header__username">Tia Giron</p>
            <img src={avatar} alt="Avatar" className="header__avatar" />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
