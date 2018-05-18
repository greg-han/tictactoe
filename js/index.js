window.onload = init;
//Try "blocking" check if X is close to copmlete
//If not, use the LCV heuristic.
//This can be set with "X" and "O" in the slots if need be.
var selectorX = document.getElementById("X");
var selectorO = document.getElementById("O");

//Framework for the game.
//previous assignment should not be turn.
var turn = "";
var prevAssignment = "";
var BOARD_LENGTH = 9;
var SOLUTION_LENGTH = 7;
var inPlay = false;
var asked = false;
var board = [11,12,13,21,22,23,31,32,33];
var ORIGboard = [11,12,13,21,22,23,31,32,33];
var ORIGsolutions = [[11,12,13],[11,21,31],[11,22,33],[12,22,32],[21,22,23],[31,32,33],[13,23,33]];
var ORIGneighbors = {
 "11" : [11,12,13,21,31,22,33],
 "12" : [11,13,21,22,23],
 "13" : [12,11,23,33,22,31],
 "21" : [11,12,22,23,31,32],
 "22" : [11,12,13,21,23,31,32,33],
 "23" : [13,12,22,21,33,32],
 "31" : [21,11,32,33,22,13],
 "32" : [22,12,31,33,21,23],
 "33" : [32,31,23,13,22,11]
 }

//End framework

//All variables that will have values upon construction
var human;
var ai;
var boardConstraints; 
var oneone,onetwo,onethree,twoone,twotwo,twothree,threeone,threetwo,threethree;
var parseMap = {
 '11' : 'oneone' , '12' : 'onetwo', '13':'onethree',
 '21' : 'twoone', '22' : 'twotwo', '23': 'twothree',
 '31' : 'threeone', '32' : 'threetwo', '33' : 'threethree'
 }

//end constructor variables.

//player object.
//check if you are close to a solution state by seeing if any have one left.
/*var player = function(){
  self.side = "";
  self.solved = false;
  self.solutionStates = [[11,12,13],[11,21,31],[11,22,33],[12,22,32],[21,22,23],[31,32,33],[13,23,33]];
}*/
var human = {
  'side' : "",
  'solved' : false,
  'solutionStates' : [[11,12,13],[11,21,31],[11,22,33],[12,22,32],[21,22,23],[31,32,33],[13,23,33]]
}

var ai = {
  'side' : "",
  'solved' : false,
  'solutionStates' : [[11,12,13],[11,21,31],[11,22,33],[12,22,32],[21,22,23],[31,32,33],[13,23,33]]
}

//constructor
function init(){
//redundantly storing domain access in an object for practice.
 oneone = document.getElementById("11");
 onetwo = document.getElementById("12");
 onethree = document.getElementById("13");
 twoone = document.getElementById("21");
 twotwo = document.getElementById("22");
 twothree = document.getElementById("23");
 threeone = document.getElementById("31");
 threetwo = document.getElementById("32");
 threethree = document.getElementById("33");
 boardConstraints = ORIGneighbors;
 
}

//Simply inputs the square, no smarts.

//Right now, the squares get tagged fro some reason.
function fillSquare(square){
 console.log("board in fill square",board);
 if (inPlay){
  var squarenum = parseInt(square);
    //This already checks the constraints.
     //update board.
     if(turn == "human"){
       ///do consistency checks here, do not change turns until
       //a square has been picked. You can
        if(board.indexOf(squarenum) != -1 && prevAssignment != eval(turn).side){
         board[board.indexOf(squarenum)] = String(human.side);
         eval(parseMap[String(square)]).innerHTML = human.side;
         prevAssignment = human.side;
         changeTurn();
        }

     }//end of if turn is human
     else{//if turn is ai.
        if(board.indexOf(squarenum) != -1 && prevAssignment != eval(turn).side){
         board[board.indexOf(squarenum)] = String(ai.side);
         eval(parseMap[String(square)]).innerHTML = ai.side;
         prevAssignment = ai.side;
         changeTurn();
       }//end of if the board is not already filled.
     }//end of else ai
   }//end of inplay
  //constraint filling function
  updateConstraints(squarenum); 
  //update1solution states
  updateSolutionStates(squarenum);
 }//end of fillsquare 


//This will raise the letters of the selection until one is clicked. Until then, the game cannot start.
function askChoice(){
  //alert("in function ask choice");
  if(!asked){
  selectorX.style.textShadow = "4px 4px 4px black";
  selectorX.style.fontSize = "1.5em";
  selectorO.style.textShadow = "4px 4px 4px black";
  selectorO.style.fontSize = "1.5em";
  asked = true;
  }
}

//This is called when onclick X or O
function choosePlayer(choice){
if(!inPlay && asked){
  if(String(choice) == "X"){
   human.side = "X";ai.side = "0";
   selectorX.style.textShadow = "4px 4px 4px black";
   selectorO.style.textShadow = "0px 0px 0px white";
   selectorO.style.fontSize = "1em";}
  else{
   human.side = "O"; ai.side = "X";
   selectorX.style.textShadow = "0px 0px 0px white";
   selectorO.style.textShadow = "4px 4px 4px black";
   selectorX.style.fontSize = "1em";}
 }
 inPlay = true;
}

function changeTurn(){
 if(turn === "human"){turn = "ai";}
 else{turn = "human";}
}

//Start the game
function startGame(){
if(!inPlay){
  askChoice();
 }
turn = "human";
}

//destructor function
//javascript is getting the addresses mixed up between board and ORIGboard after aw hile.
function restart(){
  //When set as board = ORIGboard, after a few iterations it would fail
  //so this function stopped that problem for some reason. (Liekly to do with memory addresses.)
  board = [];
  ORIGboard.forEach(function(element){
   board.push(element);
  });
  var domarr = [];
  domarr = Object.values(parseMap);
  for (var b = 0; b < domarr.length; b++){
   eval(domarr[b]).innerHTML = "";
  }
  inPlay = false;
  asked = false;
  turn = "";
  prevAssignment = "";
  human.side = "";
  human.solutionStates = ORIGsolutions;
  ai.side = "";
  ai.solutionStates = ORIGsolutions;
  boardConstraints = ORIGneighbors;
  selectorX.style.textShadow = "2px 2px 2px #8F8F8F";
  selectorX.style.fontSize = "1em";
  selectorO.style.textShadow = "2px 2px 2px #8F8F8F";
  selectorO.style.fontSize = "1em";
}

//go through the solutions list, and see if any of them have just one left
//if so, solve!
function checkForSolution(sbox){
  
}

function blockOpponent(bbox){
 //go through opponents solutions list, and check if any of them have just one left.
 //if so, block
}
  
//Check if you may need getters and steters in this context.
function updateSolutionStates(ssquare){
 var ssquarenum = parseInt(ssquare);
 var playersolutions = human.solutionStates;
 var aisolutions = ai.solutionStates;
 for(var m = 0; m < SOLUTION_LENGTH; m++){
   if(playersolutions[m].indexOf(ssquarenum) != -1){
     playersolutions[m][playersolutions[m].indexOf(ssquarenum)] = human.side;
   }
   if(aisolutions[m].indexOf(ssquarenum) != -1){
     aisolutions[m][aisolutions[m].indexOf(ssquarenum)] = ai.side;
   }
  human.solutionsStates = playersolutions;
  ai.solutionStates = aisolutions;
 }//end of for loop through solutions;
  //console.log("human states",human.solutionStates);
  //console.log("ai states",ai.solutionStates);
}//end of update solution state function


//Do this function over again.
function updateConstraints(csquare){
 console.log("Board Constraints B4",boardConstraints);
 var constraintarrs = Object.values(boardConstraints);
 var keyarrs = Object.keys(boardConstraints);
 for (var n = 0; n < constraintarrs.length; n++) {
      if(constraintarrs[n].indexOf(parseInt(csquare)) != -1){
          if(turn === "human"){
            //if it does have the value, then it's index in the temp constraintarrs [n] array will be updated with X or O
            //constraint arrs and boardconstrinats are iterated in parallel, replace the array in boardConstraints.
            constraintarrs[n][constraintarrs[n].indexOf(parseInt(csquare))] = human.side;
            boardConstraints[keyarrs[n]] = constraintarrs[n];
          }//end of if human
          else{
            // "" repeat above
            constraintarrs[n][constraintarrs[n].indexOf(parseInt(csquare))] = ai.side;
            boardConstraints[keyarrs[n]] = constraintarrs[n];
          }///end of if ai
      }//end of checking if it evne hast he value in the array.
  }//iterae through the keys of the map
 //console.log("Constraints After",boardConstraints);
}//end of the updateConstriants function.


