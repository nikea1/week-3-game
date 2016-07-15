
//initialize dictionary
var words = [
			"Jungle Book",
			"Cinderella", 
			"Lion King",
			"Frozen",
			"Aladdin",
			"Beauty and the Beast",
			"Snow White and the Seven Dwarfs",
			"Zootopia",
			"Tangled",
			"Inside Out",
			"Princess and the Frog",
			"Finding Nemo",
			"Mulan",
			"Sleeping Beauty",
			"Hercules",
			"Peter Pan",
			"Hunchback of Notre Dame",
			"Mary Poppins",
			"Incredibles",
			"Fantasia",
			"Robin Hood",
			"Pocahontas",
			"Pinochio",
			"Lilo and Stitch",
			"Alice in Wonderland",
			"The Aristocats",
			"The Nightmare Before Christmas",
			"Oliver and Company",

			];

//initialize bucket
var letterCheck = [];

//initalizes used list
var lettersUsed = [];
//set hangman guesses
var chances;

//set found flag to false
var flag;

//set newGame flag to false
var newGame = true;

//set isWinner flag to false
var isWinner;
	
//canvas stuff goes here

var r; //random selection based of number of words in dictionary
var word;//choses word to guess this round based on random number generated above
var board;	//initialize board to put correct guesses

var win = 0;

//input from keyboard
document.onkeyup = function(e){

	if(newGame){//reset game
		
		chances = 10;	//reset number of chances
		document.getElementById("guesses").innerHTML = chances;

		flag = false;	//mark guess flag as false

		isWinner = false;	//set winner flag to false

		//canvas

		//initial letter check bucket
		for (var i = 25; i >= 0; i--) {
			letterCheck[i] = 0;
		}

		lettersUsed = [];
		document.getElementById("letters").innerHTML = lettersUsed;
		
		r = Math.floor(Math.random()*words.length); //randomly selects new word
		word = words[r];	//choses word to guess this round
		board = [];	//initialize board

		for (var i = word.length - 1; i >= 0; i--) {
			if(word.charAt(i) != " ")
				board[i] = "_";
			else 
				board[i] = " "
		}

		//display initialized board
		var getBoard = document.getElementById("gameboard");
		console.log(getBoard);
		getBoard.innerHTML = board.join(" ");



		newGame = false;	//set newGame flag to false
	}
	else{
		//console.log("Keying in... " + event.keyCode);
		var bucketKey = event.keyCode - 65; //converts keycode to bucket index

		if(chances > 1){	//run if there are guesses left

			if((bucketKey >= 0 && bucketKey < 26)&& letterCheck[bucketKey] == 0){ //check if bucket is empty
							
				console.log(event.keyCode);
				var userGuess = String.fromCharCode(event.keyCode).toLowerCase(); //get keyed in letter

				for(var i = 0; i < word.length; i++){ //scan through word and fill board
					console.log(word);
					console.log(word.charAt(i) + " " + userGuess);
					if (word.toLowerCase().charAt(i) == userGuess.charAt(0)){	//compare each letter in word with user's guess

						board[i] = word.charAt(i);	//if there is a match add all instance of guessed letter to the board
						
						if(board.join("") == word)// check if word is solved 
						{
							isWinner = true; // if true search is over, player won the game. Break out of loop
							break;
						}

						flag = true;// flag guess as correct
					}
					
				}//for loop

				var getBoard = document.getElementById("gameboard");
				console.log(getBoard);
				getBoard.innerHTML = board.join(" ");
				console.log(board.join(" "));

				if(!isWinner){	//if player has not won yet
						
					if(!flag) {	//if guess was wrong decrease number of chances to guess
						chances--;

						document.getElementById("guesses").innerHTML = chances;
						lettersUsed.push(String.fromCharCode(event.keyCode));
						document.getElementById("letters").innerHTML = lettersUsed;
					}
					console.log(chances);		
					flag = false;	//reset flag
					letterCheck[bucketKey] = 1; //mark letter in bucket as used
				}
				else {//if player won
					console.log("winner!"); //declare player winner
					win++;

					document.getElementById("wins").innerHTML = win;

					newGame = confirm("Congrats! Wanna play again?"); //ask to play again
					if(newGame){
						document.getElementById("gameboard").innerHTML = "Press any key to start!";
					}
				}

			}//check if letter is chosen
			else console.log("pick another letter"); //if bucket is marked true prompt to pick another letter
		}//if chances end
		else{
			console.log("game over");	//if number of chances are used up declare game over
			newGame = confirm("Game over. Play again?"); //ask to play again.
			if(newGame){
						document.getElementById("gameboard").innerHTML = "Press any key to start!";
					}
		}
	}

}//input
	




