
//initialize dictionary
var words = [
			"words", 
			"kotoba", 
			"meaning"
			];

//initialize bucket
var letterCheck = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

//set hangman guesses
var chances = 10;

//set found flag to false
var flag = false;

//set newGame flag to false
var newGame = false;

//set isWinner flag to false
var isWinner = false;
	
//canvas stuff goes here

	

var r = Math.floor(Math.random()*words.length); //random selection based of number of words in dictionary
var word = words[r];//choses word to guess this round based on random number generated above
var board = [];	//initialize board to put correct guesses


	//input from keyboard
	document.onkeyup = function(e){
		
			var bucketKey = event.keyCode - 65; //converts keycode to bucket index

			if(chances > 1){	//run if there are guesses left

				if(letterCheck[bucketKey] == 0){ //check if bucket is empty
								
					console.log(event.keyCode);
					var userGuess = String.fromCharCode(event.keyCode).toLowerCase(); //get keyed in letter

					for(var i = 0; i < word.length; i++){ //scan through word and fill board

						if (word.charAt(i) == userGuess.charAt(0)){	//compare each letter in word with user's guess

							board[i] = userGuess;	//if there is a match add all instance of guessed letter to the board
							
							if(board.join("") == word)// check if word is solved 
							{
								isWinner = true; // if true search is over, player won the game. Break out of loop
								break;
							}

							flag = true;// flag guess as correct
						}
						console.log(board);
					}//for loop

					if(!isWinner){	//if player has not won yet
							
						if(!flag) {	//if guess was wrong decrease number of chances to guess
							chances--;
						}
						console.log(chances);		
						flag = false;	//reset flag
						letterCheck[bucketKey] = 1; //mark letter in bucket as used
					}
					else {//if player won
						console.log("winner!"); //declare player winner
						newGame = confirm("Congrats! Wanna play again?"); //ask to play again
					}

				}//check if letter is chosen
				else console.log("pick another letter"); //if bucket is marked true prompt to pick another letter
			}//if chances end
			else{
				console.log("game over");	//if number of chances are used up declare game over
				newGame = confirm("Game over. Play again?"); //ask to play again.
			}

			if(newGame){//reset game
				
				chances = 10;	//reset number of chances

				flag = false;	//mark guess flag as false

				isWinner = false;	//set winner flag to false
	
				//canvas

				//initial letter check bucket
				for (var i = letterCheck.length - 1; i >= 0; i--) {
					letterCheck[i] = 0;
				}
	

				r = Math.floor(Math.random()*words.length); //randomly selects new word
				word = words[r];	//choses word to guess this round
				board = [];	//initialize board

				newGame = false;	//set newGame flag to false
			}


	}//input
		




