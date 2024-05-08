import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./Login";
import SignUp from "./SignUp";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Shop from "./Shop";

const accountDetails = {
  _id: "",
  password: "",
  dob: "",
  coins: 0,
  credit_card_num: "",
  credit_card_name: "",
  credit_card_zip: "",
  credit_card_cvv: "",
};

function App() {
  const [viewer, setViewer] = useState(0);
  const staticViewer = viewer;
  document.body.style.background = "dark-blue";
  return (
    <div
    // style={{
    //   backgroundColor: "blue",
    //   textColor: "white",
    // }}
    >
      <nav
        class="navbar navbar-expand navbar-dark bg-dark"
        aria-label="Second navbar example"
      >
        <img height="50px" width="100px" src="Flag.png"></img>
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Anti-Gambling Association of America
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample02"
            aria-controls="navbarsExample02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarsExample02">
            {/* <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Link
                </a>
              </li>
            </ul> */}
          </div>
          <div class="d-lg-flex col-lg-3 justify-content-lg-end">
            {/* <button class="btn btn-primary">Button</button> */}
          </div>
        </div>
      </nav>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </Router>
      {/* viewer === 1 && <Login></Login> */}
    </div>
  );
}

export default App;
