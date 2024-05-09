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

function Login() {
  const navigate = useNavigate();
  // function addNewAccount() {
  //   // Fetch the value from the input field

  //   let _id = document.getElementById("newUsername").value;
  //   let password = document.getElementById("newPassword").value;
  //   let dob = document.getElementById("newDOB").value;

  //   if (
  //     (_id == null || _id == "") &&
  //     (password == null || password == "") &&
  //     (dob == null || dob == "")
  //   ) {
  //     alert("Fill all text fields correctly (Username, Password, DOB)");
  //     return;
  //   }

  //   console.log(_id);
  //   fetch(`http://localhost:8081/addAccount`, {
  //     method: "POST",
  //     headers: { "content-type": "application/json" },
  //     body: JSON.stringify({
  //       _id: _id,
  //       password: password,
  //       dob: dob,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((addThisProduct) => {
  //       alert(
  //         "Sucuessfully created account! Your balance will start at 500 coins"
  //       );
  //     });
  // }

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
    })
      .then((response) => {
        console.log(response);
        if (response.status == 400 || response.status == 404 || !response.ok) {
          alert("Account not found or Wrong Password");
          return null;
        }
        return response.json();
      })
      .then((loginAccount) => {
        if (loginAccount == null) {
          return;
        }
        getAccountData(_id);
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

  function getAccountData(id) {
    // let values = Object.values(data);
    // console.log(data);
    fetch(`http://localhost:8081/findAccount/${id}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
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
        navigate("/shop");
        // alert("Updated Account! Balance is now " + updateThisAccount.coins);
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
  const data = [
    { option: "0", style: { backgroundColor: "green", textColor: "black" } },
    { option: "1", style: { backgroundColor: "white" } },
    { option: "2" },
  ];
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };
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
          <div class="col-md-7 col-lg-8 d-flex gap-2 justify-content-center py-5">
            <button
              class="w-50 btn btn-success btn-lg"
              onClick={() => findAccount()}
            >
              Log In
            </button>
            <button
              class="w-50 btn btn-primary btn-lg"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
            <button
              class="w-50 btn btn-primary btn-lg"
              onClick={() => navigate("/Slot4")}
            >
              Slot-4
            </button>
            <button
              class="w-50 btn btn-primary btn-lg"
              onClick={() => navigate("/Slot2")}
            >
              Slot-2
            </button>
            <button
              class="w-50 btn btn-primary btn-lg"
              onClick={() => navigate("/Roulette")}
            >
              Roulette
            </button>
            <button
              class="w-50 btn btn-primary btn-lg"
              onClick={() => navigate("/Slots")}
            >
              slot Test
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

        <footer class="footer mt-auto py-3 bg-body-tertiary">
          <div class="container">
            <span class="text-body-secondary">
              Website by Wilson Chu and Anton Kordick
            </span>
            <div></div>

            <button class="btn btn-secondary" onClick={navigate("/authors")}>
              Authors
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Login;
