import React, { useReducer, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStep } from "./context";
import AutoComplete from "./AutoComplete";

const AddressInfo = () => {
  const formReducer = (state, event) => {
    return {
      ...state,
      [event.target.name]: event.target.value,
    };
  };
  const navigate = useNavigate();
  const [state, setState] = useStep();
  const updateStep3 = () => {
    setState({ ...state, step2: true });
    console.log("state", state);
    alert("Finished Wizard");
  };
  const initialData = localStorage.getItem("address-info");
  const [formData, setFormData] = useReducer(
    formReducer,
    JSON.parse(initialData) || {}
  );
  const [errors, setErrors] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    const { street, zip } = formData;
    if (!street) {
      setErrors({ street: "Please enter your street" });
    } else if (!zip) {
      setErrors({ zip: "Please enter your zip" });
    } else {
      setErrors({});
      // submit the form
      updateStep3();
    }
  };

  useEffect(() => {
    localStorage.setItem("address-info", JSON.stringify(formData));
  }, [formData]);
  return (
    <div className="w3-card-4">
      <h4>Contact Info</h4>

      <form onSubmit={onSubmit} className="w3-container">
        <label className="label">Street </label>
        <input
          type="text"
          name={"street"}
          placeholder="Street"
          value={formData?.street}
          onChange={(e) => setFormData(e)}
        />
        <div className="field">
          <label className="label">Zip </label>

          <input
            name="zip"
            type="zip"
            placeholder="Zip"
            value={formData?.zip}
            onChange={(e) => setFormData(e)}
          />
        </div>
        <div className="field">
          <label className="label">City </label>

          <AutoComplete
            name="city"
            options={["Austin", "Banglore", "Delhi", "Dallas", "Houston"]}
            // defaultValue={"Austin"}
            onChange={(e) => console.log("onchange")}
          />
        </div>
        {errors.street && <p>{errors.street}</p>}
        {errors.zip && <p>{errors.zip}</p>}
        <button
          type="button"
          className={
            errors.length > 0 ? "w3-button w3-grey" : "w3-button w3-green"
          }
          onClick={(e) => {
            //go to User Info
            console.log("Go to UserInfo");
            navigate("/contact");
          }}
          disabled={errors.length > 0 ? true : false}
        >
          Previous
        </button>
        <button
          className={
            errors.length > 0 ? "w3-button w3-grey" : "w3-button w3-green"
          }
          type="submit"
          disabled={errors.length > 0 ? true : false}
        >
          Next
        </button>
      </form>
    </div>
  );
};
export { AddressInfo };
