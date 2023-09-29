import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StepWizard } from "./StepWizard";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

function ContactInfo() {
  const navigate = useNavigate();
  const initialData = localStorage.getItem("contact-info");
  const [formData, setFormData] = useReducer(
    formReducer,
    JSON.parse(initialData) || {}
  );
  const [errorData, setErrorData] = useState([]);

  const validate = (value, type = "name") => {
    const errMessage = `Incorrect ${type}`;
    switch (type) {
      case "name":
        if (value.length <= 0 || value.length >= 50) {
          setErrorData([...new Set([...errorData, errMessage])]);
        } else {
          setErrorData([...errorData?.filter((e) => e !== errMessage)]);
        }
        break;
      case "age":
        if (typeof value === "number" || parseInt(value) > 0) {
          setErrorData([...errorData?.filter((e) => e !== errMessage)]);
        } else {
          setErrorData([...new Set([...errorData, errMessage])]);
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    setErrorData(null);
    event.preventDefault();
    localStorage.setItem("contact-info", JSON.stringify(formData));
    navigate("/address");
  };

  const btnPrevClick = (event) => {
    navigate("/user");
  };

  return (
    <div className={"w3-container"}>
      <div className="w3-card-4">
        <h4>Contact Info</h4>
        {/* <ul>
          {Object.entries(formData).map(([name, value]) => (
            <li key={name}>
              <strong>{name}</strong>:{value.toString()}
            </li>
          ))}
        </ul> */}
        <p>{errorData}</p>

        <form onSubmit={handleSubmit} className="w3-container">
          {/* <fieldset> */}
          <div className="field">
            <label className="label">Name </label>
            <input
              name="name"
              placeholder="name"
              className="w3-input"
              onChange={(e) => {
                setFormData(e);
                validate(e.target.value, "name");
              }}
              value={formData.name || ""}
            />
          </div>
          <div>
            <label className="w3-label">Age </label>
            <input
              className="w3-input"
              type="text"
              name="age"
              placeholder="age"
              onChange={(e) => {
                setFormData(e);
                validate(e.target.value, "age");
              }}
              value={formData.age || ""}
            />
          </div>
          {/* </fieldset> */}
          <button
            className={
              errorData.length > 0 ? "w3-button w3-grey" : "w3-button w3-green"
            }
            onClick={btnPrevClick}
            disabled={errorData.length > 0}
          >
            Previous
          </button>
          <button
            className={
              errorData.length > 0 ? "w3-button w3-grey" : "w3-button w3-green"
            }
            type="submit"
            disabled={errorData.length > 0}
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}
export { ContactInfo };
