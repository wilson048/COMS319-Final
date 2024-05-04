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

function getRandom (top) {
  let rand=Math.floor(Math.random() *top);
  return rand; 
}

function slot() {
const slots = [0,0,0,0];
const symbols = []
for (let i=0; i<slots.length; i++) {
    slots[i]= getRandom(10);
} 
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
 function Winner(symbols) {
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
}

export default App;
