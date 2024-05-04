import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
// maybe add split between random numbers but not right now 
function Roulette_inside(bet,amount) {
let result = getRandom(38);
 for (let i=0; i<bet.length; i++ ) {
  if(bet[i]==result) {
    if (bet.length==1) {
      return amount*35;
    }
    if (bet.length==2) {
      return amount*17;
    }
    if (bet.length==3) {
      return amount*11;
    }
    if (bet.length==4) {
      return amount*8;
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
function Roulette_outside(bet,amount) {
  const red = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
  const black = [2,4,6,8,10,11,15,17,20,22,24,26,28,29,31,33,35];
  let result = getRandom(38);
  if (bet=='1') {
    if (result<13 && result>0) {
      return true;
    }
  }
  if (bet=='2') {
    if (result<25 && result>12) {
      return amount*3;
    }
  }
  if (bet=='3') {
    if (result<37 && result>24) {
      return amount*3;
    }
  }
  if (bet=='b') {
    if (result<25 && result>0) {
      return amount*2;
    }
  }
  if (bet=='f') {
    if (result<37 && result>24) {
      return amount*2;
    }
  }
  if (bet=='r') {
    if (red.includes(result)) {
      return amount*2;
    }
  }
  if (bet=='b') {
    if (black.includes(result)) {
      return amount*2;
    }
  }
  if (bet=='o') {
    if (result!=37 && result%2==1) {
      return amount*2;
    }
  }
  if (bet=='e') {
    if (result!=0 && result%2==0) {
      return amount*2;
    }
  }
}
function RunSlot1() {
  const slot = [0,0,0,0]; 
  let symbols = slot(slot);
  let reward = Winner1(symbols);
  return reward; 
}
function RunSlot2() {
  const slot = [0,0]
  let symbols = slot(slot); 
  let reward = Winner2(symbols);
  return reward; 
}
function getRandom (top) {
  let rand=Math.floor(Math.random() *top);
  return rand; 
}

function slot(slots) {
for (let i=0; i<slots.length; i++) {
    slots[i]= getRandom(10);
}
let symbols = slotToChar(slot);
return symbols; 
} 
 function slotToChar(slots) {
for (let i=0; i<slots.length; i++) {
  if (slots[i]==0) {
    symbols[i]='h';
  }
  if (slots[i]==1) {
    symbols[i]='l';
  }
  if (slots[i]==2) {
    symbols[i]='o';
  }
  if (slots[i]==3) {
    symbols[i]='e';
  }
  if (slots[i]==4) {
    symbols[i]='g';
  }
  if (slots[i]==5) {
    symbols[i]='c';
  }
  if (slots[i]==6) {
    symbols[i]='b';
  }
  if (slots[i]==7) {
    symbols[i]='s';
  }
  if (slots[i]==8) {
    symbols[i]='w';
  }
  if (slots[i]==9) {
    symbols[i]='7';
  }
}
 }
function Winner2(symbols) {
  if (symbols[0]=='l'&& symbols[1] == 'l') return 0;
  if (symbols[0]=='7'&& symbols[1] == '7') return 50;
  if (symbols[0]=='w'&& symbols[1] == 'w') return 35;
  if (symbols[0]=='s'&& symbols[1] == 's') return 25;
  if (symbols[0]=='c'&& symbols[1] == 'c') return 15;
  if (symbols[0]==symbols[1]) return 5;
  if (symbols[1]=='h'|| symbols[0]=='h') return 3; 
  if (symbols[1]=='g'|| symbols[0]=='g') return 2; 
  return 0;
}
 function Winner1(symbols) {
if (symbols[1]=='7' && symbols[2]=='7' && symbols[0]=='7' && symbols[3]=='7') { 
  return 20000;
}
if (symbols[1]=='w' && symbols[2]=='w' && symbols[0]=='w' && symbols[3]=='w') { 
  return 1000;
}
if (symbols[1]=='e' && symbols[2]=='b' && symbols[0]=='e' && symbols[3]=='e') { 
  return 150;
}
if (symbols[1]=='o' && symbols[2]=='b' && symbols[0]=='o' && symbols[3]=='o') { 
  return 23;
}
if (symbols[1]=='s' && symbols[2]=='s' && symbols[0]=='s' && symbols[3]=='s') { 
  return 2000;
}
if (symbols[1]=='b' && symbols[2]=='b' && symbols[0]=='b' && symbols[3]=='b') { 
  return 500;
}
if (symbols[1]=='e' && symbols[2]=='e' && symbols[0]=='e' && symbols[3]=='b') {
  return 150;
}
if (symbols[1]=='g' && symbols[2]=='g' && symbols[0]=='g' && symbols[3]=='b') {
  return 20;
}
if (symbols[1]=='o' && symbols[2]=='o' && symbols[0]=='o' && symbols[3]=='b') {
  return 20;
}
if (symbols[1]=='h' && symbols[2]=='h' && symbols[0]=='h' && symbols[3]=='h') {
  return 20;
}
if (symbols[1]=='g' && symbols[2]=='g' && symbols[0]=='g'&& symbols[3]=='g') {
  return 26;
}
if (symbols[1]=='e' && symbols[2]=='e' && symbols[0]=='e'&& symbols[3]=='e') {
  return 100;
}
if (symbols[1]=='c' && symbols[2]=='c' && symbols[0]=='c'&& symbols[3]=='c') {
  return 2000;
}
if (symbols[1]=='7' && symbols[2]=='7' && symbols[0]=='7') { 
  return 150;
}
if (symbols[1]=='w' && symbols[2]=='w' && symbols[0]=='w') { 
  return 150;
}
if (symbols[1]=='e' && symbols[2]=='b' && symbols[0]=='e') { 
  return 18;
}
if (symbols[1]=='g' && symbols[2]=='b' && symbols[0]=='g') { 
  return 14;
}
if (symbols[1]=='o' && symbols[2]=='b' && symbols[0]=='o') { 
  return 10;
}
if (symbols[1]=='o' && symbols[2]=='o' && symbols[0]=='o') { 
  return 10;
}
if (symbols[1]=='s' && symbols[2]=='s' && symbols[0]=='s') { 
  return 150;
}
if (symbols[1]=='d' && symbols[2]=='d' && symbols[0]=='d') { 
  return 20;
}
if (symbols[1]=='g' && symbols[2]=='g' && symbols[0]=='g') {
  return 13;
}
if (symbols[1]=='e' && symbols[2]=='e' && symbols[0]=='e') {
  return 18;
}
if (symbols[1]=='b' && symbols[2]=='b' && symbols[0]=='b') {
  return 100;
}
if (symbols[1]=='c' && symbols[2]=='c' && symbols[0]=='c') {
  return 100;
}
if (symbols[1]=='h' && symbols[2]=='h' && symbols[3]=='l') {
  return 4;
}
if (symbols[1]=='h' && symbols[2]=='h' && symbols[3]=='e') {
  return 4;
}
if (symbols[1]=='e' && symbols[2]=='e' && symbols[3]=='b') {
  return 16;
}
if (symbols[1]=='e' && symbols[2]=='e' && symbols[3]=='e') {
  return 16;
}
if (symbols[1]=='o' && symbols[2]=='o' && symbols[3]=='o') {
  return 8;
}
if (symbols[1]=='o' && symbols[2]=='o' && symbols[3]=='b') {
  return 8;
}
if (symbols[1]=='g' && symbols[2]=='g' && symbols[3]=='g') {
  return 12;
}
if (symbols[1]=='g' && symbols[2]=='g' && symbols[3]=='b') {
  return 12;
}
if (symbols[1]=='b' && symbols[2]=='b' && symbols[3]=='b') {
  return 20;
}
if (symbols[1]=='h' && symbols[2]=='h' && symbols[0]=='h') {
  return 11;
}
if (symbols[1]=='o' && symbols[2]=='o' && symbols[0]=='o') {
  return 11;
}
if (symbols[0]=='h' && symbols[1]=='h') {
  return 5;
}
if (symbols[1]=='h' && symbols[2]=='h') {
  return 2; 
}
if (symbols[0]='h') {
  return 2; 
}
return 0; 
}

export default App;
