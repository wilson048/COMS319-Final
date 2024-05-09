import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";
import accountDetails from "./SessionToken";
import { Wheel } from "react-custom-roulette";
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
    let currentBet = bets[i];
    totalPaid = totalPaid + currentBet[2];
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
      let type = currentBet[0];
      let betItem = currentBet[1];
      let amount = currentBet[2];
      //maybe pull elements out here
      if (type == 0) {
        totalWon = totalWon + Roulette_inside(amount, betItem, result);
      } else {
        totalWon = totalWon + Roulette_outside(amount, betItem, result);
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
  function updateAccount(coins) {
    console.log(accountDetails);
    fetch(`http://localhost:8081/updateAccount/${accountDetails._id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        // _id: accountDetails._id, // also "id": req.body.id,
        password: accountDetails.password, // also "name": req.body.name,
        dob: accountDetails.dob, // also "price": req.body.price,
        coins: accountDetails.coins + coins,
        credit_card_num: accountDetails.credit_card_num, // credit card information is not initally saved
        credit_card_name: accountDetails.credit_card_name,
        credit_card_zip: accountDetails.credit_card_zip,
        credit_card_cvv: accountDetails.credit_card_cvv,
      }),
    })
      .then((response) => response.json())
      .then((updateThisAccount) => {
        // console.log(updateThisAccount);
        // accountDetails._id = updateThisAccount._id;
        // accountDetails.password = updateThisAccount.password;
        // accountDetails.dob = updateThisAccount.dob;
        accountDetails.coins = accountDetails.coins + coins;
      });
  }

  const [colorBet, setBet] = useState("");
  const data = [
    { option: "0", style: { backgroundColor: "green", textColor: "white" } },
    { option: "1", style: { backgroundColor: "black", textColor: "white" } },
    { option: "2", style: { backgroundColor: "red", textColor: "white" } },
    { option: "3", style: { backgroundColor: "black", textColor: "white" } },
    { option: "4", style: { backgroundColor: "red", textColor: "white" } },
    { option: "5", style: { backgroundColor: "black", textColor: "white" } },
    { option: "6", style: { backgroundColor: "red", textColor: "white" } },
    { option: "7", style: { backgroundColor: "black", textColor: "white" } },
    { option: "8", style: { backgroundColor: "red", textColor: "white" } },
    { option: "9", style: { backgroundColor: "black", textColor: "white" } },
    { option: "10", style: { backgroundColor: "red", textColor: "white" } },
    { option: "11", style: { backgroundColor: "black", textColor: "white" } },
    { option: "12", style: { backgroundColor: "red", textColor: "white" } },
    { option: "13", style: { backgroundColor: "black", textColor: "white" } },
    { option: "14", style: { backgroundColor: "red", textColor: "white" } },
    { option: "15", style: { backgroundColor: "black", textColor: "white" } },
    { option: "16", style: { backgroundColor: "red", textColor: "white" } },
    { option: "17", style: { backgroundColor: "black", textColor: "white" } },
    { option: "18", style: { backgroundColor: "red", textColor: "white" } },
    { option: "19", style: { backgroundColor: "black", textColor: "white" } },
    { option: "20", style: { backgroundColor: "red", textColor: "white" } },
    { option: "21", style: { backgroundColor: "black", textColor: "white" } },
    { option: "22", style: { backgroundColor: "red", textColor: "white" } },
    { option: "23", style: { backgroundColor: "black", textColor: "white" } },
    { option: "24", style: { backgroundColor: "red", textColor: "white" } },
    { option: "25", style: { backgroundColor: "black", textColor: "white" } },
    { option: "26", style: { backgroundColor: "red", textColor: "white" } },
    { option: "27", style: { backgroundColor: "black", textColor: "white" } },
    { option: "28", style: { backgroundColor: "red", textColor: "white" } },
    // { option: "29", style: { backgroundColor: "black", textColor: "white" } },
    // { option: "30", style: { backgroundColor: "red", textColor: "white" } },
    // { option: "31", style: { backgroundColor: "black", textColor: "white" } },
    // { option: "32", style: { backgroundColor: "red", textColor: "white" } },
    // { option: "33", style: { backgroundColor: "black", textColor: "white" } },
    // { option: "34", style: { backgroundColor: "red", textColor: "white" } },
    // { option: "35", style: { backgroundColor: "black", textColor: "white" } },
    // { option: "36", style: { backgroundColor: "red", textColor: "white" } },
  ];
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    let num = document.getElementById("coinBet").value;
    if (num === "" || num === null) {
      alert("Must fill in all fields (Coins)");
      return;
    }

    if (isNaN(num)) {
      alert("Must put in integer values for numbers");
      return;
    }

    if (Number(num) > accountDetails.coins || Number(num) < 0) {
      alert("Must put in positive integer");
      return;
    }

    let coins = Number(num);
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      // Green
      if (colorBet === "Green" && newPrizeNumber === 0) {
        coins *= 35;
      }
      // Black and Red
      else if (
        (colorBet === "Black" && newPrizeNumber % 2 === 1) ||
        (colorBet === "Red" &&
          newPrizeNumber % 2 === 0 &&
          newPrizeNumber !== 0) ||
        (colorBet === "1-14" && newPrizeNumber <= 14 && newPrizeNumber !== 0) ||
        (colorBet === "15-28" && newPrizeNumber > 14)
      ) {
        // coins = coins;
      } else {
        coins = -coins;
      }
      updateAccount(coins);
    }
  };
  return (
    <div>
      <div class="container">
        <hr class="my-4"></hr>
        <div class="d-lg-flex col-lg-3 justify-content-lg-end">
          <h4 class="navbar-brand" href="#">
            Welcome Back, {accountDetails._id} Your balance is{" "}
            {accountDetails.coins} {" Coins"}
          </h4>
        </div>
        <div class="col-md-7 col-lg-8">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            onStopSpinning={() => {
              setMustSpin(false);
            }}
          />
          <button class="btn btn-secondary" onClick={handleSpinClick}>
            SPIN
          </button>
          {colorBet !== "" && (
            <h4 class="navbar-brand" href="#">
              Placed bet on {colorBet}!
            </h4>
          )}
          <hr class="my-4"></hr>
          {/* <h4 class="mb-3">Log In</h4> */}

          <div class="row g-3">
            {/* <div class="col-sm-6">
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
            </div> */}
            <div class="col-sm-6">
              <label for="coinBet" class="form-label">
                Bet Coins (Max {accountDetails.coins})
              </label>
              <input
                type="text"
                class="form-control"
                id="coinBet"
                placeholder=""
                required
              ></input>
              <div class="invalid-feedback">Valid Title is required.</div>
            </div>
            <div class="col-sm-6">
              <button
                class="w-50 btn btn-outline-secondary btn-lg"
                data-bs-theme-value="dark"
                onClick={() => {
                  setBet("Black");
                }}
              >
                Black (x2)
              </button>
              <button
                class="w-50 btn btn-danger btn-lg"
                onClick={() => {
                  setBet("Red");
                }}
              >
                Red (x2)
              </button>
              <button
                class="w-50 btn btn-success btn-lg"
                onClick={() => {
                  setBet("Green");
                }}
              >
                Green (x36)
              </button>
              <button
                class="w-50 btn btn-secondary btn-lg"
                onClick={() => {
                  setBet("1-14");
                }}
              >
                1-14 (x2)
              </button>
              <button
                class="w-50 btn btn-warning btn-lg"
                onClick={() => {
                  setBet("15-28");
                }}
              >
                15-28 (x2)
              </button>
            </div>
            {data.map((el) => {
              <button id={el.option}>{el.option}</button>;
            })}
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
