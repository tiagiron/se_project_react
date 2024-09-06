import "./AddItemModal.css";
import React from "react";
import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

const AddItemModal = ({
  closeActiveModal,
  isValid,
  onAddItem,
  activeModal,
  isOpen,
}) => {
  /* FORM VALIDATION */

  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    //should be onAddItem according to project 11
    e.preventDefault();
    onAddItem({ values });
    console.log("Form data: values");
    resetForm();
  };

  return (
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
          value={values.name || ""}
          onChange={setValues}
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
          value={values.url || ""}
          onChange={setValues}
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
            onChange={setValues}
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
            onChange={setValues}
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
            onChange={setValues}
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
