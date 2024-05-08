import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";
import accountDetails from "./SessionToken";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Slot4 from "./Slot4";
/**
 *
 * @returns this function returns how much was won after spinning lot two
 */
function RunSlot2() {
  const Slots = [0, 0];
  let symbols = slot(slots);
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

function Slot2() {
  return (
    <div>
      <div class="container">
        <div class="col-md-7 col-lg-8">
          <hr class="my-4"></hr>
          <h4 class="mb-3">Log In</h4>

          <div class="row g-3">
            <div class="col-sm-6">
              <label for="newUsername" class="form-label">
                Username
              </label>
              <input
                type="text"
                class="form-control"
                id="newUsername"
                placeholder=""
                required
              ></input>
              <div class="invalid-feedback">Valid ID is required</div>
            </div>

            <div class="col-sm-6">
              <label for="newPassword" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="newPassword"
                placeholder=""
                required
              ></input>
              <div class="invalid-feedback">Valid Title is required.</div>
            </div>
          </div>

          {/* <hr class="my-4"></hr>
            <div class="col-md-7 col-lg-8">
              <button
                class="w-50 btn btn-primary btn-lg"
                onClick={() => addNewAccount()}
              >
                Create Account
              </button>
            </div> */}
          <hr class="my-4 "></hr>
          <div class="col-md-7 col-lg-8 d-flex gap-2 justify-content-center py-5"></div>
        </div>
        {/* <button
            class="w-50 btn btn-primary btn-lg"
            onClick={() => deleteAccount()}
          >
            Delete Account
          </button>
          <button
            class="w-50 btn btn-primary btn-lg"
            onClick={() => updateAccount()}
          >
            Update Coins
          </button> */}
      </div>
    </div>
  );
}

export default Slot2;
