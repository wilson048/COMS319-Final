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

function Shop() {
  const navigate = useNavigate();
  function addNewAccount() {
    // Fetch the value from the input field

    let _id = document.getElementById("newUsername").value;
    let password = document.getElementById("newPassword").value;
    let dob = document.getElementById("newDOB").value;

    if (
      (_id == null || _id == "") &&
      (password == null || password == "") &&
      (dob == null || dob == "")
    ) {
      alert("Fill all text fields correctly (Username, Password, DOB)");
      return;
    }

    console.log(_id);
    fetch(`http://localhost:8081/addAccount`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        _id: _id,
        password: password,
        dob: dob,
      }),
    })
      .then((response) => response.json())
      .then((addThisProduct) => {
        alert(
          "Sucuessfully created account! Your balance will start at 500 coins"
        );
      });
  }

  // function findAccount() {
  //   // Fetch the value from the input field

  //   let _id = document.getElementById("newUsername").value;
  //   let password = document.getElementById("newPassword").value;

  //   if ((_id == null || _id == "") && (password == null || password == "")) {
  //     alert("Fill all text fields correctly (Username, Password)");
  //     return;
  //   }

  //   console.log(_id);
  //   fetch(`http://localhost:8081/verifyAccount/${_id}`, {
  //     method: "POST",
  //     // headers: { "content-type": "application/json" },
  //     body: JSON.stringify({
  //       _id: _id,
  //       password: password,
  //     }),
  //   }).then((response) => {
  //     if (response.status == 400 || response.status == 404) {
  //       alert("Account not found or Wrong Password");
  //       return;
  //     }
  //     alert("Signed In! Your balance is " + response.json().coins);
  //   });
  // }

  // function updateAccount() {
  //   let _id = document.getElementById("newUsername").value;
  //   let coins = document.getElementById("newCoins").value;

  //   if (_id == null || _id == "" || coins == null || coins == "") {
  //     alert("Fill all text fields correctly (Username, Coins)");
  //     return;
  //   }

  //   if (isNaN(coins) || Number(coins) % 1 !== 0) {
  //     alert("Fill in coins with an integer");
  //     return;
  //   }

  //   coins = Number(coins);

  //   console.log(_id);

  //   fetch(`http://localhost:8081/findAccount/${_id}`, {
  //     method: "GET",
  //   }).then((response) => {
  //     if (response.status == 400 || response.status == 404) {
  //       alert("Account not found");
  //       return;
  //     }
  //     // let values = Object.values(response.json());
  //     // console.log(response.json());
  //     getAccountData(response.json(), coins);
  //   });
  // }

  function updateAccount(_id, coins) {
    fetch(`http://localhost:8081/updateAccount/${_id}`, {
      method: "PUT",
      body: JSON.stringify({
        _id: accountDetails._id, // also "id": req.body.id,
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
        alert("Updated Account! Balance is now " + updateThisAccount.coins);
      });
  }

  // function deleteAccount() {
  //   // Fetch the value from the input field

  //   let _id = document.getElementById("newUsername").value;

  //   if (_id == null || _id == "") {
  //     alert("Fill all text fields correctly (Username)");
  //     return;
  //   }

  //   console.log(_id);
  //   fetch(`http://localhost:8081/deleteAccount/${_id}`, {
  //     method: "DELETE",
  //     headers: { "content-type": "application/json" },
  //   })
  //     .then((response) => response.json())
  //     .then((addThisProduct) => {
  //       alert("Deleted Account!");
  //     });
  // }

  return (
    <div>
      <div class="container">
        <div class="col-md-7 col-lg-8">
          <hr class="my-4"></hr>
          <h4 class="mb-3">Sign In</h4>

          <div class="row g-3">
            <div class="col-sm-6">
              <label for="newCardNumber" class="form-label">
                Card Number
              </label>
              <input
                type="text"
                class="form-control"
                id="newCardNumber"
                placeholder=""
                required
              ></input>
              <div class="invalid-feedback">Valid ID is required</div>
            </div>

            <div class="col-sm-6">
              <label for="newCardName" class="form-label">
                Card Name
              </label>
              <input
                type="password"
                class="form-control"
                id="newCardName"
                placeholder=""
                required
              ></input>
              <div class="invalid-feedback">Valid Title is required.</div>
            </div>
            <div class="col-sm-6">
              <label for="newCardName" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="newCardName"
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
          <div class="col-md-7 col-lg-8 d-flex gap-2 justify-content-center py-5">
            <button
              class="w-50 btn btn-success btn-lg"
              onClick={() => updateAccount()}
            >
              Log In
            </button>
            <button
              class="w-50 btn btn-primary btn-lg"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
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

export default Shop;
