window.onload = init;
//Try "blocking" check if X is close to copmlete
//If not, use the LCV heuristic.
//This can be set with "X" and "O" in the slots if need be.
var board = [11,12,13,21,22,23,31,32,33];
var inPlay = false;
var self;
var ai;
var boardConstraints;
//Turn can be either human or ai
var turn = "";
var BOARD_LENGTH = 9;
var SOLUTION_LENGTH = 7;
var oneone,onetwo,onethree,twoone,twotwo,twothree,threeone,threetwo,threethree;
var parseMap ={
 "11" : oneone, "12" : onetwo, "13":onethree,
 "21" : twoone, "22" : twotwo, "23": twothree,
 "31" : threeone, "32" : threetwo, "33" :threethree
 }
 //player object.
var player = function(){
  var side = "";
  var solved = false;
  //check if you are close to a solution state by seeing if any have one left.
  var solutionStates = [[11,12,13],[11,21,31],[11,22,33],[12,22,32],[21,22,23],[31,32,33],[13,23,33]];
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
 human = player();
 ai = player();
 boardConstraints = {
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
}

//Simply inputs the square, no smarts.
//don't forget to check if the square is occupied or just don't call this function unless you have the other conditoins met
//however, you would make this the onclick function so you would have conditional checks in between.
function fillSquare(square){
 if (inPlay){
  var csquarenum = parseInt(parseMap(String(square).innerHTML == human.side));
  for(var i = 0; i < BOARD_LENGTH; i++){
    if(board.indexOf(squarenum) != NaN){
     //constraint filling function
     updateConstraints(squarenum); 
     //update solution states
     //update board.
     if(turn == "human"){
       board[board.indexOf(squarenum)] = String(human.side);
     }//end of if turn is human
     else{//if turn is ai.
       board[board.indexOf(squarenum)] = String(ai.side);
     }//end of else ai
    }//end of checking if the part of the board has this value "free" (Nan)
   }//end of the for loop going through the board array.
 }// end of inPlay
}// end of fillsqurae function


//Check if you may need getters and steters in this context.
function updateSolutionStates(ssquare){
 var ssquarenum = parseInt(parseMap(ssquare));
 var playersolutions = human.solutionStates;
 var aisolutions = ai.solutionStates;
 for(var m = 0; m < SOLUTION_LENGTH; m++){
   if(playersolutions[m].indexOf(ssquarenum) != -1){
     human.solutionStates = playersolutions[m][playersolutions[m].indexOf(ssquarenum)] = human.side;
   }
   if(aisolutions[m].indexOf(ssquarenum) != -1){
     ai.solutionStates = aisolutions[m][aisolutions[m].indexOf(ssquarenum)] = ai.side;
   }
 }//end of for loop through solutions;
}//end of update solution state function


function updateConstraints(csquare){
 for (var key in boardConstraints) {
    if (boardConstraints.hasOwnProperty(key)) {
      for(var k = 0; k < boardConstraints[key].length; k++){
        if(boardConstraints[key][k] === parseInt(csquare)){
          if(turn === "human"){
            boardConstraints[key] === human.side;
          }//end of if human
          else{
            boardConstraints[key] === ai.side;
          }///end of if ai
        }//end of if statement for thev value.
      }//end of for loop checking the entre board
    }//redundantly check if the key is in the map
  }//iterae through the keys of the map
}//end of the updateConstriants function.


//Start the game
function startGame(){
 if(!inPlay){
  askChoice();
 }
}
  
//This will raise the letters of the selection until one is clicked. Until then, the game cannot start.
function askChoice(){
  var selectorX = document.getElementById("X");
  var selectorO = document.getElementById("O");
 while(self.side == ""){
  selectorX.style.textShadow = "4px 4px 4px black";
  selectorO.style.textShadow = "4px 4px 4px black";
 }
 inPlay = true;
}

//This is called when onclick X or O
function choosePlayer(choice){
 if(!inPlay){
  player = choice;
  if(choice == "X"){self.side = "X";ai.side = "0";
   selectorX.style.textShadow = "4px 4px 4px black";
   selectorO.style.textShadow = "0px 0px 0px white";}
  else{self.side = "O"; ai.side = "X";
   selectorX.style.textShadow = "0px 0px 0px white";
   selectorO.style.textShadow = "4px 4px 4px black";}
 }
}



