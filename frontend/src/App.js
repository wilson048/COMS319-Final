import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./Login";
import SignUp from "./SignUp";
import Authors from "./Authors";
import Slot2 from "./Slot2";

import accountDetails from "./SessionToken";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Link,
} from "react-router-dom";
import Shop from "./Shop";
import Slot4 from "./Slot4";
import Roulette from "./Roulette";

function App() {
  const navigate = useNavigate;
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
      <div class="container"></div>
      <div
        class="navbar navbar-expand-lg navbar-dark bg-dark"
        aria-label="Second navbar example"
      >
        <img width="100px" height="50px" src="Flag.png"></img>
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
            {/* <button type="button" class="btn btn-primary">
              Sign-out
            </button> */}
            <Link to="/Roulette">Roulette</Link>
          </div>
          <div class="collapse navbar-collapse" id="navbarsExample02">
            {/* <button type="button" class="btn btn-primary">
              4-Slots
            </button> */}
            <Link to="/shop">Shop</Link>
          </div>
          <div class="collapse navbar-collapse" id="navbarsExample02">
            {/* <button type="button" class="btn btn-primary">
              2-Slots
            </button> */}
            <Link to="/Slot4">4-Slots</Link>
          </div>
          <div class="collapse navbar-collapse" id="navbarsExample02">
            {/* <button type="button" class="btn btn-primary">
              Roulette
            </button> */}
            <Link to="/Slot2">2-Slots</Link>
          </div>
          <div class="collapse navbar-collapse" id="navbarsExample02">
            {/* <button type="button" class="btn btn-primary">
              Sign-out
            </button> */}
            <Link
              to="/"
              onClick={() => {
                setViewer(0);
                accountDetails._id = "";
                accountDetails.password = "";
                accountDetails.dob = "";
                accountDetails.coins = 0;
                accountDetails.credit_card_num = "";
                accountDetails.credit_card_name = "";
                accountDetails.credit_card_zip = "";
                accountDetails.credit_card_cvv = "";
              }}
            >
              Log Out
            </Link>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/Slot4" element={<Slot4 />} />
          <Route path="/Slot2" element={<Slot2 />} />
          <Route path="/Roulette" element={<Roulette />} />
        </Routes>
        {/* viewer === 1 && <Login></Login> */}
        <footer
          class="footer py-3 bg-body-tertiary"
          style={{
            left: "0",
            bottom: "0",
            right: "0",
          }}
        >
          <div class="container">
            <span class="text-body-secondary">
              Website by Wilson Chu and Anton Kordick{" "}
            </span>

            <Link to="/Authors">Authors</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
