## Tic Tac Toe
Pretty self explanatory.
My attempt at making a tic tac toe game with a rudimentary AI.
Purposefully did not use or read about any outside resources for planning the AI strategy so that I can practice and implement what I had learned in school.
It turned out meh, but it has legitimately beat me once lol.

Uses MRV/LCV depending on if it gets the center square. If it has the center square, it will be on the offense and use LCV (Least Constraining value). If it does not, then it will use MRV (Minimum remaining values) and play defensively.
This strategy came from playing myself many many times. I noticed that if you have the center square, you want to open up and take the corners and take the least restrictive position.
If you do not have the corner, you are essentially defending, because you do not have the advantage of being abel to play every point nin the board. Therefore, you want the value that is most constrictive in order to leave the least available options for the playe ron the offense.
Sometimes it will just not get position at all. This is from the built in randomness. I put in the randomness so that you don't just lose/draw everytime, and so that the AI does not have an exactly predictable outcome every time.


Link to working version on heroku: https://aitictactoe.herokuapp.com/

## Features

* Start: Starts the game.
* Refresh: Starts the game over/stops the game. This may change to "stop" with the same functionality.
* X/O : Just a selector for player.
