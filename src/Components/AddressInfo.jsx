import React, { useReducer, useState, useEffect } from "react";
import useLocalStorage from "./utils";
const AddressInfo = () => {
  const formReducer = (state, event) => {
    return {
      ...state,
      [event.target.name]: event.target.value,
    };
  };
  const initialData = localStorage.getItem("address-info");
  // const [formData, setFormData] = useState({
  //   street: "",
  //   zip: "",
  // });
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
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Street"
        value={formData?.street}
        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
      />
      <input
        type="zip"
        placeholder="Zip"
        value={formData?.zip}
        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
      />
      {errors.street && <p>{errors.street}</p>}
      {errors.zip && <p>{errors.zip}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};
export { AddressInfo };
