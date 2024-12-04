import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext, useEffect } from "react";

function EditProfileModal({ onClose, isOpen, buttonText, handleEditProfile }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  useEffect(() => {
    if (isOpen) {
      setValues({
        name: currentUser.name,
        avatarUrl: currentUser.avatar,
      });
    }
  }, [isOpen, setValues, currentUser]);

  const handleSubmit = (e) => {
    console.log(values);
    e.preventDefault();
    handleEditProfile(values);
  };

  return (
    <ModalWithForm
      title="Change profile data"
      name="edit-profile"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          value={values.name || ""}
          onChange={handleChange}
          required
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label className="modal__label">
        Avatar{" "}
        <input
          type="url"
          className="modal__input"
          id="avatarUrl"
          placeholder="Avatar URL"
          name="avatarUrl"
          value={values.avatarUrl || ""}
          onChange={handleChange}
          required
        />
        {errors.avatarUrl && (
          <span className="modal__error">{errors.avatarUrl}</span>
        )}
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
