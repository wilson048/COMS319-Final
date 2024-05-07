import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";
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

  function findAccount() {
    // Fetch the value from the input field

    let _id = document.getElementById("newUsername").value;
    let password = document.getElementById("newPassword").value;

    if ((_id == null || _id == "") && (password == null || password == "")) {
      alert("Fill all text fields correctly (Username, Password)");
      return;
    }

    console.log(_id);
    fetch(`http://localhost:8081/verifyAccount/${_id}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        _id: _id,
        password: password,
      }),
    }).then((response) => {
      if (response.status == 400 || response.status == 404) {
        alert("Account not found or Wrong Password");
        return;
      }
      alert("Signed In! Your balance is " + response.json().coins);
    });
  }

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

  // function getAccountData(data, coins) {
  //   let values = Object.values(data);
  //   console.log(data);
  //   fetch(`http://localhost:8081/updateAccount/${data[0]}`, {
  //     method: "PUT",
  //     body: JSON.stringify({
  //       _id: values[0], // also "id": req.body.id,
  //       password: values[1], // also "name": req.body.name,
  //       dob: values[2], // also "price": req.body.price,
  //       coins: coins, // all fresh accounts start with 500 coins
  //       credit_card_num: values[4], // credit card information is not initally saved
  //       credit_card_name: values[5],
  //       credit_card_zip: values[6],
  //       credit_card_cvv: values[7],
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((updateThisAccount) => {
  //       alert("Updated Account! Balance is now " + updateThisAccount.coins);
  //     });
  // }

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

  return <div></div>;
}

export default Shop;
