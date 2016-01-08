'use strict';


var currentNumQueue = "";
var currentEvalQueue = {num1: "", num2: "", op: ""};
var lastOperator = "";
var clearCount = 0;



//on doc ready load up event listeners to dom elements

document.addEventListener('DOMContentLoaded', function() {
  startEventListeners();
});



//code to add event listeners

function startEventListeners() {
var numberButtons = document.getElementsByClassName('button');
for(var i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener('click', numberClicked);
}
}


//input handler  (use switch statement instead of if else)
function numberClicked(event) {
  var button = event.target;
  var keyMap = {key1: "clear", key2: "toggle", key3: "topercent", key4: "/", key5: 7, key6: 8, key7: 9, key8: "*", key9: 4, key10: 5, key11: 6, key12: "-", key13: 1, key14: 2, key15: 3, key16: "+", key17: 0, key18: ".", key19: "="}
  var buttonValue = keyMap[button.id];
  var buttonId = button.id;



  if (buttonValue === '.' && currentNumQueue.indexOf('.') === -1  ) { //inject decimal only once per number series logic
    currentNumQueue += buttonValue.toString()
    console.log('Decimal added buddy!');
    console.log('debugging EvalQueue: num1:'+currentEvalQueue.num1+'   num2: '+currentEvalQueue.num2+'   op: '+currentEvalQueue.op+'   NumQueue: '+currentNumQueue);
  }

  else if (buttonValue === "clear"){
    currentEvalQueue.op = buttonValue;
    executeQueue(currentEvalQueue);
    updateHighlight(buttonId);
  }


  else if (isNaN(buttonValue)) {  //the value is an operator
    console.log('Operator pressed', buttonValue)

    if (currentEvalQueue.num1 === "" && currentNumQueue !== "") { //if theres no num1, op but there IS a num queue push numqueu to executeQueue
      console.log('at op key strike queued up the math buddy!'+parseInt(currentNumQueue, 10));
      currentEvalQueue.num1 = parseInt(currentNumQueue, 10);
      currentNumQueue = "";
      currentEvalQueue.op = buttonValue;
      console.log('debugging EvalQueue: num1:'+currentEvalQueue.num1+'   num2: '+currentEvalQueue.num2+'   op: '+currentEvalQueue.op+'   NumQueue: '+currentNumQueue);


    }


    else if (currentEvalQueue.op != "" && currentEvalQueue.num2 === ""){

      //execute the queue, set num1 to result, reset op and num2 vals
      currentEvalQueue.num2 = parseInt(currentNumQueue, 10);

      var newResult = executeQueue(currentEvalQueue);
      currentEvalQueue.num1 = newResult;
      lastOperator = buttonValue;
      currentEvalQueue.op = "";
      currentEvalQueue.num2 = "";
      currentNumQueue = "";
      console.log('maths has been done buddy! answer is: '+newResult)
      console.log('debugging EvalQueue: num1:'+currentEvalQueue.num1+'   num2: '+currentEvalQueue.num2+'   op: '+currentEvalQueue.op+'   NumQueue: '+currentNumQueue);


    }

    else if (currentEvalQueue.num1 !== "" && (currentEvalQueue.num2 === "" && currentEvalQueue.op === "")) {

      // lastOperator = buttonValue;
      currentEvalQueue.op = lastOperator;
      currentEvalQueue.num2 = parseInt(currentNumQueue, 10);

      var newResult = executeQueue(currentEvalQueue);
      currentEvalQueue.num1 = newResult;
      currentEvalQueue.op = "";
      currentEvalQueue.num2 = "";
      currentNumQueue = "";
      lastOperator = buttonValue;
      console.log('maths has been done buddy! answer is: '+newResult)
      console.log('debugging EvalQueue: num1:'+currentEvalQueue.num1+'   num2: '+currentEvalQueue.num2+'   op: '+currentEvalQueue.op+'   NumQueue: '+currentNumQueue);


    }


    else if ((currentEvalQueue.num1 !== "" && currentEvalQueue.op !== "") && currentEvalQueue.num2 === ""){

      console.log('nothing to math buddy!');
      console.log('debugging EvalQueue: num1:'+currentEvalQueue.num1+'   num2: '+currentEvalQueue.num2+'   op: '+currentEvalQueue.op+'   NumQueue: '+currentNumQueue);
      //DO NOTHING! MAY REMOVE THIS AFTER TESTING!

    }

    updateHighlight(buttonId);

  }
  else if (currentNumQueue.length <= 11) {
    //it must be a number!
    currentNumQueue += buttonValue.toString();
    console.log('updated number queue buddy!',currentNumQueue);
    console.log('debugging EvalQueue: num1:'+currentEvalQueue.num1+'   num2: '+currentEvalQueue.num2+'   op: '+currentEvalQueue.op+'   NumQueue: '+currentNumQueue);

  }


  updateDisplay(currentEvalQueue, currentNumQueue);

}


function updateDisplay(evalQueue, numQueue) {

  if (evalQueue.num1 !== "") {
    document.getElementById('digits').textContent = currentEvalQueue.num1;
    //set display to latest result
  }
  else {
    //set diplay to current numqueue
    document.getElementById('digits').textContent = currentNumQueue;
  }
}

function updateHighlight(buttonid) {

  console.log('whats the value by key', buttonid);
  //document.getElementsByClassName('button').style.cssText = "background: linear-gradient(10deg, rgba(0, 0, 0, 0.19), rgba(0, 0, 0, 0))";
  document.getElementById(buttonid).style.cssText = "background-color: rgba(117, 117, 117, 0.16)";
}







function executeQueue(currentqueue) {


  var currentOp = currentqueue.op;
  console.log(currentqueue.op);
  var val1 = currentqueue.num1;
  var val2 = parseInt(currentqueue.num2, 10);
  //console.log('debugging EvalQueue: num1:'+val1+'   num2: '+currentqueue.num2+'   op: '+currentqueue.op+'   NumQueue: '+currentNumQueue);

  if (currentOp === "+") {
    return val1+val2;
  }

  if (currentOp === "-") {
    return val1-val2;
  }

  if (currentOp === "/") {
    return val1/val2;
  }

  if (currentOp === "*") {
    return val1*val2;
  }

  // if (currentOp == 'topercent') {
  //   return val1+val2;
  // }
  //
  if (currentOp == 'clear') {
    if (clearCount === 0){
      clearCount++;
      if (currentNumQueue === "") {
        currentEvalQueue.op = "";
      }
      else if (currentNumQueue !== ""){
        currentNumQueue = "";
      }
      else if (currentEvalQueue.num2 !== ""){
        currentEvalQueue.num2 = "";
      }
      else if (currentEvalQueue.op !== "") {
        currentEvalQueue.op = "";
      }
      else if (currentEvalQueue.num1 !== "") {
        currentEvalQueue.num1 = "";
      }
      else {
        currentNumQueue = "";
      }
      console.log('debugging clear func 1: num1:'+currentEvalQueue.num1+'   num2: '+currentEvalQueue.num2+'   op: '+currentEvalQueue.op+'   NumQueue: '+currentNumQueue);
      //only undo last entry

    }
    else {
      //clear all mem
      clearCount = 0;
      currentEvalQueue.op = "";
      currentEvalQueue.num2 = "";
      currentEvalQueue.num1 = "";
      currentNumQueue = "";
      console.log('debugging clear func 2: num1:'+currentEvalQueue.num1+'   num2: '+currentEvalQueue.num2+'   op: '+currentEvalQueue.op+'   NumQueue: '+currentNumQueue);

    }
    currentEvalQueue.op = "";
  }



}
