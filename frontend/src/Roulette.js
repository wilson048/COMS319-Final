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
 * This check if the result hit the bet and returns the amount won for inside bets
 * @param {*} bet this is the number or numbers of the bet in an array of ints
 * @param {*} amount this is the amount bet on that particular
 * @param {*} result this is the number of the result the wheel hit
 * @returns the amount that the person won, 0 if not won
 */

function Roulette_inside(bet, amount, result) {
  result = getRandom(38);
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
