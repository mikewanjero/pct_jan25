import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TrainingSheet from "./components/TrainingSheet";
import MasterDoc from "./components/MasterDoc";
import ActActivation from "./components/ActActivation";
import "./styles/custom.scss";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<TrainingSheet />} />
          <Route path="/step2" element={<MasterDoc />} />
          <Route path="/step3" element={<ActActivation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
