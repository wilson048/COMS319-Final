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
  Navigate,
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

            <button
              type="button"
              class="btn btn-primary"
              onClick={navigate("/shop")}
            >
              Shop
            </button>
          </div>
          <div class="collapse navbar-collapse" id="navbarsExample02">
            <button type="button" class="btn btn-primary">
              4-Slots
            </button>
          </div>
          <div class="collapse navbar-collapse" id="navbarsExample02">
            <button type="button" class="btn btn-primary">
              2-Slots
            </button>
          </div>
          <div class="collapse navbar-collapse" id="navbarsExample02">
            <button type="button" class="btn btn-primary">
              Roulette
            </button>
          </div>
          <div class="collapse navbar-collapse" id="navbarsExample02">
            <button type="button" class="btn btn-primary">
              Sign-out
            </button>
          </div>
          <div class="d-lg-flex col-lg-3 justify-content-lg-end">
            <h4 class="navbar-brand" href="#">
              Welcome Back, {accountDetails._id} Your balance is{" "}
              {accountDetails.coins}
            </h4>
          </div>
        </div>
      </nav>

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
      <footer class="footer mt-auto py-3 bg-body-tertiary">
        <div class="container">
          <span class="text-body-secondary">
            Website by Wilson Chu and Anton Kordick
          </span>
          <div></div>
          {/* <Routes>
            <Route
              path="/"
              element={
                <button
                  class="btn btn-secondary"
                  onClick={navigate("/authors")}
                >
                  Authors
                </button>
              }
            ></Route>
          </Routes> */}
        </div>
      </footer>
    </div>
  );
}

export default App;
