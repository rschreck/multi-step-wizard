import React, { useReducer, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStep } from "./context";
const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

function UserInfo() {
  const [state, setState] = useStep();
  const updateStep1 = () => {
    setState({ ...state, step1: true });
    console.log("state", state);
    navigate("/contact");
  };
  const navigate = useNavigate();
  const initialData = localStorage.getItem("user-info");
  const [formData, setFormData] = useReducer(
    formReducer,
    JSON.parse(initialData) || {}
  );
  const [errors, setErrors] = useState({});

  const validate = (value, type = "name") => {
    const errMessage = `Incorrect ${type}`;
    let result = false;
    switch (type) {
      case "name":
        if (value?.length <= 0 || value?.length >= 50) {
          setErrors({ ...errors, [type]: errMessage });
        } else {
          setErrors({ ...errors, [type]: null });
          result = true;
        }
        break;
      case "age":
        if (typeof value === "number" || parseInt(value) > 0) {
          setErrors({ ...errors, [type]: null });
          result = true;
        } else {
          setErrors({ ...errors, [type]: errMessage });
        }
        break;
      case "gender":
        if (options.includes(value)) {
          setErrors({ ...errors, [type]: null });
          result = true;
        } else {
          setErrors({ ...errors, [type]: errMessage });
        }
        break;
      default:
        break;
    }
    return result;
  };

  //   const validateForm = () => {
  //     const fields = ["age", "name", "gender"];
  //     for (let i = 0; i < fields.length; i++) {
  //       console.log(fields[i], formData[fields[i]]);
  //       if (formData[fields[i]]) {
  //         return validate(formData[fields[i]], fields[i]);
  //       } else {
  //         return false;
  //       }
  //     }
  //   };
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, age, gender } = formData;
    if (!name) {
      setErrors({ name: "Please enter your name" });
    } else if (!age) {
      setErrors({ age: "Please enter your age" });
    } else if (!gender) {
      setErrors({ gender: "Please enter gender" });
    } else {
      updateStep1(state);
    }
  };

  const options = ["Male", "Female"];
  const onOptionChangeHandler = (e) => {
    setFormData(e);
    validate(e.target.value, "gender");
  };
  useEffect(() => {
    localStorage.setItem("user-info", JSON.stringify(formData));
  }, [formData]);
  return (
    <div className={"w3-container"}>
      <div className="w3-card-4">
        <h4>User Info</h4>

        <form onSubmit={onSubmit} className="w3-container">
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
          <div className="field">
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
          <div className="field">
            <label className="w3-label">Gender </label>
            <select
              className="w3-select w3-border"
              onChange={onOptionChangeHandler}
              name="gender"
              value={formData.gender}
            >
              <option>Please choose one option</option>
              {options.map((option, index) => {
                return <option key={index}>{option}</option>;
              })}
            </select>
          </div>

          <button
            className={
              errors.length > 0 ? "w3-button w3-grey" : "w3-button w3-green"
            }
            type="submit"
            disabled={errors.length > 0 ? true : false}
          >
            Next
          </button>

          {errors.name && <p>{errors.name}</p>}
          {errors.age && <p>{errors.age}</p>}
          {errors.gender && <p>{errors.gender}</p>}
        </form>
      </div>
    </div>
  );
}
export { UserInfo };
