import React, { useReducer, useState, useEffect } from "react";
import { useStep } from "./context";
import AutoComplete from "./AutoComplete";

const AddressInfo = () => {
  const formReducer = (state, event) => {
    return {
      ...state,
      [event.target.name]: event.target.value,
    };
  };
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
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name={"street"}
        placeholder="Street"
        value={formData?.street}
        onChange={(e) => setFormData(e)}
      />
      <input
        name="zip"
        type="zip"
        placeholder="Zip"
        value={formData?.zip}
        onChange={(e) => setFormData(e)}
      />
      <AutoComplete
        name="city"
        options={["Austin", "Banglore", "Delhi", "Dallas", "Houston"]}
        // defaultValue={"Austin"}
        onChange={(e) => console.log("onchange")}
      />
      {errors.street && <p>{errors.street}</p>}
      {errors.zip && <p>{errors.zip}</p>}
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
  );
};
export { AddressInfo };
