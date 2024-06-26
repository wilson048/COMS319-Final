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

function PullLever() {
  let coins = accountDetails.coins;
  if (coins < 50) {
    alert("Brosky you are too poor for this. Go more they are literally free");
  } else {
    coins = coins - 50;
    let reward = RunSlot1();
    coins = coins + reward;
    fetch(`http://localhost:8081/updateAccount/${accountDetails._id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        // _id: accountDetails._id, // also "id": req.body.id,
        password: accountDetails.password, // also "name": req.body.name,
        dob: accountDetails.dob, // also "price": req.body.price,
        coins: coins, // all fresh accounts start with 500 coins
        credit_card_num: accountDetails.credit_card_num, // credit card information is not initally saved
        credit_card_name: accountDetails.credit_card_name,
        credit_card_zip: accountDetails.credit_card_zip,
        credit_card_cvv: accountDetails.credit_card_cvv,
      }),
    })
      .then((response) => response.json())
      .then((updateThisAccount) => {
        accountDetails._id = updateThisAccount._id;
        accountDetails.password = updateThisAccount.password;
        accountDetails.dob = updateThisAccount.dob;
        accountDetails.coins = updateThisAccount.coins;
        accountDetails.credit_card_num = updateThisAccount.credit_card_num;
        accountDetails.credit_card_name = updateThisAccount.credit_card_name;
        accountDetails.credit_card_zip = updateThisAccount.credit_card_zip;
        accountDetails.credit_card_cvv = updateThisAccount.credit_card_cvv;
      });
  }
}
/**
 *
 * @returns this function returns how much was won after spinning lot one
 */
function RunSlot1() {
  const slots = [0, 0, 0, 0];
  let symbols = slot(slots);
  let reward = Winner1(symbols);
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
 * cherry:h /
 * lemon:l/
 * orange:o /
 * bell:e /
 * grape:g /
 * corn:c/
 * bar:b/
 * spade:s/
 * watermelon:w /
 * 7:7/
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
  return (
    <div>
      <div class="container">
        <div class="col-md-7 col-lg-8">
          <hr class="my-4"></hr>
          <h4 class="mb-3">4-Lain Slots Test Your Luck Feed </h4>
          <div class="row g-10">
            <div class="col-sm-8">
              <img height="50px" width="100px" src="Flag.png"></img>
            </div>
            <div class="col-sm-12">
              <img height="50px" width="100px" src="Flag.png"></img>
            </div>

            <div class="col-sm-3">
              <img height="50px" width="100px" src="Flag.png"></img>
            </div>
            <div class="col-sm-10">
              <img height="50px" width="100px" src="Flag.png"></img>
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

export default Slot4;
