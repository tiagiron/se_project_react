import { useEffect, useState } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../MainComponent/MainComponent";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

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

  /* FORM VALIDATION */

  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  // const [formData, setFormData] = useState({
  //   name: "",
  //   url: "",
  //   weather: "",
  // });

  // const handleBlur = (evt) => {
  //   const { name, value } = evt.target;
  //   const newErrors = validateField(name, value);
  //   setErrors((prevErrors) => ({
  //     ...prevErrors,
  //     ...newErrors,
  //   }));
  //   const formErrors = validateForm(formData);
  //   setIsFormValid(Object.keys(formErrors).length === 0);
  // };

  // const handleRadioChange = (evt) => {
  //   const { value } = evt.target;
  //   setFormData({
  //     ...formData,
  //     weather: value,
  //   });
  //   setErrors((prevErrors) => {
  //     const newErrors = {
  //       ...prevErrors,
  //     };
  //     delete newErrors.weather;
  //     return newErrors;
  //   });
  //   const newErrors = validateForm({ ...formData, weather: value });
  //   setIsFormValid(Object.keys(newErrors).length === 0);
  // };

  // const validateField = (name, value) => {
  //   const newErrors = {};

  //   if (name === "name") {
  //     if (!value.trim()) {
  //       newErrors.name = "Name is required";
  //     } else if (value.length < 2) {
  //       newErrors.name = "Name must be at least 2 characters";
  //     }
  //   }

  //   if (name === "url") {
  //     if (!value.trim()) {
  //       newErrors.url = "Url is required";
  //     } else if (!value.startsWith("https://")) {
  //       newErrors.url = "Url must contain an https link";
  //     }
  //   }
  //   if (name === "weather" && !value) {
  //     newErrors.weather = "Please select a weather type";
  //   }

  //   return newErrors;
  // };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // const newErrors = validateForm(formData);
    // setErrors(newErrors);
    // setIsFormValid(Object.keys(newErrors).length === 0);

    // if (Object.keys(newErrors).length === 0) {
    //   setFormData({
    //     name: "",
    //     url: "",
    //     weather: "",
    //   });
    //   setIsFormValid(false);
    // }
  };

  // const validateForm = (data) => {
  //   const errors = {};

  //   errors.name = validateField("name", data.name).name;
  //   errors.url = validateField("url", data.url).url;
  //   errors.weather = validateField("weather", data.weather).weather;
  //   return errors;
  // };

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
        isValid={isValid}
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
            onBlur={handleBlur}
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
            onBlur={handleBlur}
          />
          {errors.url && <span className="modal__error">{errors.url}</span>}
        </label>
        <fieldset className="modal__radio-button">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              className="modal__radio-input"
              type="radio"
              id="hot"
              name="weather"
              value="Hot"
              onChange={handleRadioChange}
              checked={formData.weather === "Hot"}
            />
            Hot
          </label>

          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              className="modal__radio-input"
              type="radio"
              id="warm"
              name="weather"
              value="Warm"
              onChange={handleRadioChange}
              checked={formData.weather === "Warm"}
            />
            Warm
          </label>

          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              className="modal__radio-input"
              type="radio"
              id="cold"
              name="weather"
              value="Cold"
              onChange={handleRadioChange}
              checked={formData.weather === "Cold"}
            />
            Cold
          </label>
          {errors.weather && (
            <span className="modal__error">{errors.weather}</span>
          )}
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
