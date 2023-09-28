import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

function UserInfo() {
  const navigate = useNavigate();
  const initialData = localStorage.getItem("user-info");
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
    localStorage.setItem("user-info", JSON.stringify(formData));
    navigate("/contact");
  };

  return (
    <div>
      <h1>User Info</h1>
      <div>
        You are submitting the following:
        <ul>
          {Object.entries(formData).map(([name, value]) => (
            <li key={name}>
              <strong>{name}</strong>:{value.toString()}
            </li>
          ))}
        </ul>
        <p>{errorData}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            <p>Name</p>
            <input
              name="name"
              onChange={(e) => {
                setFormData(e);
                validate(e.target.value, "name");
              }}
              value={formData.name || ""}
            />
          </label>

          <label>
            <p>Age</p>
            <input
              name="age"
              onChange={(e) => {
                setFormData(e);
                validate(e.target.value, "age");
              }}
              value={formData.age || ""}
            />
          </label>
        </fieldset>
        <button type="submit" disabled={errorData.length > 0}>
          Next
        </button>
      </form>
    </div>
  );
}
export { UserInfo };
