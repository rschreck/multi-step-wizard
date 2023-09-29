import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { ContactInfo } from "./Components/ContactInfo";
import { UserInfo } from "./Components/UserInfo";
import { AddressInfo } from "./Components/AddressInfo";
import NotFound from "./Components/NotFound";
import { Navbar } from "./Components/NavBar";
import { StateProvider } from "./Components/context";

function App() {
  return (
    <div className="App">
      <StateProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<UserInfo />} />
            <Route path="/user" element={<UserInfo />} />
            <Route path="/contact" element={<ContactInfo />} />
            <Route path="/address" element={<AddressInfo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </StateProvider>
    </div>
  );
}

export default App;
