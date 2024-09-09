import React, { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext,
  );

  return (
    <label className="toggle-switch__label">
      <input
        className="toggle-switch__checkbox toggle-switch__checkbox_state_hidden"
        type="checkbox"
        onChange={handleToggleSwitchChange}
      />
      <span
        className={
          currentTemperatureUnit === "F"
            ? "toggle-switch__slider toggle-switch__slider-F"
            : "toggle-switch__slider toggle-switch__slider-C"
        }
      />
      <p
        className={`toggle-switch__temp-F ${currentTemperatureUnit === "F" && "toggle-switch__active"}`}
      >
        F
      </p>
      <p
        className={`toggle-switch__temp-C ${currentTemperatureUnit === "C" && "toggle-switch__active"}`}
      >
        C
      </p>
    </label>
  );
};

export default ToggleSwitch;
