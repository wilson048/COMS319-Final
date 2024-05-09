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

function Slot2() {
  let multipler = 1;
  const [fruit1, setFruit1] = useState("🍒");
  const [fruit2, setFruit2] = useState("🍒");
  const [rolling, setRolling] = useState(false);
  let slotRef = [useRef(null), useRef(null)];
  const fruits = ["🍒", "🍋", "🍊", "🔔", "🍇", "🌽", "💞", "♠️", "🍉", "7️⃣"];

  function upMultiplier() {
    if (multipler == 64) {
      alert("That's a bit too much buckroo");
    } else {
      multipler = multipler * 2;
      document.getElementById("slot2button").textContent =
        "Pull " + 2 * multipler + " coins";
    }
  }
  function lowerMultiper() {
    if (multipler == 1) {
      alert("There are no free bets my friend");
    } else {
      multipler = multipler / 2;
      document.getElementById("slot2button").textContent =
        "Pull " + 2 * multipler + " coins";
    }
  }
  // to trigger rolling and maintain state
  const roll = () => {
    let user = accountDetails._id;
    if (user == "" || user == null) {
      alert("Bro Log in Already");
      return;
    }
    let coins = accountDetails.coins;
    if (coins < 2 * multipler) {
      alert(
        "Brosky you are too poor for this. Go more they are literally free"
      );
    } else {
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
      });
      PullLever(results);
    }
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
    coins = coins - 2 * multipler;
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

  /**
   *
   * @returns this function returns how much was won after spinning lot one
   */
  function RunSlot1(results) {
    const slots = [0, 0];
    let symbols = slotToChar(results);
    let reward = Winner2(symbols);
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
   * This is for 2 row slots
   * @param {*} symbols the symbols that are the reults
   * @returns the amount earned
   */
  function Winner2(symbols) {
    if (symbols[0] == "l" && symbols[1] == "l") return 10 * multipler;
    if (symbols[0] == "7" && symbols[1] == "7") return 50 * multipler;
    if (symbols[0] == "w" && symbols[1] == "w") return 35 * multipler;
    if (symbols[0] == "s" && symbols[1] == "s") return 25 * multipler;
    if (symbols[0] == "c" && symbols[1] == "c") return 15 * multipler;
    if (symbols[0] == symbols[1]) return 5 * multipler;
    if (symbols[1] == "h" || symbols[0] == "h") return 5 * multipler;
    if (symbols[1] == "g" || symbols[0] == "g") return 4 * multipler;
    return 0;
  }

  return (
    <div className="SlotMachine">
      <hr class="my-4"></hr>
      <div class="d-lg-flex col-lg-3 justify-content-lg-end">
        <h4 class="navbar-brand" href="#">
          Welcome Back, {accountDetails._id} Your balance is{" "}
          {accountDetails.coins} {" Coins"}
        </h4>
      </div>
      <div className="slot">
        <section>
          <div
            className="container"
            style={{ position: "absolute" }}
            ref={slotRef[0]}
          >
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
          <div
            className="container"
            style={{ position: "absolute" }}
            ref={slotRef[1]}
          >
            {fruits.map((fruit) => (
              <div>
                <span>{fruit}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div
        id="slot2button"
        className={!rolling ? "roll rolling" : "roll"}
        onClick={!rolling && roll}
        disabled={rolling}
      >
        {rolling ? "Rolling..." : "Pull " + 2 * multipler + " coins"}
      </div>
      <button onClick={upMultiplier}>Double the Cost and reward</button>
      <button onClick={lowerMultiper}>Half the risk and the reward</button>
      {/* <div
        className={!rolling ? "roll rolling" : "roll"}
        onClick={!rolling && roll}
        disabled={rolling}
      >
        {rolling ? "Rolling..." : "Pull 4 coins"}
      </div> */}
    </div>
  );
}

//ReactDOM.render(<Slots />, document.getElementById("react-root"));
export default Slot2;
