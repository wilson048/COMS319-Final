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
    fetch(`http://localhost:8081/findAccount/${_id}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        _id: _id,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((addThisProduct) => {
        alert("Signed In! Your balance is " + addThisProduct.coins);
      });
  }

  function deleteAccount() {
    // Fetch the value from the input field

    let _id = document.getElementById("newUsername").value;
    let password = document.getElementById("newPassword").value;

    if ((_id == null || _id == "") && (password == null || password == "")) {
      alert("Fill all text fields correctly (Username, Password)");
      return;
    }

    console.log(_id);
    fetch(`http://localhost:8081/deleteAccount/${_id}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        _id: _id,
      }),
    })
      .then((response) => response.json())
      .then((addThisProduct) => {
        alert("Deleted Account!");
      });
  }

  return (
    <div class="container">
      <div class="col-md-7 col-lg-8">
        <h4 class="mb-3">Add new Product</h4>

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

          <div class="col-12">
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
        </div>

        <hr class="my-4"></hr>

        <button
          class="w-100 btn btn-primary btn-lg"
          onClick={() => addNewAccount()}
        >
          Create Account
        </button>

        <button
          class="w-100 btn btn-primary btn-lg"
          onClick={() => findAccount()}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Login;
