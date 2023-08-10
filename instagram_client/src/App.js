import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Homepage from "./pages/HomePage/HomePage";
import { history } from "./helpers/history";
import { setAuthToken } from "./helpers/axiosInstance";

const token = localStorage.getItem("token");
if (token) {
  setAuthToken(token);
}
function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/Home" element={<Homepage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
