import React, { useState } from "react";
import { UserInfo } from "./UserInfo";
import { Contact } from "./Contact";
import { AddressInfo } from "./AddressInfo";

const StepWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div>
      <h1>Step Wizard</h1>
      <ul>
        <li>
          <button
            className={currentStep === 1 ? "button-green" : ""}
            onClick={() => setCurrentStep(1)}
          >
            User Info
          </button>
        </li>
        <li>
          <button
            className={currentStep === 2 ? "button-green" : ""}
            onClick={() => setCurrentStep(2)}
          >
            Contact Info
          </button>
        </li>
        <li>
          <button
            className={currentStep === 3 ? "button-green" : ""}
            onClick={() => setCurrentStep(3)}
          >
            Address 3
          </button>
        </li>
      </ul>
      <div>
        {currentStep === 1 && <UserInfo />}
        {currentStep === 2 && <Contact />}
        {currentStep === 3 && <AddressInfo />}
      </div>
    </div>
  );
};

export { StepWizard };
