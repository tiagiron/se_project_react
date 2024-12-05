import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import "./RegisterModal.css";

function RegisterModal({
  onClose,
  isOpen,
  handleRegistration,
  buttonText,
  openLoginModal,
}) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    console.log(values);
    e.preventDefault();
    handleRegistration(
      values.email,
      values.password,
      values.name,
      values.avatar,
    );
  };

  return (
    <ModalWithForm
      title="Sign Up"
      name="signup"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label htmlFor="register-email" className="modal__label">
        Email*{" "}
        <input
          type="email"
          className="modal__input"
          name="email"
          id="register-email"
          placeholder="Email"
          value={values.email || ""}
          onChange={handleChange}
          required
          minLength={2}
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password*{" "}
        <input
          type="password"
          className="modal__input"
          placeholder="Password"
          name="password"
          id="register-password"
          value={values.password || ""}
          onChange={handleChange}
          required
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
      <label htmlFor="register-name" className="modal__label">
        Name*{" "}
        <input
          type="name"
          className="modal__input"
          placeholder="Name"
          name="name"
          id="register-name"
          value={values.name || ""}
          onChange={handleChange}
          required
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL*{" "}
        <input
          type="url"
          className="modal__input"
          placeholder="Avatar URL"
          name="avatar"
          id="register-avatar"
          value={values.avatar || ""}
          onChange={handleChange}
          required
        />
        {errors.avatar && <span className="modal__error">{errors.avatar}</span>}
      </label>
      <button
        type="button"
        className="modal__button-login"
        onClick={openLoginModal}
      >
        or Log In
      </button>
    </ModalWithForm>
  );
}

export default RegisterModal;
