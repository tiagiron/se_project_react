import { useEffect, useState } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../MainComponent/MainComponent";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    url: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    const newErrors = validateForm(formData);
    setErrors(newErrors);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.name.trim()) {
      errors.name = "Name is required";
    } else if (data.name.length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!data.url.trim()) {
      errors.url = "Url is required";
    } else if (!data.email.contains("https://")) {
      errors.url = "Url must contain an https link";
    }
    return errors;
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const closeActiveModal = () => {
    setActiveModal("");
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
    <div className="page">
      <div className="page__content">
        <Header weatherData={weatherData} handleAddClick={handleAddClick} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer />
      </div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        isOpen={activeModal === "add-garment"}
        onClose={closeActiveModal}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="modal__error">{errors.name}</span>}
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{" "}
          <input
            type="url"
            className="modal__input"
            id="imageUrl"
            placeholder="Image URL"
            name="url"
            value={formData.url}
            onChange={handleChange}
          />
          {errors.url && <span className="modal__error">{errors.url}</span>}
        </label>
        <fieldset className="modal__radio-button">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input className="modal__radio-input" type="radio" id="hot" />
            Hot
          </label>

          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input className="modal__radio-input" type="radio" id="warm" />
            Warm
          </label>

          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input className="modal__radio-input" type="radio" id="cold" />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
      />
    </div>
  );
}

export default App;
