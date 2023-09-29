import React, { useState } from "react";
import { UserInfo } from "./UserInfo";
import { ContactInfo } from "./ContactInfo";
import { AddressInfo } from "./AddressInfo";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = React.useState(false);

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
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/address">Address</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

// const StepWizard = () => {
//   const [currentStep, setCurrentStep] = useState(0);

//   return (
//     <div>
//       <h1>Step Wizard</h1>
//       <ul>
//         <li>
//           <button
//             className={currentStep === 1 ? "w3-button w3-green" : "w3-button "}
//             onClick={() => setCurrentStep(1)}
//           >
//             User Info
//           </button>
//         </li>
//         <li>
//           <button
//             className={currentStep === 2 ? "w3-button w3-green" : "w3-button"}
//             onClick={() => setCurrentStep(2)}
//           >
//             Contact Info
//           </button>
//         </li>
//         <li>
//           <button
//             className={currentStep === 3 ? "w3-button w3-green" : "w3-button"}
//             onClick={() => setCurrentStep(3)}
//           >
//             Address 3
//           </button>
//         </li>
//       </ul>
//       <div>
//         {currentStep === 1 && <UserInfo />}
//         {currentStep === 2 && <ContactInfo />}
//         {currentStep === 3 && <AddressInfo />}
//       </div>
//     </div>
//   );
// };

export { Navbar };
