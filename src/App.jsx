import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ActActivation from "./components/Steps/ActActivation";
import Login from "./components/Auth/Login";
import "./styles/custom.scss";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route path="/acct-activation" element={<ActActivation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
