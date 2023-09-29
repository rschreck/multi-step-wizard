import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useStep } from "./context";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [state] = useStep();
  return (
    <nav className="navbar">
      <div className="container">
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
            <li className="">
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/user">User</NavLink>
            </li>
            <li>
              <NavLink
                className={state?.["step1"] ? "" : "disabled-link"}
                to="/contact"
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                className={state?.["step2"] ? "" : "disabled-link"}
                to="/address"
              >
                Address
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
