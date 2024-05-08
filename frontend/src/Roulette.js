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

function Spin(bets) {
  let coins = accountDetails.coins;
  let totalPaid = 0;
  let totalWon = 0;
  for (let i = 0; i < bets.length; i++) {
    totalPaid = totalPaid + bets[3];
  }
  //whole lot of bullshit to allow separate bets on same line
  //fix make a total for all cost then look at the bets
  if (totalPaid > accountDetails.coins) {
    alert(
      "Brosky you are too poor for this. Go buy more they are literally free"
    );
  } else {
    let result = getRandom(38);
    coins = coins - totalPaid;
    for (let i = 0; i < bets.length; i++) {
      let currentBet = bets[i];
      //maybe pull elements out here
      if (currentBet[0] == 0) {
        totalWon =
          totalWon + Roulette_inside(currentBet[3], currentBet[1], result);
      } else {
        totalWon =
          totalWon + Roulette_outside(currentBet[3], currentBet[1], result);
      }
    }
    coins = coins + totalWon;
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
 * This check if the result hit the bet and returns the amount won for inside bets
 * @param {*} bet this is the number or numbers of the bet in an array of ints
 * @param {*} amount this is the amount bet on that particular
 * @param {*} result this is the number of the result the wheel hit
 * @returns the amount that the person won, 0 if not won
 */

function Roulette_inside(bet, amount, result) {
  //result = getRandom(38);
  for (let i = 0; i < bet.length; i++) {
    if (bet[i] == result) {
      if (bet.length == 1) {
        return amount * 35;
      }
      if (bet.length == 2) {
        return amount * 17;
      }
      if (bet.length == 3) {
        return amount * 11;
      }
      if (bet.length == 4) {
        return amount * 8;
      }
    }
  }
  return 0;
}

//1:first third
//2: second third
//3: third third
// b: first half
// f: second half
// r:red
//b:black
// o:odd
//e:even

/**
 * This check if the result hit the bet and returns the amount won for outside bets
 *
 *
 * @param {*} bet the type of bet in a char
 * @param {*} amount the amount of coins bet int
 * @param {*} result the int of the number the wheel hit
 * @returns the amount won
 */
function Roulette_outside(bet, amount, result) {
  const red = [
    1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
  ];
  const black = [
    2, 4, 6, 8, 10, 11, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35,
  ];
  if (bet == "1") {
    if (result < 13 && result > 0) {
      return true;
    }
  }
  if (bet == "2") {
    if (result < 25 && result > 12) {
      return amount * 3;
    }
  }
  if (bet == "3") {
    if (result < 37 && result > 24) {
      return amount * 3;
    }
  }
  if (bet == "b") {
    if (result < 25 && result > 0) {
      return amount * 2;
    }
  }
  if (bet == "f") {
    if (result < 37 && result > 24) {
      return amount * 2;
    }
  }
  if (bet == "r") {
    if (red.includes(result)) {
      return amount * 2;
    }
  }
  if (bet == "b") {
    if (black.includes(result)) {
      return amount * 2;
    }
  }
  if (bet == "o") {
    if (result != 37 && result % 2 == 1) {
      return amount * 2;
    }
  }
  if (bet == "e") {
    if (result != 0 && result % 2 == 0) {
      return amount * 2;
    }
  }
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

function Roulette() {
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

export default Roulette;
