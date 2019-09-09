//**************************** */ Pieces/Images ********************************

let warrior = './PNG/Warrior.png';
let soldier = './PNG/Soldier.png'
let grass = './PNG/grass-png-cartoon.png';
let fire = './PNG/fire.png';
// let fighter = new Character(75, 75, 9, 2);



//************************************* board logic ***********************************/

function createBoard() {
    let board = document.getElementById('gameboard');

    for (let r = 0; r < 5; r++) {
        let row = document.createElement('div');
        row.setAttribute('class', 'row');

        for (let c = 0; c < 5; c++) {
            let cell = document.createElement('div');
            let theImage = document.createElement('img')
            cell.setAttribute('class', 'cell');
            cell.appendChild(theImage)


            row.appendChild(cell);
            if (r === 0) {
                // cell.innerHTML = warrior.pieceCode; //just to lable each cell. later this becomes the game pieces
                // cell.appendChild(theImage)
                theImage.setAttribute('class', 'battleImage')
                theImage.setAttribute('alt', 'player2')
                theImage.src = warrior;
                theImage.width = "80";
                theImage.onclick = movePlayer

                //cell.innerHTML += '<span class="strength">5<span>  | <span class="health">50<span>'

            }
            if (r === 4) {
                // cell.innerHTML = soldier.pieceCode; //just to lable each cell. later this becomes the game pieces
                // cell.appendChild(theImage)
                theImage.setAttribute('class', 'battleImage')
                theImage.setAttribute('alt', 'player1')
                theImage.src = soldier;
                theImage.width = "80";
                theImage.onclick = movePlayer
            }
            if (r > 0 && r < 4) {
                theImage.setAttribute('class', 'moveTile')
                theImage.setAttribute('alt', '')
                theImage.src = grass;
                theImage.width = "80";
                theImage.onclick = movePlayer
            }

        }
        board.appendChild(row);
    }
}

createBoard()



// let board = document.getElementsByClassName('gameboard')[0];
let cells = document.querySelectorAll('img')



let clickedPiece = null;
let turn = 0
$("#turn").html(turn)
let neighbors = []
let fighter;
let altAttribute;
let playersTurn = 'player1'

function movePlayer(elem) {
    if (turn % 2 === 0) {
        playersTurn = 'player1'
    } else {
        playersTurn = 'player2'
    }



    if (elem.target.className === 'battleImage' && clickedPiece == null && elem.target.alt == playersTurn) {


        clickedPiece = elem.target.src
        //console.log(fighter)
        // //console.log(fighter)
        fighter = `<img class="battleImage" alt="${elem.target.alt}" src="${elem.target.src}" width="100"></img>`

        elem.target.src = fire;
        elem.target.setAttribute('id', 'moving');
        elem.target.setAttribute('class', 'moveTile');
        $('.battleImage').removeAttr('id')

        neighbors = findNeighbors('before') //weird one
        neighborOptions(neighbors, elem.target, elem.target, false)
        elem.target.setAttribute('id', '');
        $('.moveTile').removeAttr('alt');
        $('.moveTile').removeAttr('id');

    } else if (
        elem.target.className !== 'battleImage' //You clicked grass
        &&
        clickedPiece != null //And click peice is not empty
        &&
        elem.target.className == 'moveTile' //You clicked grass
        &&
        elem.target.getAttribute('name') == 'legal') { //And the move is a blue square 

        $('img').removeAttr('name')
        elem.target.src = clickedPiece;
        altAttribute = turn % 2 == 0 ? "player1" : "player2";
        elem.target.setAttribute('id', 'moving');
        elem.target.setAttribute('class', 'battleImage');
        elem.target.setAttribute('alt', altAttribute);

        $('.battleImage').removeAttr('data')

        clickedPiece = null;

        turn++
        $("#turn").html(turn)



    } else if (elem.target.getAttribute('data') == 'war') //  We clicked on a red 
    {


        let random = Math.floor(Math.random() * 2);
        let winner = random == 0 ? elem.target : fighter;
        console.log('winner: ', winner)
        console.log('fighter: ', fighter)
        turn++
        $("#turn").html(turn)
        clickedPiece = null
        $('.battleImage').removeAttr('data')
        $('.moveTile').removeAttr('name')


        if (winner === fighter) { //attack and won
            elem.target.setAttribute('src', $(winner)[0].getAttribute('src'))
            elem.target.setAttribute('alt', $(winner)[0].getAttribute('alt'))
            document.getElementById('log').innerHTML = `Niice, ${$(winner)[0].alt}. Ya got one!!`;

        } else { //attacked and lost
            document.getElementById('log').innerHTML = `Yikes. ${$(elem.target)[0].alt} wrecked you!!`;
            return
        }
        // isGameOver();
        // document.getElementById('log').innerHTML = "Not your turn or illegal move!";
    } else {
        console.log("Not your turn or illegal move")
    }


}

function neighborOptions(neighbors, fighter, target, attacking) {
    $('.battleImage').removeAttr('data')
    neighbors.forEach(neighbor => {
        if (neighbor.className == 'battleImage' && neighbor.alt !== fighter.alt) {
            neighbor.setAttribute('data', 'war')
            // if (attacking) {
            //     battle(neighbor, fighter, target);
            // }

        } else if (neighbor.className == 'moveTile') {
            neighbor.setAttribute('name', 'legal')
        }
    })
}





function findNeighbors(when) {
    let columns = cells;
    let activeColumn;
    columns.forEach((col, i) => {
        ////console.log(col.className, col.id, col.innerHTML)
        if (col.id == "moving") {
            activeColumn = i;
        }
    })
    ////console.log('active column', activeColumn)

    let actives = []
    if ((activeColumn + 1) % 5 !== 0) {
        actives.push(columns[activeColumn + 1])
    }

    if (activeColumn % 5 !== 0) {
        actives.push(columns[activeColumn - 1])
    }

    if (activeColumn < 20) {
        actives.push(columns[activeColumn + 5])
    }

    if (activeColumn > 6) {
        actives.push(columns[activeColumn - 5])
    }
    //console.log(when, 'neighbors are ', actives)
    return actives
}



// ******************************** Game over function ********************************

// loop through each image tag and check if all player1 or player2 alt attributes are gone
// what if i loop through all cells and push every cell with a player1 or player2 into an empty Array. then check if array is empty. if it is, game over.
// if not,then empty array.

// function isGameOver() {
//     // console.log('helloooo');
//     let board = cells;
//     board.forEach(el => {
//         if (el.alt != 'player1' || el.alt != 'player2') {
//             // its looking for any tile that doesnt have either a p1 or p2 which is all of them... 
//             // document.location.href = '';
//             console.log('hiii')
//         }
//     })
// }

// let p1Arr = [];
// let p2Arr = [];
// function isPlayer() {
//     // loops through cells and filters put all images with a filled alt tag... should only be battle images
//     let battle = Array.from(cells).filter(i => i.alt);
//     // gets all the player2 tags
//     battle.forEach(function (elem) {
//         if (elem.alt === 'player1') {
//             p1Arr.push(elem);   
//         } else if (elem.alt === 'player2'){
//             p2Arr.push(elem); 
//         }
//         return
//     })
// }
// isPlayer();
// console.log(p1Arr)
// console.log(p2Arr)

//************************************* Ideas for Scalability ***********************************/

// add classes
// add more dynamic or interactive battles

// class Character {
//     constructor(health, hit, strength, armor, pieceCode) {
//         // this.name = name;
//         this.health = health; //life
//         this.hit = hit; //determines chance that attack will land
//         this.strength = strength; //determines how many dice will be rolled for damage calculations
//         this.armor = armor; //gets subtracted from damage to decrease damage done to health
//         // this.image.src = image;
//         this.pieceCode = pieceCode
//     }
// }

// let p2 = new Character(100, 100, 9, 2, './PNG/Warrior.png'); //player 2 for now
// let p1 = new Character(150, 100, 3, 7, './PNG/Soldier.png'); // player 1 for now


// function printToScreen() {
//     document.getElementById('warrior').innerText = p2.health;
//     document.getElementById('soldier').innerText = p1.health;
// }

// function randomFight() {
//     // let restartButton = document.getElementById('restart-button');
//     p1Attack()
//     p2Attack()
//     printToScreen();



//     // gameMessage.innerText = 'Soldier will attack now'
//     // setTimeout(() => {
//     //     p2Attack();
//     //     printToScreen();
//     //     gameMessage.innerText = 'Player 2 will attack now'
//     // }, 750)
// }

// function p2Attack() {
//     logMessage = document.getElementById('log')

//     let hitPerc = p2.hit / 100;
//     // if loop for calculating damage done and health after attack
//     if (Math.random() < hitPerc) {
//         let p2Damage = (Math.floor(Math.random() * 6 + 1)) * p2.strength;
//         p2Damage -= p1.armor;
//         p1.health -= p2Damage;
//         logMessage.innerText = `Player 2 did ${p2Damage} damage to Player 1. Only ${p1.health} health left!`
//         // ////console.log(`Player 2 did ${p2Damage} damage to soldier. ${soldier.health} health left!`);
//     } else {
//         logMessage.innerText = 'Player 2 missed'
//         // ////console.log('Player 2 missed')
//     }
//     printToScreen();
// }

// function p1Attack() {
//     logMessage = document.getElementById('log')

//     let hitPerc = p1.hit / 100;
//     // if loop for calculating damage done and health after attack
//     if (Math.random() < hitPerc) {
//         let p1Damage = (Math.floor(Math.random() * 6 + 1)) * p1.strength;
//         p1Damage -= p2.armor;
//         p2.health -= p1Damage;
//         logMessage.innerText = `Player 1 did ${p1Damage} damage to Player 2. ${p2.health} health left!`

//         // ////console.log(`Player 1 did ${p1Damage} damage to p2. ${p2.health} health left!`);
//     } else {
//         logMessage.innerText = 'Player 1 missed';
//         // ////console.log('Player 1 missed')
//     }
//     printToScreen();
// }

// // returns a boolean: true is health reaches zero or less
// function isDead(health) {
//     return health <= 0;
// };

// function restart() {
//     document.location.href = '';
// }

// // need to call print to screen here to display inital health and emojis
// printToScreen();