                var ctx = document.getElementById('myCanvas').getContext('2d');
                var frameRate = 20;//Make this equal to an integer
		setInterval(mainLoopFunction, frameRate);
                
                //Variable declarations to hold images
                var boardImage = new Image();
                //Load the image for the connect four board
                boardImage.src = "http://i.imgur.com/BbTKFaE.png?1";
                //Load the image for the red chip
                var redChip = new Image();
                redChip.src = "http://i.imgur.com/IMHob9a.png";
                //Load the image for the blue chip
                var blueChip = new Image();
                blueChip.src = "http://i.imgur.com/XmVIvKg.png";
                var redChipCount = 21;//total number of red chips left
                var blueChipCount = 21;//total number of blue chips still left
                var playerTurn = true; //true = red, false = blue turn
                var mouseClicked = false; //Represent if the mouse has clicked or not
                var turnDelay = 0; //Counter variable used for flashing turn rectangle
                var arrowDelay = 0; //Counter variable used for flashing arrows
                var arrowMultiplier = 7; //value storing which column mouse is currently over
                var mouseX; //Position of mouse (x-coordinate)
                var mouseY; //Position of mouse (y--coordinate)
                var board = [["e","e","e","e","e","e","e"],     //0
                             ["e","e","e","e","e","e","e"],     //1
                             ["e","e","e","e","e","e","e"],     //2
                             ["e","e","e","e","e","e","e"],     //3
                             ["e","e","e","e","e","e","e"],     //4
                             ["e","e","e","e","e","e","e"]];    //5
                var lastPlayer = ""; //Variable to store the last player that played a chip
                var moveArchive = []; //Array to store all previous moves within the game
                var moveCounter = 0; //Counter variable to keep track of how many moves have passed
                var dropHeight = 0; //Variable to store the travelling distance of falling chip
                var pieceLocation; //The row where the chip will be placed
                var placingPiece = false; //Variable to store whether animation is active or not
                var counter = 0; //Simple counter for animation
                var yBound; //Column where chip will be placed
                var velocity = 0; //Initial velocity
                var gameMode = 0;// 0  means no selection, 1 means pvp and 2 means p vs ai
                var fontSize = 0; //Initial font size of home screen
                var fontSpeed = 0.1; //Initial increase in speed;
		
                //Main function that loops indefinitely
                function mainLoopFunction(){
                    //When no game mode is selected
                    if (gameMode === 0){
                        clearCanvas();
                        //Load the menu screen
                        drawMenu();
                        //Check if user has selected a game mode
                        gameModeSelect();
                    }else {
                        //Launch pvp game if selected
                        if (gameMode === 1){
                            clearCanvas();
                            pvpGame();
                        //Launch player vs ai game if selected
                        } else if (gameMode === 2){
                            clearCanvas();
                            pvaGame();
                        }
                    }
                    //Fetch mouse location every time cursor moves
                    document.onmousemove = function(e){
                        mouseX = e.pageX;
                        mouseY = e.pageY;
                    };
		}		
                
                //Functions that clear space of variables
                function clearCanvas(){
                    ctx.clearRect(0,0,920,600);
                }
                function clearVars(){
                    //Reset values of active variables
                    //i.e. clear board for new game
                    ctx.clearRect(250,0,640,510);
                    ctx.clearRect(7,347,210,120);
                    ctx.clearRect(7,67,210,150);
                    redChipCount = 21;
                        blueChipCount = 21;
                        playerTurn = true;
                        board = [["e","e","e","e","e","e","e"],     //0
                             ["e","e","e","e","e","e","e"],     //1
                             ["e","e","e","e","e","e","e"],     //2
                             ["e","e","e","e","e","e","e"],     //3
                             ["e","e","e","e","e","e","e"],     //4
                             ["e","e","e","e","e","e","e"]];
                         moveArchive = [];
                         gameMode = 0;
                         fontSize = 0;
                }
                
                //Functions associated with home screen
                function drawMenu(){
                    //Increase font size over time during initial load
                    if (fontSize < 100){
                        fontSize+= fontSpeed;
                        fontSpeed += 0.1;
                    }
                    //Use giant red chip as background
                    ctx.drawImage(redChip,-35,250,1000,1000);
                    ctx.fillStyle = "#2E64FE";
                    ctx.font = fontSize + "px helvetica";
                    ctx.textAlign = 'center';
                    //Text with rotating to spell out "Connect Four"
                    ctx.save();
                    ctx.translate(100,300);
                    ctx.rotate(-Math.PI/5);
                    ctx.fillText("C",20,70);
                    ctx.restore();
                    ctx.save();
                    ctx.translate(100,300);
                    ctx.rotate(-Math.PI/7);
                    ctx.fillText("o",89,56);
                    ctx.restore();
                    ctx.save();
                    ctx.translate(100,300);
                    ctx.rotate(-Math.PI/8);
                    ctx.fillText("n",150,46);
                    ctx.restore();
                    ctx.save();
                    ctx.translate(100,300);
                    ctx.rotate(-Math.PI/9);
                    ctx.fillText("n",210,36);
                    ctx.restore();
                    ctx.save();
                    ctx.translate(100,300);
                    ctx.rotate(-Math.PI/12);
                    ctx.fillText("e",270,17);
                    ctx.restore();
                    ctx.save();
                    ctx.translate(100,300);
                    ctx.rotate(-Math.PI/15);
                    ctx.fillText("c",330,6);
                    ctx.restore();
                    ctx.fillText("t",465,240);
                    
                    ctx.save();
                    ctx.translate(100,300);
                    ctx.rotate(Math.PI/15);
                    ctx.fillText("F",435,-145);
                    ctx.restore();
                    ctx.save();
                    ctx.translate(100,300);
                    ctx.rotate(Math.PI/12);
                    ctx.fillText("o",480,-168);
                    ctx.restore();
                    ctx.save();
                    ctx.translate(100,300);
                    ctx.rotate(Math.PI/10);
                    ctx.fillText("u",530,-192);
                    ctx.restore();
                    ctx.save();
                    ctx.translate(100,300);
                    ctx.rotate(Math.PI/8);
                    ctx.fillText("r",565,-230);
                    ctx.restore();
                    
                    if(fontSize> 98){
                        //Once initial load complete, put text stating coder and game modes
                        ctx.fillStyle = "#D7DF01";
                        ctx.font = "40px helvetica";
                        ctx.save();
                        ctx.translate(100,300);
                        ctx.rotate(-Math.PI/4);
                        ctx.fillText("By: Andrew",135,-160);
                        ctx.restore();
                        ctx.fillStyle = "#2E64FE";
                        ctx.font = "60px helvetica";
                        ctx.fillText("Vs. Player",465,400);
                        ctx.fillText("Vs. Computer", 455,500);
                        //Show flashing blue chip over which choice user is hovering over
                        menuArrow();
                    }
                   ctx.textAlign = 'left';     
                }
                function menuArrow(){
                    //Check to see which choice user is hovering over
                    //Place a flashing blue chip in the correspondign location
                    if (arrowDelay < 5){
                        if (mouseX > 335 && mouseX < 615 && mouseY > 370 && mouseY < 430){
                            ctx.drawImage(blueChip,620,360,50,50);
                        } else if (mouseX >285 && mouseX < 650 && mouseY > 470 && mouseY < 530){
                            ctx.drawImage(blueChip,660,455,50,50);
                        }
                    } else {
                        
                    }
                    //Counter and delay statement to show or not show blue chip
                    //Simulates flashing
                    arrowDelay+=0.5;
                    if (arrowDelay > 10){
                        arrowDelay = 0;
                    }
                }
                function gameModeSelect(){
                    //Selects the game mode
                    //When user clicks a game mode, load that specific game mode
                    if (mouseClicked){
                        if ((mouseX > 335 && mouseX < 615)&&(mouseY > 370 && mouseY < 430)){
                            gameMode = 1;
                        } else if (mouseX > 285 && mouseX < 650 && mouseY > 470 && mouseY <530){
                            gameMode = 2;
                        }
                        mouseClicked =false;
                    }
                }
                
                //Main game functions
                function pvpGame(){
                    //If the animation for falling piece isn't happening
                    if (!placingPiece){
                        //Run function to locate the coordinate which user wants to place piece
                    placePiece();
                    if (placingPiece){
                        //If the user chose to place a piece, change turn to the opposite player
                        if (playerTurn){
                            playerTurn = false;
                        } else {
                            playerTurn = true;
                        }
                    }
                    //Draw the board and all played chips
                    drawBoard();
                    //Actively update arrow showing which column is being used
                    hoverColumnArrow();
                    mouseClicked = false;
                    } else {
                        //Animate falling piece
                        fallingPiece();
                    }
                    //Update chip counters on left side
                    chipsRemaining(redChipCount,blueChipCount);
                    //Update flashing rectangles to signal who's turn it is
                    playerTurnImage();
                    //Check to see if anyone won
                    checkWin();
                    
                    
                }
                function pvaGame(){
                    //If its the human players turn
                    if (playerTurn){
                        //When the animation is not playing
                        if (!placingPiece){
                            //Fetch coordinates on where user wants piece placed
                        placePiece();
                        //Update the board with placed chips
                        drawBoard();
                        //Update arrow position over which column mouse is over
                        hoverColumnArrow();
                        mouseClicked = false;
                        } else {
                            //Animate falling chip
                            fallingCompPiece();
                            if (dropHeight === 0){
                                //Set turn to AI
                                playerTurn = false;
                            }
                        }
                    } else {
                        if (!placingPiece){
                            //If it's the AI's turn
                            //Run AI generation of placement
                            placeCompPiece();
                            drawBoard();
                        } else {
                            //Animate falling piece
                            fallingCompPiece();
                            if (dropHeight === 0){
                                //Set to players turn
                                playerTurn = true;
                            }
                        }
                    }
                    chipsRemaining(redChipCount,blueChipCount);
                    playerTurnImage();
                    checkWin();
                }
                
                //In game related functions
		function drawBoard(){
                    //Clear canvas
                    ctx.clearRect(250,0,640,510);
                    ctx.clearRect(7,347,210,120);
                    ctx.clearRect(7,67,210,150);
                    //Draw board
                    ctx.drawImage(boardImage,250,27);
                    //Draw placed chips
                    for (i = 0; i < 7; i++){
                        for (y = 0; y < 6; y++){
                            if (board[y][i] === "e"){
                            } else if (board[y][i] === "b"){
                                ctx.drawImage(blueChip,265+(i*90),33+(y*80),70,70);
                            } else if (board[y][i] === "r"){
                                ctx.drawImage(redChip,265+(i*90),33+(y*80),70,70);
                            }
                        }
                    }
		}
                function chipsRemaining(red,blue){
                    //Display number of red chips remaining
                    ctx.strokeStyle = "#DF0101";
                    ctx.font = "20px helvetica";
                    ctx.strokeText("Red Chips Remaining", 10, 47);
                    var yLimit = (red-red%7)/7 + 1;
                    var iLimit;
                    //Determine how many rows and columns of chips to show
                    for(y = 0; y < yLimit; y++){
                        if (y+1 === yLimit){
                            iLimit = red%7;
                        } else {
                            iLimit = 7;
                        }
                        for (i = 0; i < iLimit; i ++){
                            ctx.fillStyle = "#DF0101";
                            ctx.beginPath();
                            ctx.arc(20+(i*30),80+(y*40),13,0,Math.PI*2);
                            ctx.fill();
                    }
                    }
                    //Display the number of blue chips remaining
                    ctx.strokeStyle = "#0080FF";
                    ctx.font = "20px helvetica";
                    ctx.strokeText("Blue Chips Remaining", 10, 298);
                    yLimit = (blue-blue%7)/7 + 1;
                    //Determine how rows and columns of chips to show
                    for(y = 0; y < yLimit; y++){
                        if (y+1 === yLimit){
                            iLimit = blue%7;
                        } else {
                            iLimit = 7;
                        }
                        for (i = 0; i < iLimit; i ++){
                            //ctx.drawImage(blueChip,10+(i*30),360+(y*40),26,26);
                            ctx.fillStyle = "#0080FF";
                            ctx.beginPath();
                            ctx.arc(20+(i*30),360+(y*40),13,0,Math.PI*2);
                            ctx.fill();
                    }
                    }
		}
		function playerTurnImage(){
                    //Clear canvas where rectangles are placed
                    ctx.clearRect(12,475,200,50);
                    ctx.clearRect(12,215,200,50);
                    //If its red's turn
			if (playerTurn){
                            //Display prompt rectangle
                            //Flash colours based on counter value
                            if (turnDelay < 5){
                            ctx.fillStyle = "#DF0101";
                            } else {
                            ctx.fillStyle = "#F6CECE";
                            }
                            turnDelay ++;
                            if (turnDelay > 10){
                            turnDelay = 0;
                            }
                            ctx.fillRect(12,215,200,50);
                            ctx.fillStyle = "#FAFAFA";
                            ctx.font = "20px helvetica";
                            ctx.fillText("Red Turn", 67,250);
                            //If its blue's turn
                        } else {
                            //Display prompt rectangle
                            //Flash colours based on counter value
                            if (turnDelay < 5){
                            ctx.fillStyle = "#0080FF";
                            } else {
                            ctx.fillStyle = "#08088A";
                            }   
                            turnDelay ++;
                            if (turnDelay > 10){
                            turnDelay = 0;
                            }
                            
                            ctx.fillRect(12,475,200,50);
                            ctx.fillStyle = "#FAFAFA";
                            ctx.font = "20px helvetica";
                            ctx.fillText("Blue Turn", 67,510);
                        }
		}
		function hoverColumnArrow(){
                    //Set arrow colour to a certain shade based on counter value
                    if (arrowDelay < 5){
                        ctx.fillStyle = "#F7FE2E";
                    } else {
                        ctx.fillStyle = "#F2F5A9";
                    }    
                    //Increase counter value to continue loop
                    arrowDelay++;
                    if (arrowDelay > 10){
                        arrowDelay = 0;
                    }
                    arrowMultiplier = 7;
                    //Detect which column mouse is currently over
                    if (mouseX > 265 && mouseX < 355){
                        arrowMultiplier = 0;
                    } else if (mouseX > 355 && mouseX < 445){
                        arrowMultiplier = 1;
                    } else if (mouseX > 445 && mouseX < 535){
                        arrowMultiplier = 2;
                    } else if (mouseX > 535 && mouseX < 625){
                        arrowMultiplier = 3;
                    } else if (mouseX > 625 && mouseX < 715){
                        arrowMultiplier = 4;
                    } else if (mouseX > 715 && mouseX < 805){
                        arrowMultiplier = 5;
                    } else if (mouseX > 805 && mouseX < 890){
                        arrowMultiplier = 6;
                    }
                    //If mouse is over no column, do not display triangle
                    if (arrowMultiplier > 6){
                        
                    } else {
                        //Display yellow triangle over corresponding column
                        ctx.beginPath();
                        ctx.moveTo(302+(arrowMultiplier*90),30);
                        ctx.lineTo(282+(arrowMultiplier*90),15);
                        ctx.lineTo(322+(arrowMultiplier*90),15);
                        ctx.fill();
                    }
                
            }
                function placeCompPiece(){
                    //AI for pva game
                    //Generate random column to place chip
                        yBound = Math.floor(Math.random() * (7));
                        arrowMultiplier = yBound;
                        //Check to see which row in that column is empty
                        //Set the animation distance and location to corresponding values
                        if (board[5][yBound] === "e"){
                            dropHeight = 433;
                            pieceLocation = 5;
                        } else if (board[4][yBound] === "e"){
                            dropHeight = 353;
                            pieceLocation = 4;
                        } else if (board[3][yBound] === "e"){
                            dropHeight = 273;
                            pieceLocation = 3;
                        } else if (board[2][yBound] === "e"){
                            dropHeight = 193;
                            pieceLocation = 2;
                        } else if (board[1][yBound] === "e"){
                            dropHeight = 113;
                            pieceLocation = 1;
                        } else if (board[0][yBound] === "e"){
                            dropHeight = 33;
                            pieceLocation = 0;
                        }
                        //Store the move in the move archive
                        if (dropHeight !== 0){
                                moveArchive.push([pieceLocation,yBound]);
                                //Decrease chip count
                                blueChipCount --;
                                //Set last player to play piece to AI
                                lastPlayer = "b";
                                moveCounter++;
                                //Initiate animation
                                placingPiece = true;
                        }
                }
                function placePiece(){
                    //If the user clicked a column to place cihp
                    if (mouseClicked){
                        yBound = arrowMultiplier;
                        //check to see which row in that column is free
                        //Set location and distance for animation accordingly
                        if (board[5][yBound] === "e"){
                            dropHeight = 433;
                            pieceLocation = 5;
                        } else if (board[4][yBound] === "e"){
                            dropHeight = 353;
                            pieceLocation = 4;
                        } else if (board[3][yBound] === "e"){
                            dropHeight = 273;
                            pieceLocation = 3;
                        } else if (board[2][yBound] === "e"){
                            dropHeight = 193;
                            pieceLocation = 2;
                        } else if (board[1][yBound] === "e"){
                            dropHeight = 113;
                            pieceLocation = 1;
                        } else if (board[0][yBound] === "e"){
                            dropHeight = 33;
                            pieceLocation = 0;
                        }
                        //If selection is valid
                        if (dropHeight !== 0){
                            //If its red's turn
                            if (playerTurn){
                                //Store move
                                moveArchive.push([pieceLocation,yBound]);
                                //Decrease chip count
                                redChipCount --;
                                //Last player to move is red
                                lastPlayer = "r";
                                moveCounter++;
                                //Initiate animation
                                placingPiece = true;
                                //If its blue's turn
                            } else {
                                //Store move location
                                moveArchive.push([pieceLocation,yBound]);
                                //Decrease chip count
                                blueChipCount --;
                                //Last player to move is blue
                                lastPlayer = "b";
                                moveCounter++;
                                //Begin animation
                                placingPiece = true;
                            }
                            
                        }
                        
                    }
                    
                }
                function mouseClick(){
                    //Variable to hold if mouse has been clicked
                    mouseClicked = true;
                }
                
                //Irrelevant function for outdated button
                //I did not wish to remove in case it becamse useful or was needed
                function undoMove(){
                    if (mouseClicked){
                        if ((mouseX > 12 && mouseX < 209)&&(mouseY > 533 && mouseY < 583)){
                            if (moveCounter > 0){
                            moveCounter--;
                            var row = moveArchive[moveCounter][0];
                            var col = moveArchive[moveCounter][1];
                            board[row][col] = "e";
                            drawBoard();
                            if (moveCounter === 0){
                                moveArchive = [];
                            }
                            
                            if (playerTurn){
                                blueChipCount ++;
                                playerTurn = false;
                            } else {
                                redChipCount ++;
                                playerTurn = true;
                            }
                        }
                        }
                    }
                }
                
                //Animation related functions
                //Function for AI portion
                function fallingCompPiece(){
                    //If the animation is still active
                    if (counter < dropHeight){
                        //Clear canvas
                        ctx.clearRect(250,0,640,510);
                        //Display the location of the animating chip first
                        if (playerTurn){
                        ctx.drawImage(redChip,265+(arrowMultiplier*90),counter,70,70);
                        } else {
                        ctx.drawImage(blueChip,265+(arrowMultiplier*90),counter,70,70);
                        }
                        //Display board over it as to simulate piece placement
                        ctx.drawImage(boardImage,250,27);
                        //Display already placed pieces
                        for (i = 0; i < 7; i++){
                        for (y = 0; y < 6; y++){
                            if (board[y][i] === "e"){
                            } else if (board[y][i] === "b"){
                                ctx.drawImage(blueChip,265+(i*90),33+(y*80),70,70);
                            } else if (board[y][i] === "r"){
                                ctx.drawImage(redChip,265+(i*90),33+(y*80),70,70);
                            }
                            
                            
                        }
                    }
                    //Increase drop speed as to simulate gravity
                        counter+=velocity;
                        velocity ++;
                        //If animation is complete
                    } else {
                        //Signal rest of program
                        placingPiece = false;
                        //Reset all values related to animation
                        counter = 0;
                        velocity = 0;
                        dropHeight = 0;
                        //Permanently store location of previously placed piece
                        //The piece that was just animated
                        if (playerTurn){
                            board[pieceLocation][yBound] = "r";
                        } else{
                            board[pieceLocation][yBound] = "b";
                        }
                    }
                }
                //Function for PvP portion
                function fallingPiece(){
                    //If animation is still active
                    if (counter < dropHeight){
                        //Clear board area
                        ctx.clearRect(250,0,640,510);
                        //Display moving chip first
                        if (!playerTurn){
                        ctx.drawImage(redChip,265+(arrowMultiplier*90),counter,70,70);
                        } else {
                        ctx.drawImage(blueChip,265+(arrowMultiplier*90),counter,70,70);
                        }
                        //Draw board and chips over animated chip
                        ctx.drawImage(boardImage,250,27);
                        //Display the already placed chips
                        for (i = 0; i < 7; i++){
                        for (y = 0; y < 6; y++){
                            if (board[y][i] === "e"){
                            } else if (board[y][i] === "b"){
                                ctx.drawImage(blueChip,265+(i*90),33+(y*80),70,70);
                            } else if (board[y][i] === "r"){
                                ctx.drawImage(redChip,265+(i*90),33+(y*80),70,70);
                            }
                            
                            
                        }
                    }
                    //Increase velocity as to simulate gravity
                        counter+=velocity;
                        velocity ++;
                        //If animation is finished
                    } else {
                        //Signal rest of program
                        placingPiece = false;
                        //Reset values related to animation
                        counter = 0;
                        velocity = 0;
                        dropHeight = 0;
                        //Store in array the location of the previously placed piece
                        if (!playerTurn){
                            board[pieceLocation][yBound] = "r";
                        } else{
                            board[pieceLocation][yBound] = "b";
                        }
                    }
                }
                
                
                //WINNING FUNCTION
                function checkWin(){
                    var player = "";
                    var win  = false;
                    
                    if(lastPlayer === "b"){
                        //Check for blue player
                        player = "b";
                    } else {
                        //Check for red player
                        player = "r";
                    }
                    //Did the player win horizontally?
                    win = checkHorizontal(player);
                    //Did the player win vertically?
                    if(!win) {
                        win = checkVertical(player);
                    }
                    //Did the player win diagonally? (right and down)
                    if(!win){
                        win = checkDiagonalUp(player);
                    }
                    //Did the player win diagonally? (right and up)
                    if (!win){
                        win = checkDiagonalDown(player);
                    }
                    //If the player did win
                    //Display message and reset game
                    //Bring player back to home menu
                    if (win){
                    switch (player){
                        case "r":
                            alert("RED WINS");
                            clearVars();
                            break;
                        case "b":
                            alert("BLUE WINS");
                            clearVars();
                            break;
                    }
                    
                    }
                    win = false;
                    player = "";
                }
                function checkHorizontal(x){
                    var win = false;
                    var row, col;
                    //Loop through all possibilities of horizontal wins
                    for (row = 0; row < 6; row++){
                        for(col = 0; col <4;col++){
                            if (board[row][col] === x &&
                                board[row][col + 1] === x &&
                                board[row][col + 2] === x &&
                                board[row][col + 3] === x){
                            win = true;
                            return win;
                            }
                        }
                    }
                    return win;
                }
                function checkVertical(x){
                    var win = false;
                    var row, col;
                    //loop through all possibilities of vertical wins
                    for (row = 0; row < 3; row++){
                        for (col = 0; col < 7; col++){
                            if (board[row][col] === x &&
                                board[row+1][col] === x &&
                                board[row+2][col] === x &&
                                board[row+3][col] === x){
                            win = true;
                            return win;
                            }
                        }
                    }
                    return win;
                }
                function checkDiagonalDown(x){
                    var win = false;
                    var row, col;
                    //loop through all possibilities of diagonal wins (right and up)
                    for (row = 5; row > 2; row--){
                        for (col = 0; col < 4; col++){
                            if (board[row][col] === x &&
                                board[row-1][col+1] === x &&
                                board[row-2][col+2] === x &&
                                board[row-3][col+3] === x){
                            win = true;
                            return win;
                            }
                        }
                    }
                    return win;
                }
                function checkDiagonalUp(x){
                    var win = false;
                    var row, col;
                    //Loop through all possibilities of diagonally winning (right and down)
                    for (row = 0; row < 3; row++){
                        for (col = 0; col < 4; col++){
                            if (board[row][col] === x &&
                                board[row+1][col+1] === x &&
                                board[row+2][col+2] === x &&
                                board[row+3][col+3] === x){
                            win = true;
                            return win;
                            }
                        }
                    }
                    return win;
                }
                
                