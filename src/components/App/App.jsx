import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
//css
import "./App.css";
//components
import Header from "../Header/Header";
import MobileMenu from "../MobileMenu/MobileMenu";
import Main from "../MainComponent/MainComponent";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
//utils
import * as auth from "../../utils/auth";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import api from "../../utils/api";
import { coordinates, APIkey } from "../../utils/constants";
import { setToken, getToken, removeToken } from "../../utils/token";
//contexts
import AppContext from "../../contexts/AppContext";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function App() {
  // const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: "" },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedInLoading, setIsLoggedInLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    email: "",
    name: "",
    avatar: "",
  });

  //open and close

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const openConfirmationModal = () => {
    setActiveModal("delete-confirmation");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpened((prev) => !prev);
  };

  const openLoginModal = () => {
    setActiveModal("login");
  };

  const openRegisterModal = () => {
    setActiveModal("register");
  };

  const openEditProfileModal = () => {
    setActiveModal("edit-profile");
  };

  //handlers

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleAddItemSubmit = (item, resetForm) => {
    const token = getToken();
    if (!token) {
      console.error("User not authorized to add items");
      return;
    }
    setIsLoading(true);
    api
      .addItem(item, token)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        resetForm();
        closeActiveModal();
      })
      .catch(console.error("Error adding item"))
      .finally(() => setIsLoading(false));
  };

  const handleCardDelete = (card) => {
    const token = getToken();
    if (!token) {
      console.error("User not authorized to delete card");
      return;
    }
    api
      .removeItem(card._id, token)
      .then(() => {
        setClothingItems((cards) => cards.filter((c) => c._id !== card._id));
        setSelectedCard({});
        closeActiveModal();
      })
      .catch(console.error("Error deleting card"));
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = getToken();
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        api
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item)),
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        api
          // the first argument is the card's id
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item)),
            );
          })
          .catch((err) => console.log(err));
  };

  const handleRegistration = (email, password, name, avatar) => {
    auth
      .register(email, password, name, avatar)
      .then(() => {
        handleLogin({ email, password });
        closeActiveModal();
      })
      .catch(console.error("Error registering user"));
  };

  const handleEditProfile = (name, avatar) => {
    const token = getToken();
    if (!currentUser) {
      console.error("Not authorized to edit profile");
      return;
    }
    setIsLoading(true);
    auth
      .editProfileData(name, avatar, token)
      .then((data) => {
        const user = data.user;
        setCurrentUser({
          _id: currentUser._id,
          email: currentUser.email,
          name: user.name,
          avatar: user.avatar,
        });
        closeActiveModal();
      })
      .catch(console.error("Error updating profile"));
  };

  const handleLogOut = () => {
    if (isLoggedIn) {
      removeToken();
      setIsLoggedIn(false);
      setCurrentUser({});
      closeActiveModal();
    } else {
      console.error("Error logging out");
    }
  };

  function getUserData() {
    const jwt = getToken();
    if (!jwt) {
      console.log("No token found in localStorage");
      return;
    }
    auth
      .getUserInfo(jwt)
      .then((data) => {
        // const user = data;
        setIsLoggedInLoading(false);
        setIsLoggedIn(true);
        setCurrentUser({
          _id: data._id,
          email: data.email,
          name: data.name,
          avatar: data.avatar,
        });
      })
      .catch((error) => {
        console.error("Invalid token", error);
        removeToken();
        setIsLoggedInLoading(false);
      });
  }
  //useEffects
  useEffect(() => {
    getUserData();
  }, []);

  const handleLogin = (email, password) => {
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          getUserData();
        } else {
          console.error("No JWT token found in response");
        }
        closeActiveModal();
      })
      .catch(console.error("Error logging in"))
      .finally(setIsLoggedInLoading(false));
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    api
      .getItemList()
      .then((items) => {
        setClothingItems(items);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    function handleCloseMethods(evt) {
      if (evt.key === "Escape" || evt.key === "esc" || evt.keyCode === 27) {
        closeActiveModal();
      }

      if (evt.type === "click" && evt.target.classList.contains("modal")) {
        closeActiveModal();
      }
    }

    if (activeModal !== "") {
      document.addEventListener("keydown", handleCloseMethods);
      document.addEventListener("click", handleCloseMethods);
    }

    return () => {
      document.removeEventListener("keydown", handleCloseMethods);
      document.removeEventListener("click", handleCloseMethods);
    };
  }, [activeModal]);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isLoggedInLoading,
        setIsLoggedInLoading,
      }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <div className="page__content">
              <Header
                weatherData={weatherData}
                handleAddClick={handleAddClick}
                toggleMobileMenu={toggleMobileMenu}
                openLogInModal={openLoginModal}
                openRegisterModal={openRegisterModal}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      addCardLike={handleCardLike}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    // <ProtectedRoute>
                    <Profile
                      handleCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      clothingItems={clothingItems}
                      selectedCard={selectedCard}
                      addCardLike={handleCardLike}
                      openEditProfileModal={openEditProfileModal}
                      handleLogout={handleLogOut}
                    />
                    // </ProtectedRoute>
                  }
                />
              </Routes>

              <Footer />
            </div>
            <MobileMenu
              isMobileMenuOpened={isMobileMenuOpened}
              toggleMobileMenu={toggleMobileMenu}
              handleAddClick={handleAddClick}
            />
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onClose={closeActiveModal}
              onAddItem={handleAddItemSubmit}
              buttonText={isLoading ? "Saving" : "New garment"}
            />

            <ItemModal
              activeModal={activeModal}
              selectedCard={selectedCard}
              onClose={closeActiveModal}
              openConfirmationModal={openConfirmationModal}
            />

            <DeleteConfirmationModal
              activeModal={activeModal}
              onClose={closeActiveModal}
              handleCardDelete={handleCardDelete}
              selectedCard={selectedCard}
            />

            <LoginModal
              onClose={closeActiveModal}
              isOpen={activeModal === "login"}
              handleLogin={handleLogin}
              buttonText={isLoading ? "Logging in..." : "Log In"}
              openRegisterModal={openRegisterModal}
            />

            <RegisterModal
              isOpen={activeModal === "register"}
              onClose={closeActiveModal}
              handleRegistration={handleRegistration}
              buttonText={isLoading ? "Saving..." : "Sign Up"}
              openLoginModal={openLoginModal}
            />

            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onClose={closeActiveModal}
              handleEditProfile={handleEditProfile}
              buttonText={isLoading ? "Saving..." : "Save changes"}
            />
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
