import "./SideBar.css";
import avatar from "../../assets/avatar.png";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ openEditProfileModal, handleLogOut }) {
  const currentUser = useContext(CurrentUserContext);

  const getInitial = (name) => {
    if (name) {
      return name[0].toUpperCase();
    }
    return "?";
  };

  return (
    <div className="sidebar">
      {currentUser.avatar ? (
        <img
          src={currentUser.avatar}
          alt="Avatar"
          className="sidebar__avatar"
        />
      ) : (
        <div className="sidebar__avatar-default">
          {getInitial(currentUser.name)}
        </div>
      )}

      <p className="sidebar__username">{currentUser.name}</p>
      <div className="sidebar__buttons">
        <button
          className="sidebar__edit-profile"
          type="button"
          onClick={openEditProfileModal}
        >
          Change profile data
        </button>
        <button
          className="sidebar__logout"
          type="button"
          onClick={handleLogOut}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
