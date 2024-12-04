import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import "./LoginModal.css";

const LoginModal = ({
  onClose,
  isOpen,
  handleLogin,
  buttonText,
  openRegisterModal,
}) => {
  /* FORM VALIDATION */

  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    console.log(values);
    e.preventDefault();
    handleLogin(values.email, values.password);
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label htmlFor="email" className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          name="email"
          placeholder="Email"
          value={values.email || ""}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="modal__error">{errors.name}</span>}
      </label>
      <label htmlFor="password" className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          placeholder="Password"
          name="password"
          value={values.password || ""}
          onChange={handleChange}
          required
        />
        {errors.password && <span className="modal__error">{errors.url}</span>}
      </label>
      <button
        type="button"
        className="modal__button-register"
        onClick={openRegisterModal}
      >
        or Sign Up
      </button>
    </ModalWithForm>
  );
};

export default LoginModal;
