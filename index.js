class Character {
    constructor(health, hit, strength, armor, pieceCode) {
        // this.name = name;
        this.health = health; //life
        this.hit = hit; //determines chance that attack will land
        this.strength = strength; //determines how many dice will be rolled for damage calculations
        this.armor = armor; //gets subtracted from damage to decrease damage done to health
        // this.image.src = image;
        this.pieceCode = pieceCode
    }
    // attack(enemy) {
    //     // if you want to implement dexterity you do it here with *** let hitPerc = (this.hit - enemy.dex) / 100;
    //     let hitPerc = this.hit / 100;
    //     // if loop for calculating damage done and health after attack
    //     if (Math.random() < hitPerc) {
    //         damage = 0;
    //         damage += (Math.floor(Math.random() * 6 + 1)) * this.strength;
    //         damage -= enemy.armor;
    //         enemy.health -= damage;
    //         if (enemy.hp <= 0) {
    //             alert(`You defeated the opposing ${enemy.name}!!!`);
    //             // **** remove enemy sprite from game screen
    //         } //ends enemy dead check
    //     } //ends hit check
    // } //ends attack
    // move() {

    // }
}


// Pieces/Images
let p2 = new Character(100, 100, 9, 2, './PNG/Warrior.png'); //player 2 for now
let p1 = new Character(150, 100, 3, 7, './PNG/Soldier.png'); // player 1 for now
let grass = './PNG/grass-png-cartoon.png'
// let fighter = new Character(75, 75, 9, 2);


function printToScreen() {
    document.getElementById('warrior-health').innerText = p2.health;
    document.getElementById('soldier-health').innerText = p1.health;
}

function randomFight(elem) {
    // let restartButton = document.getElementById('restart-button');
    p1Attack()
    p2Attack()
    if (isDead()) {

    }

    // gameMessage.innerText = 'Soldier will attack now'
    // setTimeout(() => {
    //     p2Attack();
    //     printToScreen();
    //     gameMessage.innerText = 'Player 2 will attack now'
    // }, 750)
}

function p2Attack() {
    logMessage = document.getElementById('log')

    let hitPerc = p2.hit / 100;
    // if loop for calculating damage done and health after attack
    if (Math.random() < hitPerc) {
        let p2Damage = (Math.floor(Math.random() * 6 + 1)) * p2.strength;
        p2Damage -= p1.armor;
        p1.health -= p2Damage;
        logMessage.innerText = `Player 2 did ${p2Damage} damage to Player 1. Only ${p1.health} health left!`
        // //console.log(`Player 2 did ${p2Damage} damage to soldier. ${soldier.health} health left!`);
    } else {
        logMessage.innerText = 'Player 2 missed'
        // //console.log('Player 2 missed')
    }
    printToScreen();
}

function p1Attack() {
    logMessage = document.getElementById('log')

    let hitPerc = p1.hit / 100;
    // if loop for calculating damage done and health after attack
    if (Math.random() < hitPerc) {
        let p1Damage = (Math.floor(Math.random() * 6 + 1)) * p1.strength;
        p1Damage -= p2.armor;
        p2.health -= p1Damage;
        logMessage.innerText = `Player 1 did ${p1Damage} damage to Player 2. ${p2.health} health left!`

        // //console.log(`Player 1 did ${p1Damage} damage to p2. ${p2.health} health left!`);
    } else {
        logMessage.innerText = 'Player 1 missed';
        // //console.log('Player 1 missed')
    }
    printToScreen();
}

// returns a boolean: true is health reaches zero or less
function isDead(health) {
    return health <= 0;
};

function restart() {
    document.location.href = '';
}

// need to call print to screen here to display inital health and emojis
printToScreen();




//************************************* board logic ***********************************/





let id = 0

function createBoard() {
    let board = document.getElementById('gameboard');

    for (let r = 0; r < 5; r++) {
        let row = document.createElement('div');
        row.setAttribute('class', 'row');

        for (let c = 0; c < 5; c++) {
            let cell = document.createElement('div');
            let theImage = document.createElement('img')
            // theImage.setAttribute('src', ' ')
            cell.setAttribute('class', 'cell');
            cell.appendChild(theImage)


            // cell.id = id;
            row.appendChild(cell);
            if (r === 0) {
                // cell.innerHTML = warrior.pieceCode; //just to lable each cell. later this becomes the game pieces
                // cell.appendChild(theImage)
                theImage.setAttribute('class', 'battleImage')
                theImage.setAttribute('alt', 'player2')
                theImage.src = p2.pieceCode;
                theImage.width = "100";
                //cell.innerHTML += '<span class="strength">5<span>  | <span class="health">50<span>'

            }
            if (r === 2) {
                // cell.innerHTML = soldier.pieceCode; //just to lable each cell. later this becomes the game pieces
                // cell.appendChild(theImage)
                theImage.setAttribute('class', 'battleImage')
                theImage.setAttribute('alt', 'player1')
                theImage.src = p1.pieceCode;
                theImage.width = "100";

            }
            if (r === 1 || r > 2) {
                theImage.setAttribute('class', 'grassImage')
                theImage.setAttribute('alt', '')
                theImage.src = grass;
                theImage.width = "100";

            }

        }
        board.appendChild(row);
    }
}

createBoard()



let board = document.getElementsByClassName('gameboard')[0];
let cells = document.querySelectorAll('img')




cells.forEach(function (element) {
    element.addEventListener('click', function (elem) {
        player1Turn(elem);
        player2Turn(elem);
        //movePlayer(elem);
    })
});

function player1Turn(elem) {
    if (elem.target.alt === 'player1' && turn % 2 !== 0) {
        movePlayer(elem);
    } else if (clickedPiece !== null && turn % 2 !== 0) {
        movePlayer(elem);
    }
}

function player2Turn(elem) {
    if (elem.target.alt === 'player2' && turn % 2 === 0) {
        movePlayer(elem);
    } else if (clickedPiece !== null && turn % 2 === 0) {
        movePlayer(elem);
    }
}

let clickedPiece = null;
let turn = 1
let neighbors = []
let fighter;
let altAttribute;


function movePlayer(elem) {

    if (elem.target.className === 'battleImage' && clickedPiece == null) { //and does not equal any other pieces &&& this is one of my neighbots
        clickedPiece = elem.target

                    
        // console.log(fighter)
        // fighter = `<img class="battleImage" alt="${elem.target.alt}" src="${elem.target.src}" width="100"></img>`

        elem.target.src = grass;
        elem.target.setAttribute('id', 'moving');
        elem.target.setAttribute('class', 'grassImage');
        $('.battleImage').removeAttr('id')
        // $('img').removeAttr('name data')

        neighbors = findNeighbors('before') //weird one
        neighborOptions(neighbors, elem.target, elem.target, false)
        elem.target.setAttribute('id', '');
        $('.grassImage').removeAttr('alt');

    } else if (elem.target.className !== 'battleImage' && clickedPiece != null && elem.target.className == 'grassImage' && elem.target.getAttribute('name') == 'legal') {

        $('img').removeAttr('name')
        elem.target.src = clickedPiece;
        altAttribute = turn % 2 == 0 ? "player2" : "player1";
        elem.target.setAttribute('id', 'moving');
        elem.target.setAttribute('class', 'battleImage');
        elem.target.setAttribute('alt', altAttribute);

        //console.log(fighter, elem.target)
        //elem.target.outerHTML = fighter
        $('.battleImage').removeAttr('data')

        //neighbors = findNeighbors('after')
        // fightNeighbor(neighbors, elem.target)
        clickedPiece = null;

        turn++
        console.log(altAttribute)
        $("#turn").html(turn)
        // middleOfTurn = false;
        //console.log(turn)
        //console.log("Enemy");

    } else {
        // console.log(elem.target.data)
        let random = Math.floor(Math.random() * 2);
        let winner = random == 0 ? elem.target : fighter;
        // console.log(elem.target)
        // console.log(winner);
        if (winner === fighter) {
            $(elem.target).replaceWith(fighter);
        } else {
            return
        }
        turn++
        // console.log(neighbors)


        // // elem.target.parentNode.innerHTML = "";
        // elem.target.parentNode.innerHTML = winner;
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

        } else if (neighbor.className == 'grassImage') {
            neighbor.setAttribute('name', 'legal')
        }
    })
}


function battle(neighbor, fighter, target) {
    // // console.log(neighbor, fighter, target)
    // let winner = [neighbor, fighter][Math.round(Math.random())]
    // // console.log('winner is ', winner)
    // target.outerHTML = winner.outerHTML;
    // winner = '';
    // console.log(winner)
}


function findNeighbors(when) {
    let columns = cells;
    let activeColumn;
    columns.forEach((col, i) => {
        //console.log(col.className, col.id, col.innerHTML)
        if (col.id == "moving") {
            activeColumn = i;
        }
    })
    //console.log('active column', activeColumn)

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
    console.log(when, 'neighbors are ', actives)
    return actives
}


// if (elem.target.className === 'battleImage' && clickedPiece == null) { //and does not equal any other pieces &&& this is one of my neighbots
//     clickedPiece = elem.target.src
//     fighter = $(`<img class="battleImage" alt="${elem.target.alt}" src="${elem.target.src}" width="100"></img>`)[0]
//     console.log(fighter)
//     // console.log(fighter)
//     // fighter = `<img class="battleImage" alt="${elem.target.alt}" src="${elem.target.src}" width="100"></img>`

//     elem.target.src = grass;
//     elem.target.setAttribute('id', 'moving');
//     elem.target.setAttribute('class', 'grassImage');
//     $('.battleImage').removeAttr('id')
//     // $('img').removeAttr('name data')

//     neighbors = findNeighbors('before') //weird one
//     neighborOptions(neighbors, elem.target, elem.target, false)
//     elem.target.setAttribute('id', '');
//     $('.grassImage').removeAttr('alt');
// } else if (elem.target.className !== 'battleImage' && clickedPiece != null && elem.target.className == 'grassImage' && elem.target.getAttribute('name') == 'legal') {

//     $('img').removeAttr('name')
//     elem.target.src = clickedPiece;
//     altAttribute = turn % 2 == 0 ? "player2" : "player1";
//     elem.target.setAttribute('id', 'moving');
//     elem.target.setAttribute('class', 'battleImage');
//     elem.target.setAttribute('alt', altAttribute);

//     //console.log(fighter, elem.target)
//     //elem.target.outerHTML = fighter
//     $('.battleImage').removeAttr('data')

//     //neighbors = findNeighbors('after')
//     // fightNeighbor(neighbors, elem.target)
//     clickedPiece = null;

//     turn++
//     console.log(altAttribute)
//     $("#turn").html(turn)
//     // middleOfTurn = false;
//     //console.log(turn)
//     //console.log("Enemy");
// }
// else {
//     // console.log(elem.target.data)
//     let random = Math.floor(Math.random() * 2);
//     let winner = random == 0 ? elem.target : fighter;
//     // console.log(elem.target)
//     // console.log(winner);
//     if (winner === fighter) {
//         $(elem.target).replaceWith(fighter);
//     } else {
//         return
//     }
//     turn++
//     // console.log(neighbors)


//     // // elem.target.parentNode.innerHTML = "";
//     // elem.target.parentNode.innerHTML = winner;
// }