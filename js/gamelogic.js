/*
@TODO
DONE Get name from both users in text box
DONE finalize on button press
DONE maintain cell values in array
DONE alternate turns
DONE use math to add across down and diagonal, all rows
DONE if x, add 1
DONE if o, subtract 1
DONE if any row totalled = -3 or 3 player one or two has won
DONE if a row totals 3 player 1 has won
DONE if a row totals -3 player 2 has won
DONE create module
DONE create controllers
*/

//store cells and player turn
//Initialize variables
var cells = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var pTurn = 0;
var turns = 0;
var gameOver = false;
var p1Wins = 0; var p2Wins = 0;

//alternate who's playing
function alternate(){
	if (pTurn == 0) {
		pTurn = 1
	} else {
		pTurn = 0
	}
}

//mark the cell (table datum) clicked
function markCell(number){
	//Only do if game is still going
	if (gameOver == false) {
		//Only do if the cell is empty
		if (cells[number] == 0) {
			console.log("clicked on cell number " + number);
			//Switch block for whose turn it is
			switch(pTurn) {
				//Player one gets a 1 in the array, Player two gets a -1
				case 0://player1
					$("#" + number).html("X");
					cells[number] = 1;
					break;
				case 1://player2
					$("#" + number).html("O");			
					cells[number] = -1;
					break;						
			}

			//Add a turn before checking math so a draw works						
			turns += 1;
			//switch player
			alternate();
			//use timeout before doing math so mark is placed before winner is decided
			setTimeout(function() {/*check board*/ checkMath();}, 250);
			console.log(cells);	
			console.log("turns: " + turns);				
		} else {
			alert("A player has already played this cell!");
		}
	} else {
		alert("The game is already over!")
	}					
}

//math to see if victory
function checkMath(){
	//add all possible
	var across1 = (cells[0] + cells[1] + cells[2]);
	var across2 = (cells[3] + cells[4] + cells[5]);
	var across3 = (cells[6] + cells[7] + cells[8]);

	var down1 = (cells[0] + cells[3] + cells[6]);
	var down2 = (cells[1] + cells[4] + cells[7]);
	var down3 = (cells[2] + cells[5] + cells[8]);

	var diag1 = (cells[0] + cells[4] + cells[8]);
	var diag2 = (cells[2] + cells[4] + cells[6]);

	//If player 1 won
	if (across1 == 3 || across2 == 3 || across3 == 3 || down1 == 3 || down2 == 3 || down3 == 3 || diag1 == 3 || diag2 == 3) {
		//alert("player 1 wins!")
		$("#wintext").html("Player 1 wins!");
		gameOver = true;
		p1Wins += 1;
	//If player 2 won
	} else if (across1 == -3 || across2 == -3 || across3 == -3 || down1 == -3 || down2 == -3 || down3 == -3 || diag1 == -3 || diag2 == -3) {
		//alert("player 2 wins!")
		$("#wintext").html("Player 2 wins!");
		gameOver = true;
		p2Wins += 1;
	//If it's a draw
	} else if (turns == 9) {
		//alert("It's a draw!")
		$("#wintext").html("It's a draw!");
		gameOver = true;
	}
}

function newGame() {
	for (var i = 0; i < cells.length ; i++) {
		$("#" + i).html("");
		cells[i] = 0;
		console.log("cleared visible cell " + i);
	}
	gameOver = false;
	turns = 0; pTurn = 0;
	$("#wintext").html("");
}