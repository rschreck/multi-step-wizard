import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { ContactInfo } from "./Components/ContactInfo";
import { UserInfo } from "./Components/UserInfo";
import { AddressInfo } from "./Components/AddressInfo";
import { Navbar } from "./Components/NavBar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<UserInfo />} />
          <Route path="/user" element={<UserInfo />} />
          <Route path="/contact" element={<ContactInfo />} />
          <Route path="/address" element={<AddressInfo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
