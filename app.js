// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
// import {
//   getDatabase,
//   ref,
//   set,
//   push,
//   onChildAdded,
//   update,
//   remove,
// } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// var firebaseConfig = {
//   apiKey: "AIzaSyADI8iIXAaN1Og102GkWNLr2BczSPFmEck",
//   authDomain: "todo-app11-16444.firebaseapp.com",
//   projectId: "todo-app11-16444",
//   storageBucket: "todo-app11-16444.appspot.com",
//   messagingSenderId: "740458716681",
//   appId: "1:740458716681:web:964872636160e116be22d8",
//   measurementId: "G-1GWQWP7F4K",
// };

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  push,
  onChildAdded,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKx65BiREWN79fsz7QkAGjr97br967XA8",
  authDomain: "todoapp22-e87d9.firebaseapp.com",
  databaseURL: "https://todoapp22-e87d9-default-rtdb.firebaseio.com",
  projectId: "todoapp22-e87d9",
  storageBucket: "todoapp22-e87d9.appspot.com",
  messagingSenderId: "750747847800",
  appId: "1:750747847800:web:2231239e94688caf7bf18d",
  measurementId: "G-1KT8VGY4BL",
};
// Initialize Firebase
var app = initializeApp(firebaseConfig);
var database = getDatabase(app);

var inp = document.getElementById("inp");
var list = document.getElementById("list");

var todelist = [];

// console.log(todelist);

// window.AddTodo = function () {
//   todelist.push(inp.value);
//   inp.value = "";
//   render();
// };

window.AddTodo = function () {
  var input = {
    input: inp.value,
  };

  var referkey = ref(database);
  var randomId = push(referkey).key;
  input.id = randomId;

  var reference = ref(database, `inputValues/${input.id}`);
  set(reference, input);
  inp.value = "";
};

window.getData = function () {
  var refer = ref(database, "inputValues");
  onChildAdded(refer, function (data) {
    render(data.val());
    // console.log(data.val());
  });
};

getData();

var list = document.getElementById("list");

window.render = function (data) {
  if (data) {
    todelist.push(data);
  }

  list.innerHTML = "";
  for (var i = 0; i < todelist.length; i++) {
    list.innerHTML += `<li class="txt-aqua">${todelist[i].input}
        <button onclick="editTodo(${i},'${todelist[i].id}')" class ="btn position-absolute end-0"><i class="fa-solid fa-pencil fa-beat" style="color: #2cc93e;"></i></button>
        <button onclick="deleteTodo(${i},'${todelist[i].id})" class ="pose"><i class="fa-solid fa-trash-can fa-beat-fade" style="color: #26c965;"></i></button>
      </li>`;
  }
};

//window.editTodo = function (index, id) {
// var newText = prompt("Enter updated data", todelist[index].input);
// if (newText !== null) {
//   todelist[index].input = newText;
//   render();
// }

// var refer = database.ref("inputValues/" + id);
// refer.update({
//   input: newText,
// });
//};

window.editTodo = function (index, id) {
  var newText = prompt("Enter updated data", todelist[index].input);
  if (newText !== null) {
    todelist[index].input = newText;
    render();

    var refer = ref(database, "inputValues/" + id);
    update(refer, {
      input: newText,
    });
  }
};

window.deleteTodo = async function (index, id) {
  try {
    // Remove the todo item from the local array
    todelist.splice(index, 1);

    // Remove the todo item from the Firebase database
    var refer = ref(database, `inputValues/${id}`);
    await remove(refer);

    // Update the UI to reflect the deletion
    render();
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};
