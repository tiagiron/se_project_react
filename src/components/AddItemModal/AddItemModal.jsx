import "./AddItemModal.css";
import React from "react";
import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({
  closeActiveModal,
  handleSubmit,
  isValid,
  handleChange,
  activeModal,
  isOpen,
}) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleValuesSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ name, imageUrl, weather });
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={activeModal === "add-garment"}
      onClose={closeActiveModal}
      onSubmit={handleValuesSubmit}
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
          value={values.name || ""} //from form validation
          // value={name} need to change name value
          onChange={handleChange} //from form validation
          //onChange={handleNameChange}
          required
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
          value={values.url || ""} //from form validaiton
          // value={imageUrl}
          onChange={handleChange} // from form validation need to use with handleURLChange
          // onChange={handleImageUrlChange}
          required
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
            required
            onChange={handleWeatherChange}
          />
          Hot
        </label>

        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            className="modal__radio-input"
            type="radio"
            id="warm"
            name="weather"
            value="Warm"
            required
            onChange={handleWeatherChange}
          />
          Warm
        </label>

        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            className="modal__radio-input"
            type="radio"
            id="cold"
            name="weather"
            value="Cold"
            required
            onChange={handleWeatherChange}
          />
          Cold
        </label>
        {errors.weather && (
          <span className="modal__error">{errors.weather}</span>
        )}
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
