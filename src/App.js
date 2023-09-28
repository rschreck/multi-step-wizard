import "./App.css";
import { createContext, useContext } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Contact } from "./Components/Contact";
import { UserInfo } from "./Components/UserInfo";
import { AddressInfo } from "./Components/AddressInfo";
function App() {
  const AppStateContext = createContext({});
  //maybe no need to use context
  const context = useContext(AppStateContext);
  return (
    <div className="App">
      <AppStateContext.Provider value={""}>
        <Router>
          <Routes>
            <Route path="/" element={<UserInfo />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/address" element={<AddressInfo />} />
          </Routes>
        </Router>
      </AppStateContext.Provider>
    </div>
  );
}

export default App;
