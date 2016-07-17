//creates game properties and functions
var hangmanGame = {
	//defines dictionary
	dictionary:[
			"Jungle Book",
			"Cinderella", 
			"Lion King",
			"Frozen",
			"Aladdin",
			"Beauty And The Beast",
			"Snow White And The Seven Dwarfs",
			"Zootopia",
			"Tangled",
			"Inside Out",
			"Princess And The Frog",
			"Finding Nemo",
			"Mulan",
			"Sleeping Beauty",
			"Hercules",
			"Peter Pan",
			"Hunchback Of Notre Dame",
			"Mary Poppins",
			"Incredibles",
			"Fantasia",
			"Robin Hood",
			"Pocahontas",
			"Pinochio",
			"Lilo And Stitch",
			"Alice In Wonderland",
			"The Aristocats",
			"The Nightmare Before Christmas",
			"Oliver And Company",
			],

			word:"",	//initaizes word to be selected for game
			letterBucket:[],	//initializes Letter bucket
			letterUsed:[],		//initializes letter used list
			board:[],			//initalizes game board
			chances:10,			//initalizes the amount of wrong guesses left
			flag:false,			//initializes userCorrect flag		
			win:0,				//initializes win counter
			newGame:true,		//initailizes new game flag
			winner:false,		//initalizes winner flag

			setWord:function(){
				var r = Math.floor(Math.random()*this.dictionary.length);	//randomly selects new word
				this.word = this.dictionary[r];								//choses word to guess this round
			},

			getWord:function(){
				return this.word;											//returns selected word
			},

			initBucket:function(){
				for (var i = 25; i >= 0; i--) {
					this.letterBucket[i] = 0;								//initalizes bucket for new game
				}
			},

			setBucket:function(code){
				this.letterBucket[code] = 1;								//flags letter as used
			},

			getBucket:function(code){
				return this.letterBucket[code];								//returns list of used words
			},

			initUsedList:function(){

				this.letterUsed = [];										//initalizes Used list
			},

			addToUsedList:function(letter){
				this.letterUsed.push(letter);								//adds to used list
			},

			getUsedList:function(){
				return this.letterUsed;										//returns list of used letters
			},

			initBoard:function(){
				this.board = [];
				for (var i = this.word.length - 1; i >= 0; i--) {
					if(this.word.charAt(i) != " ")
						this.board[i] = "_";								//initalizes board with correct amount of spaces
					else 
						this.board[i] = " ";
				}
			},

			updateBoard:function(index, char){

				this.board[index] = char;									//updates game board
			},

			getBoard:function(){
				return this.board;											//returns current game board
			},

			initGuesses:function(){
				this.chances = 10;
			},

			getGuesses:function(){
				return this.chances;										//get current amount of guess left
			},

			decrementGuesses:function(){
				this.chances--;												//decrement guesses
			},

			getWins:function(){
				return this.win;											//get number of wins
			},

			incrementWins:function(){
				this.win++;													//add wins
			},

			setIsRight:function(bool){
				this.flag = bool;											//sets userguess flag
			},

			isRight:function(){
				return this.flag;											//returns userguess
			},
			setGameStatus:function(bool){
				this.newGame = bool;										//sets game status
			},
			isNewGame:function(){
				return this.newGame;										//returns game status
			},

			isWinner:function(){
				return this.winner;											//return winner status
			},

			setWinner:function(bool){
				this.winner = bool;											//set winner status
			}


};


//canvas stuff goes here
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


function drawLine(ctx, x1, y1, x2, y2){

	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.stroke();
}

function drawCircle(ctx, x, y, r){

	ctx.beginPath();
	ctx.arc(x,y,r,0,2*Math.PI);
	ctx.stroke();
}

function drawClear(ctx){
	//ctx.clearRect(0,0,300,300);

	//completely resets canvas pipeline
	canvas.width = canvas.width;
}

//input from keyboard
document.onkeyup = function(e){

	if(hangmanGame.isNewGame()){//reset game
		
		drawClear(ctx);//clears canvas

		
		hangmanGame.initGuesses();
		
		document.getElementById("guesses").innerHTML = hangmanGame.getGuesses();//resets guesses on screen

		hangmanGame.setIsRight(false) ;	

		hangmanGame.setWinner(false);	

		//canvas

		hangmanGame.initBucket();

		hangmanGame.initUsedList();
		
		document.getElementById("letters").innerHTML = hangmanGame.getUsedList(); //resets letter list on screen
		
		//get word for new game
		hangmanGame.setWord();

		console.log("getWord " + hangmanGame.getWord());

		hangmanGame.initBoard();

		//display initialized board
		var getBoard = document.getElementById("gameboard");
		
		console.log(getBoard);
		
		//getBoard.innerHTML = board.join(" ");
		getBoard.innerHTML = hangmanGame.getBoard().join(" ");

		hangmanGame.setGameStatus(false);	//set newGame flag to false
	}
	else{
		
		var bucketKey = event.keyCode - 65; //converts keycode to bucket index

		if(hangmanGame.getGuesses() >= 1){	//run if there are guesses left
			
			console.log("get bucket " + hangmanGame.getBucket(bucketKey));
			
			if((bucketKey >= 0 && bucketKey < 26)&& /*letterCheck[bucketKey]*/hangmanGame.getBucket(bucketKey) == 0){ //check if bucket is empty
							
				console.log(event.keyCode);
				
				var userGuess = String.fromCharCode(event.keyCode).toLowerCase(); //get keyed in letter

				for(var i = 0; i < hangmanGame.getWord().length; i++){ //scan through word and fill board
					
					if (hangmanGame.getWord().toLowerCase().charAt(i) == userGuess.charAt(0)){	//compare each letter in word with user's guess

						hangmanGame.updateBoard(i, hangmanGame.getWord().charAt(i));

						if(hangmanGame.getBoard().join("") == hangmanGame.getWord())// check if word is solved 
						{
							hangmanGame.setWinner(true); // if true search is over, player won the game. Break out of loop
							
							break;
						}

						hangmanGame.setIsRight(true); // flag guess as correct
					}//if statement end
					
				}//for loop end

				var getBoard = document.getElementById("gameboard");
				console.log(getBoard);
				console.log(hangmanGame.getBoard());
				getBoard.innerHTML = /*board*/hangmanGame.getBoard().join(" ");
				console.log(/*board*/hangmanGame.getBoard().join(" "));

				if(!hangmanGame.isWinner()){	//if player has not won yet
						
					if(!hangmanGame.isRight()) {	//if guess was wrong decrease number of chances to guess
						//chances--;
						hangmanGame.decrementGuesses();
						console.log(hangmanGame.getGuesses());	
						if(hangmanGame.getGuesses() == 9)
							drawLine(ctx, 75, 250, 225, 250); //base
						if(hangmanGame.getGuesses() == 8)
							drawLine(ctx, 150, 50, 150, 250); //pole
						if(hangmanGame.getGuesses() == 7)
							drawLine(ctx, 150, 50, 225, 50); //beam
						if(hangmanGame.getGuesses() == 6)
							drawLine(ctx, 225, 50, 225, 75);	//rope
						if(hangmanGame.getGuesses() == 5)
							drawCircle(ctx, 225, 95, 20);	//head
						if(hangmanGame.getGuesses() == 4)
							drawLine(ctx, 225, 115, 225, 180);	//body
						if(hangmanGame.getGuesses() == 3)
							drawLine(ctx, 225, 115, 240, 165);	//right arm
						if(hangmanGame.getGuesses() == 2)
							drawLine(ctx, 225, 115, 210, 165);	//left arm
						if(hangmanGame.getGuesses() == 1)
							drawLine(ctx, 225, 180, 235, 240);	//right leg
						if(hangmanGame.getGuesses() == 0){
							drawLine(ctx, 225, 180, 215, 240);	//left leg

							
							hangmanGame.setGameStatus(confirm("Game over. Play again?"));
							
							if(hangmanGame.isNewGame()){
								document.getElementById("gameboard").innerHTML = "Press any key to start!";
							}

						}

						
						document.getElementById("guesses").innerHTML = hangmanGame.getGuesses();
						
						hangmanGame.addToUsedList(String.fromCharCode(event.keyCode));
						
						document.getElementById("letters").innerHTML = hangmanGame.getUsedList();


					}
						
					hangmanGame.setIsRight(false);	//reset flag
					
					hangmanGame.setBucket(bucketKey);
				}
				else {//if player won
					console.log("winner!"); //declare player winner
					
					hangmanGame.incrementWins();

					document.getElementById("wins").innerHTML = hangmanGame.getWins();

					
					hangmanGame.setGameStatus(confirm("Congrats! Wanna play again?"));
					
					if(hangmanGame.isNewGame()){
						document.getElementById("gameboard").innerHTML = "Press any key to start!";
					}
				}

			}//check if letter is chosen
			else console.log("pick another letter"); //if bucket is marked true prompt to pick another letter
		}//if there are guesses left end
		else{
			console.log("game over");	//if number of chances are used up declare game over
			
			hangmanGame.setGameStatus(confirm("Game over. Play again?")); //ask to play again.
			
			if(hangmanGame.isNewGame()){
						document.getElementById("gameboard").innerHTML = "Press any key to start!";
					}
		}//else end
	}//else end

}//input