import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ContactInfo } from "./Components/ContactInfo";
import { UserInfo } from "./Components/UserInfo";
import { AddressInfo } from "./Components/AddressInfo";
import { StepWizard } from "./Components/StepWizard";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<StepWizard />} />
          <Route path="/user" element={<UserInfo />} />
          <Route path="/contact" element={<ContactInfo />} />
          <Route path="/address" element={<AddressInfo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
