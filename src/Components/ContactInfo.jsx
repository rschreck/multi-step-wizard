import React, { useReducer, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStep } from "./context";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

function ContactInfo() {
  const navigate = useNavigate();
  const [state, setState] = useStep();
  console.log("contact", state);
  const updateStep2 = () => {
    setState({ ...state, step2: true });
    console.log("state", state);
    navigate("/address");
  };
  const initialData = localStorage.getItem("contact-info");
  const [formData, setFormData] = useReducer(
    formReducer,
    JSON.parse(initialData) || {}
  );
  const [errors, setErrors] = useState({});

  function validatePhoneNumber(phoneNumber) {
    // Check if the phone number is empty
    if (phoneNumber === "") {
      return false;
    }

    // Check if the phone number is 10 digits long
    if (phoneNumber.length !== 10) {
      return false;
    }

    // Check if the phone number starts with a 1
    if (phoneNumber.charAt(0) !== "1") {
      return false;
    }

    // Check if the phone number contains only digits
    for (var i = 0; i < phoneNumber.length; i++) {
      if (isNaN(phoneNumber.charAt(i))) {
        return false;
      }
    }

    // The phone number is valid
    return true;
  }

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const validate = (value, type = "phone") => {
    const errMessage = `Incorrect ${type}`;
    let result = false;
    switch (type) {
      case "phone":
        if (validatePhoneNumber(value)) {
          setErrors({ ...errors, [type]: errMessage });
        } else {
          setErrors({ ...errors, [type]: null });
          result = true;
        }
        break;
      case "email":
        if (validateEmail(value)) {
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

  const onSubmit = (e) => {
    e.preventDefault();
    const { phone, email, etc } = formData;
    if (!phone) {
      setErrors({ phone: "Please enter your phone" });
    } else if (!email) {
      setErrors({ email: "Please enter your email" });
    } else {
      //navigate("/address");
      updateStep2();
    }
  };

  useEffect(() => {
    localStorage.setItem("contact-info", JSON.stringify(formData));
  }, [formData]);
  return (
    <div className={"w3-container"}>
      <div className="w3-card-4">
        <h4>Contact Info</h4>
        <form onSubmit={onSubmit} className="w3-container">
          <div className="field">
            <label className="label">Phone </label>
            <input
              type="tel"
              id="phone"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              name="phone"
              required
              className="w3-input"
              onChange={(e) => {
                setFormData(e);
                validatePhoneNumber(e.target.value);
              }}
              value={formData.phone || ""}
            />
          </div>
          <div className="field">
            <label className="w3-label">Email </label>
            <input
              className="w3-input"
              name="email"
              type="email"
              id="email"
              size="30"
              required
              onChange={(e) => {
                setFormData(e);
                validate(e.target.value, "email");
              }}
              value={formData.email || ""}
            />
          </div>
          <button
            className={
              errors.length > 0 ? "w3-button w3-grey" : "w3-button w3-green"
            }
            onClick={(e) => {
              //go to User Info
              console.log("Go to UserInfo");
              navigate("/user");
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

          {errors.phone && <p>{errors.phone}</p>}
          {errors.email && <p>{errors.email}</p>}
        </form>
      </div>
    </div>
  );
}
export { ContactInfo };
