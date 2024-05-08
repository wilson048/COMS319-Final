//maybe add split between random numbers but not right now

import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./Login";
import SignUp from "./SignUp";
import Authors from "./Authors";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Shop from "./Shop";
import accountDetails from "./SessionToken";

/**
 *
 * @returns this function returns how much was won after spinning lot one
 */
function RunSlot1() {
  const slot = [0, 0, 0, 0];
  let symbols = slot(slot);
  let reward = Winner1(symbols);
  return reward;
}
/**
 *
 * @returns this function returns how much was won after spinning lot two
 */
function RunSlot2() {
  const slot = [0, 0];
  let symbols = slot(slot);
  let reward = Winner2(symbols);
  return reward;
}
/**
 * used for different results to get a random number
 * @param {*} top the max for the random function
 * @returns the random result
 */
function getRandom(top) {
  let rand = Math.floor(Math.random() * top);
  return rand;
}
/**
 * This makes the numbers for the slot machine
 * @param {*} slots the array of a size that is the number of slots in the machine
 * @returns an array of symbols that are the results
 */
function slot(slots) {
  for (let i = 0; i < slots.length; i++) {
    slots[i] = getRandom(10);
  }
  let symbols = slotToChar(slot);
  return symbols;
}
/**
 * cherry:h
 * lemon:l
 * orange:o
 * bell:e
 * grape:g
 * corn:c
 * bar:b
 * spade:s
 * watermelon:w
 * 7:7
 *
 * This takes the numbers from slots and turns in into letters
 * @param {*} slots this is the number array of the results
 */

function slotToChar(slots) {
  const symbols = [];
  for (let i = 0; i < slots.length; i++) {
    if (slots[i] == 0) {
      symbols[i] = "h";
    }
    if (slots[i] == 1) {
      symbols[i] = "l";
    }
    if (slots[i] == 2) {
      symbols[i] = "o";
    }
    if (slots[i] == 3) {
      symbols[i] = "e";
    }
    if (slots[i] == 4) {
      symbols[i] = "g";
    }
    if (slots[i] == 5) {
      symbols[i] = "c";
    }
    if (slots[i] == 6) {
      symbols[i] = "b";
    }
    if (slots[i] == 7) {
      symbols[i] = "s";
    }
    if (slots[i] == 8) {
      symbols[i] = "w";
    }
    if (slots[i] == 9) {
      symbols[i] = "7";
    }
  }
  return symbols;
}
/**
 * This is for 2 row slots
 * @param {*} symbols the symbols that are the reults
 * @returns the amount earned
 */
function Winner2(symbols) {
  if (symbols[0] == "l" && symbols[1] == "l") return 0;
  if (symbols[0] == "7" && symbols[1] == "7") return 50;
  if (symbols[0] == "w" && symbols[1] == "w") return 35;
  if (symbols[0] == "s" && symbols[1] == "s") return 25;
  if (symbols[0] == "c" && symbols[1] == "c") return 15;
  if (symbols[0] == symbols[1]) return 5;
  if (symbols[1] == "h" || symbols[0] == "h") return 3;
  if (symbols[1] == "g" || symbols[0] == "g") return 2;
  return 0;
}
/**
 * This is for 4 row slots
 * @param {*} symbols the symbols that are the reults
 * @returns the amount earned
 */
function Winner1(symbols) {
  if (
    symbols[1] == "7" &&
    symbols[2] == "7" &&
    symbols[0] == "7" &&
    symbols[3] == "7"
  ) {
    return 20000;
  }
  if (
    symbols[1] == "w" &&
    symbols[2] == "w" &&
    symbols[0] == "w" &&
    symbols[3] == "w"
  ) {
    return 1000;
  }
  if (
    symbols[1] == "e" &&
    symbols[2] == "b" &&
    symbols[0] == "e" &&
    symbols[3] == "e"
  ) {
    return 150;
  }
  if (
    symbols[1] == "o" &&
    symbols[2] == "b" &&
    symbols[0] == "o" &&
    symbols[3] == "o"
  ) {
    return 23;
  }
  if (
    symbols[1] == "s" &&
    symbols[2] == "s" &&
    symbols[0] == "s" &&
    symbols[3] == "s"
  ) {
    return 2000;
  }
  if (
    symbols[1] == "b" &&
    symbols[2] == "b" &&
    symbols[0] == "b" &&
    symbols[3] == "b"
  ) {
    return 500;
  }
  if (
    symbols[1] == "e" &&
    symbols[2] == "e" &&
    symbols[0] == "e" &&
    symbols[3] == "b"
  ) {
    return 150;
  }
  if (
    symbols[1] == "g" &&
    symbols[2] == "g" &&
    symbols[0] == "g" &&
    symbols[3] == "b"
  ) {
    return 20;
  }
  if (
    symbols[1] == "o" &&
    symbols[2] == "o" &&
    symbols[0] == "o" &&
    symbols[3] == "b"
  ) {
    return 20;
  }
  if (
    symbols[1] == "h" &&
    symbols[2] == "h" &&
    symbols[0] == "h" &&
    symbols[3] == "h"
  ) {
    return 20;
  }
  if (
    symbols[1] == "g" &&
    symbols[2] == "g" &&
    symbols[0] == "g" &&
    symbols[3] == "g"
  ) {
    return 26;
  }
  if (
    symbols[1] == "e" &&
    symbols[2] == "e" &&
    symbols[0] == "e" &&
    symbols[3] == "e"
  ) {
    return 100;
  }
  if (
    symbols[1] == "c" &&
    symbols[2] == "c" &&
    symbols[0] == "c" &&
    symbols[3] == "c"
  ) {
    return 2000;
  }
  if (symbols[1] == "7" && symbols[2] == "7" && symbols[0] == "7") {
    return 150;
  }
  if (symbols[1] == "w" && symbols[2] == "w" && symbols[0] == "w") {
    return 150;
  }
  if (symbols[1] == "e" && symbols[2] == "b" && symbols[0] == "e") {
    return 18;
  }
  if (symbols[1] == "g" && symbols[2] == "b" && symbols[0] == "g") {
    return 14;
  }
  if (symbols[1] == "o" && symbols[2] == "b" && symbols[0] == "o") {
    return 10;
  }
  if (symbols[1] == "o" && symbols[2] == "o" && symbols[0] == "o") {
    return 10;
  }
  if (symbols[1] == "s" && symbols[2] == "s" && symbols[0] == "s") {
    return 150;
  }
  if (symbols[1] == "d" && symbols[2] == "d" && symbols[0] == "d") {
    return 20;
  }
  if (symbols[1] == "g" && symbols[2] == "g" && symbols[0] == "g") {
    return 13;
  }
  if (symbols[1] == "e" && symbols[2] == "e" && symbols[0] == "e") {
    return 18;
  }
  if (symbols[1] == "b" && symbols[2] == "b" && symbols[0] == "b") {
    return 100;
  }
  if (symbols[1] == "c" && symbols[2] == "c" && symbols[0] == "c") {
    return 100;
  }
  if (symbols[1] == "h" && symbols[2] == "h" && symbols[3] == "l") {
    return 4;
  }
  if (symbols[1] == "h" && symbols[2] == "h" && symbols[3] == "e") {
    return 4;
  }
  if (symbols[1] == "e" && symbols[2] == "e" && symbols[3] == "b") {
    return 16;
  }
  if (symbols[1] == "e" && symbols[2] == "e" && symbols[3] == "e") {
    return 16;
  }
  if (symbols[1] == "o" && symbols[2] == "o" && symbols[3] == "o") {
    return 8;
  }
  if (symbols[1] == "o" && symbols[2] == "o" && symbols[3] == "b") {
    return 8;
  }
  if (symbols[1] == "g" && symbols[2] == "g" && symbols[3] == "g") {
    return 12;
  }
  if (symbols[1] == "g" && symbols[2] == "g" && symbols[3] == "b") {
    return 12;
  }
  if (symbols[1] == "b" && symbols[2] == "b" && symbols[3] == "b") {
    return 20;
  }
  if (symbols[1] == "h" && symbols[2] == "h" && symbols[0] == "h") {
    return 11;
  }
  if (symbols[1] == "o" && symbols[2] == "o" && symbols[0] == "o") {
    return 11;
  }
  if (symbols[0] == "h" && symbols[1] == "h") {
    return 5;
  }
  if (symbols[1] == "h" && symbols[2] == "h") {
    return 2;
  }
  if ((symbols[0] = "h")) {
    return 2;
  }
  return 0;
}

function Slot4() {
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
            {/* <button class="btn btn-primary">Button</button> */}
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/authors" element={<Authors />} />
      </Routes>
      {/* viewer === 1 && <Login></Login> */}
      <footer class="footer mt-auto py-3 bg-body-tertiary">
        <div class="container">
          <span class="text-body-secondary">
            Website by Wilson Chu and Anton Kordick
          </span>
          <div></div>
          <Routes>
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
          </Routes>
        </div>
      </footer>
    </div>
  );
}

export default Slot4;
