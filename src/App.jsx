import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ActActivation from "./components/Steps/ActActivation";
import Login from "./components/Auth/Login";
import "./styles/custom.scss";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Dpa from "./components/util/dpa";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route path="/acct-activation" element={<ActActivation />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/privacy-policy" element={<Dpa />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
