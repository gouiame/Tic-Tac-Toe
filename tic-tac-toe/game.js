    const cells = document.querySelectorAll('.cell');

    const resetButton = document.querySelector('.reset');

    const currentTurn = document.querySelector('.current-turn');

    const player1score = document.querySelector('.score1');
    const player2score = document.querySelector('.score2');

    const draw = document.querySelector('.draw');

    const msgContent = document.querySelector('.content');

    const overlay = document.getElementById('overlay');

    const closBtn = document.getElementById('close');

    const winCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]


    let turn = true;

    let usedCells = [];

    let winner= false;

    let ties = 0;

    let player1 = {
        symbol : '<i class="fa fa-close"></i>',
        played: [],
        score: 0
    }

    let player2 = {
        symbol : '<i class="fa fa-circle-o"></i>',
        played: [],
        score: 0
    }

    checkTurn();

    for(let i = 0; i < 9; i++){
        cells[i].addEventListener('click', () => {
            if(isEmpty(i)){
            if(turn == true){
                addSymbol(player1,i);
                turn = false;
                checkWinner(player1);
                checkTurn();
            }
            else{
                addSymbol(player2,i);
                turn = true;
                checkWinner(player2);
                checkTurn();
            }
        }
        else{
            alert('this cell is already used');
        }
            })
        
        }


        function addSymbol(player, i){
            cells[i].innerHTML = player.symbol;
            player.played.push(i);
            usedCells.push(i);
        }


        function checkWinner(player){
            if(!winner){
                winCombos.some(combo => {
                    if(combo.every(index => player.played.includes(index))){
                        winner = true;
                        player.score++;
                        showScore();
                        setTimeout(showMsg, 500, player, winner);
                        reset();
                    }
                })
            }

            if(!winner && usedCells.length == 9){
                ties++;
                showScore();
                setTimeout(showMsg, 500);
            }

        }

        function isEmpty(i){
            if(usedCells.includes(i)){
                return false;
            }
            else{
                return true;
            }
        }

        function reset()
        {
            cells.forEach(cell => {
                cell.innerHTML = '';
            })
            winner = false;
            usedCells = [];
            player1.played = [];
            player2.played = [];
            turn = true;
            checkTurn();
        }

        resetButton.addEventListener('click', reset);

        function checkTurn(){
            if(turn == true){
                currentTurn.innerHTML = player1.symbol;
            }
            else{
                currentTurn.innerHTML = player2.symbol;
            }
        }

        function showScore()
        {
            player1score.innerHTML = player1.score;
            player2score.innerHTML = player2.score;
            draw.innerHTML = ties;
        }

        closBtn.addEventListener('click', () => {
            overlay.style.display = 'none';
            // reset();
        })

        function showMsg(player, winner){
            overlay.style.display = 'flex';
            if(winner)
            {
                msgContent.innerHTML = player.symbol + ' is the <h2>Winner</h2>'
            }
            else
            {
                msgContent.innerHTML = 'It is a <h2>Draw</h2>'
            }
            reset();
        }