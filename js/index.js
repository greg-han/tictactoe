window.onload = init;
//Try "blocking" check if X is close to copmlete
//If not, use the LCV heuristic.
var board = [11,12,13,21,22,23,31,32,33];
var neighbors = {
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
var inPlay = false;
var xDomain;
var oDomain;
var player;
var ai;

function init(){
 xDomain = board;
 oDomain = board;
}

function choosePlayer(choice){
 if(!inPlay){
  player = choice;
  if(choice == "X"){ai = "O";}
  else{ai = "X";}
 }
}



