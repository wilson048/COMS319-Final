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
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const addToCart = (el) => {
    setCart([...cart, el]);
  };

  const removeFromCart = (el) => {
    let itemFound = false;
    const updatedCart = cart.filter((cartItem) => {
      if (cartItem.id === el.id && !itemFound) {
        itemFound = true;
        return false;
      }
      return true;
    });
    if (itemFound) {
      setCart(updatedCart);
      if (cart.length === 0) {
      }
    }
  };

  function howManyofThis(id) {
    let hmot = cart.filter((cartItem) => cartItem.id === id);
    return hmot.length;
  }
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

  function updateAccount(coins) {
    let cardNum = document.getElementById("cardNumber").value;
    let cardName = document.getElementById("cardName").value;
    let cardZip = document.getElementById("cardZipcode").value;
    let cardCVV = document.getElementById("cardCVV").value;

    if (
      cardNum == "" ||
      cardNum == null ||
      cardName == "" ||
      cardName == null ||
      cardZip == "" ||
      cardZip == null ||
      cardCVV == "" ||
      cardCVV == null
    ) {
      alert("Must fill in all fields");
      return;
    }

    if (isNaN(cardNum) || isNaN(cardZip) || isNaN(cardCVV)) {
      alert("Must put in integer values for numbers");
      return;
    }

    if (cardNum.length != 16 || cardZip.length != 5 || cardCVV.length != 3) {
      alert(
        "Must put in correct integer sizes for numbers (number: 16, zipcode: 5, CVV: 3)"
      );
      return;
    }
    console.log({
      password: accountDetails.password, // also "name": req.body.name,
      dob: accountDetails.dob, // also "price": req.body.price,
      coins: 1250, // all fresh accounts start with 500 coins
      credit_card_num: cardNum, // credit card information is not initally saved
      credit_card_name: cardName,
      credit_card_zip: cardZip,
      credit_card_cvv: cardCVV,
    });
    fetch(`http://localhost:8081/updateAccount/${accountDetails._id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        // _id: accountDetails._id, // also "id": req.body.id,
        password: accountDetails.password, // also "name": req.body.name,
        dob: accountDetails.dob, // also "price": req.body.price,
        coins: 1250, // all fresh accounts start with 500 coins
        credit_card_num: cardNum, // credit card information is not initally saved
        credit_card_name: cardName,
        credit_card_zip: cardZip,
        credit_card_cvv: cardCVV,
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
          <h4 class="mb-3">Select your coin amount</h4>
          <button
            class="w-25 btn btn-primary btn-lg"
            onClick={() => navigate("/Slot4")}
          >
            <span class="text-body-primary">750 coins</span>
            <img src="Coins.png"></img>
          </button>
          <span class="w-25"></span>
          <button
            class="w-25 btn btn-primary btn-lg"
            onClick={() => navigate("/Slot4")}
          >
            <span class="text-body-primary">1500 coins</span>
            <img src="Coins.png"></img>
          </button>
          <hr class="my-4"></hr>
          <h4 class="mb-3">Card Information</h4>

          <div class="row g-3">
            <div class="col-sm-6">
              <label for="cardNumber" class="form-label">
                Card Number
              </label>
              <input
                type="text"
                class="form-control"
                id="cardNumber"
                placeholder=""
                required
              ></input>
              <div class="invalid-feedback">Valid ID is required</div>
            </div>

            <div class="col-sm-6">
              <label for="cardName" class="form-label">
                Card Name
              </label>
              <input
                type="text"
                class="form-control"
                id="cardName"
                placeholder=""
                required
              ></input>
              <div class="invalid-feedback">Valid Title is required.</div>
            </div>
            <div class="col-sm-6">
              <label for="cardZipcode" class="form-label">
                Card Zip Code
              </label>
              <input
                type="text"
                class="form-control"
                id="cardZipcode"
                placeholder=""
                required
              ></input>
              <div class="invalid-feedback">Valid Title is required.</div>
            </div>
            <div class="col-sm-6">
              <label for="cardCVV" class="form-label">
                Card CVV
              </label>
              <input
                type="text"
                class="form-control"
                id="cardCVV"
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
              Purchase
            </button>
            <button
              class="w-50 btn btn-danger btn-lg"
              onClick={() => navigate("/Slot4")}
            >
              Cancel
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
