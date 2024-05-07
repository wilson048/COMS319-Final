import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";

function Login() {
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

  return (
    <div>
      <nav
        class="navbar navbar-expand navbar-dark bg-dark"
        aria-label="Second navbar example"
      >
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
            <ul class="navbar-nav me-auto">
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
            </ul>
          </div>
          <div class="d-lg-flex col-lg-3 justify-content-lg-end">
            <button class="btn btn-primary">Button</button>
          </div>
        </div>
      </nav>
      <div class="container">
        <div class="col-md-7 col-lg-8">
          <hr class="my-4"></hr>
          <h4 class="mb-3">Sign In</h4>

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

            <div class="col-sm-6">
              <label for="newDOB" class="form-label">
                Date of Birth
              </label>
              <div class="input-group has-validation">
                <input
                  type="text"
                  class="form-control"
                  id="newDOB"
                  placeholder=""
                  required
                ></input>
                <div class="invalid-feedback">Your price is required.</div>
              </div>
            </div>
            <div class="col-sm-6">
              <label for="newCoins" class="form-label">
                Coins
              </label>
              <div class="input-group has-validation">
                <input
                  type="text"
                  class="form-control"
                  id="newCoins"
                  placeholder=""
                  required
                ></input>
                <div class="invalid-feedback">Your price is required.</div>
              </div>
            </div>
          </div>

          <hr class="my-4"></hr>
          <div class="col-md-7 col-lg-8">
            <button
              class="w-50 btn btn-primary btn-lg"
              onClick={() => addNewAccount()}
            >
              Create Account
            </button>
          </div>
          <hr class="my-4"></hr>
          <div class="col-md-7 col-lg-8">
            <button
              class="w-50 btn btn-primary btn-lg"
              onClick={() => findAccount()}
            >
              Sign In
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

export default Login;
