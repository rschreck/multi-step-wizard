import React from "react";
import { createContext, useState, useContext } from "react";

export const StepContext = createContext(null);
function useStep() {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error("useState must be used within a StateProvider");
  }
  return context;
}
function StateProvider(props) {
  const [state, setState] = useState({
    step1: false,
    step2: false,
    step3: false,
  });
  const value = [state, setState];
  return <StepContext.Provider value={value} {...props} />;
}
export { StateProvider, useStep };
