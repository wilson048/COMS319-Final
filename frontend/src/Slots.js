import React, { useStates, useEffect } from "react";
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
import "./Slots.css";
const { useRef, useState } = React;

function Slots() {
  const [fruit1, setFruit1] = useState("🍒");
  const [fruit2, setFruit2] = useState("🍒");
  const [fruit3, setFruit3] = useState("🍒");
  const [fruit4, setFruit4] = useState("🍒");
  const [rolling, setRolling] = useState(false);
  let slotRef = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const fruits = ["🍒", "🍋", "🍊", "🔔", "🍇", "🌽", "💞", "♠️", "🍉", "7️⃣"];

  // to trigger rolling and maintain state
  const roll = () => {
    setRolling(true);
    setTimeout(() => {
      setRolling(false);
    }, 700);

    // looping through all 3 slots to start rolling
    const results = [];
    slotRef.forEach((slot, i) => {
      // this will trigger rolling effect
      const selected = triggerSlotRotation(slot.current);
      results[i] = selected;
      if (i + 1 == 1) setFruit1(fruits[selected]);
      else if (i + 1 == 2) setFruit2(fruits[selected]);
      else if (i + 1 == 3) setFruit3(fruits[selected]);
      else setFruit4(fruits[selected]);
    });
    PullLever(results);
  };

  // this will create a rolling effect and return random selected option
  const triggerSlotRotation = (ref) => {
    function setTop(top) {
      ref.style.top = `${top}px`;
    }
    let options = ref.children;
    let randomOption = Math.floor(Math.random() * fruits.length);
    let choosenOption = options[randomOption];
    setTop(-choosenOption.offsetTop + 2);
    //return fruits[randomOption];
    return randomOption;
  };

  function PullLever(results) {
    let coins = accountDetails.coins;
    if (coins < 50) {
      alert(
        "Brosky you are too poor for this. Go more they are literally free"
      );
    } else {
      coins = coins - 50;
      let reward = RunSlot1(results);
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
          // accountDetails._id = updateThisAccount._id;
          // accountDetails.password = updateThisAccount.password;
          // accountDetails.dob = updateThisAccount.dob;
          accountDetails.coins = coins;
          // accountDetails.credit_card_num = updateThisAccount.credit_card_num;
          // accountDetails.credit_card_name = updateThisAccount.credit_card_name;
          // accountDetails.credit_card_zip = updateThisAccount.credit_card_zip;
          // accountDetails.credit_card_cvv = updateThisAccount.credit_card_cvv;
        });
    }
  }

  /**
   *
   * @returns this function returns how much was won after spinning lot one
   */
  function RunSlot1(results) {
    const slots = [0, 0, 0, 0];
    let symbols = slotToChar(results);
    let reward = Winner1(symbols);
    return reward;
  }
  /**
   * This makes the numbers for the slot machine
   * @param {*} slots the array of a size that is the number of slots in the machine
   * @returns an array of symbols that are the results
   */
  // function slot(slots) {
  //   for (let i = 0; i < slots.length; i++) {
  //     slots[i] = getRandom(10);
  //   }
  //   let symbols = slotToChar(slot);
  //   return symbols;
  // }
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

  return (
    <div className="SlotMachine">
      <div className="slot">
        <section>
          <div className="container" ref={slotRef[0]}>
            {fruits.map((fruit, i) => (
              <div key={i}>
                <span>{fruit}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="slot">
        <section>
          <div className="container" ref={slotRef[1]}>
            {fruits.map((fruit) => (
              <div>
                <span>{fruit}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="slot">
        <section>
          <div className="container" ref={slotRef[2]}>
            {fruits.map((fruit) => (
              <div>
                <span>{fruit}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="slot">
        <section>
          <div className="container" ref={slotRef[3]}>
            {fruits.map((fruit) => (
              <div>
                <span>{fruit}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div
        className={!rolling ? "roll rolling" : "roll"}
        onClick={!rolling && roll}
        disabled={rolling}
      >
        {rolling ? "Rolling..." : "Pull 50 coins"}
      </div>
    </div>
  );
}

//ReactDOM.render(<Slots />, document.getElementById("react-root"));
export default Slots;
