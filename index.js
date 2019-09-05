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
let warrior = new Character(100, 100, 9, 2, './PNG/Warrior.png'); //player 1 for now
let soldier = new Character(150, 100, 3, 7, './PNG/Soldier.png'); // player 2 for now
let grass = './PNG/grass-png-cartoon.png'
// let fighter = new Character(75, 75, 9, 2);


function printToScreen() {
    document.getElementById('warrior-health').innerText = warrior.health;
    document.getElementById('soldier-health').innerText = soldier.health;
}

function fight() {
    // let restartButton = document.getElementById('restart-button');
    warriorAttack();
    soldierAttack();
}

function warriorAttack() {
    logMessage = document.getElementById('log')

    let hitPerc = warrior.hit / 100;
    // if loop for calculating damage done and health after attack
    if (Math.random() < hitPerc) {
        let warriorDamage = (Math.floor(Math.random() * 6 + 1)) * warrior.strength;
        warriorDamage -= soldier.armor;
        soldier.health -= warriorDamage;
        logMessage.innerText = `Warrior did ${warriorDamage} damage to soldier. ${soldier.health} health left!`
        // console.log(`Warrior did ${warriorDamage} damage to soldier. ${soldier.health} health left!`);
    } else {
        logMessage.innerText = 'Warrior missed'
        // console.log('Warrior missed')
    }
    printToScreen();
}

function soldierAttack() {
    logMessage = document.getElementById('log')

    let hitPerc = soldier.hit / 100;
    // if loop for calculating damage done and health after attack
    if (Math.random() < hitPerc) {
        let soldierDamage = (Math.floor(Math.random() * 6 + 1)) * soldier.strength;
        soldierDamage -= warrior.armor;
        warrior.health -= soldierDamage;
        logMessage.innerText = `Soldier did ${soldierDamage} damage to warrior. ${warrior.health} health left!`

        // console.log(`Soldier did ${soldierDamage} damage to warrior. ${warrior.health} health left!`);
    } else {
        logMessage.innerText = 'Soldier missed';
        // console.log('Soldier missed')
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
                theImage.src = warrior.pieceCode;
                theImage.width = "100";
            }
            if (r === 4) {
                // cell.innerHTML = soldier.pieceCode; //just to lable each cell. later this becomes the game pieces
                // cell.appendChild(theImage)
                theImage.setAttribute('class', 'battleImage')
                theImage.setAttribute('alt', 'player1')
                theImage.src = soldier.pieceCode;
                theImage.width = "100";
            }
            if (r > 0 && r < 4) {
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


let clickedPiece = null;

let turn = 1

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


let middleOfTurn = false;

function movePlayer(elem) {
    console.log(elem, turn);
    middleOfTurn = true;

    if (elem.target.className === 'battleImage') { //and does not equal any other pieces &&& this is one of my neighbots
        clickedPiece = elem.target.src
        // console.log(clickedPiece)
        elem.target.src = grass;
        elem.target.setAttribute('id', 'moving');
        elem.target.setAttribute('class', 'grassImage');
        $('.battleImage').removeAttr('id')
        $('img').removeAttr('name')

        let neighbors = findNeighbors('before') //weird one
        neighbors.forEach(neighbor => {
            console.log(neighbor)
            if (neighbor.className == 'grassImage') {
                neighbor.setAttribute('name', 'legal')
            }
        })
        elem.target.setAttribute('id', '');
        $('.grassImage').removeAttr('alt');
    } else if (elem.target.className !== 'battleImage' && clickedPiece != null && elem.target.className == 'grassImage' && elem.target.getAttribute('name') == 'legal') {
        // console.log(clickedPiece)
        $('img').removeAttr('name')
        const altAttribute = turn % 2 == 0 ? "player2" : "player1";
        elem.target.src = clickedPiece;
        elem.target.setAttribute('id', 'moving');
        elem.target.setAttribute('class', 'battleImage');
        elem.target.setAttribute('alt', altAttribute);
        clickedPiece = null;

        let neighbors = findNeighbors('after')
        fightNeighbor(neighbors)
        turn++
        // $("#turn").html(turn)
        // middleOfTurn = false;
        console.log(turn)
    }
}

function fightNeighbor(neighbors) {
    $('.battleImage').removeAttr('data')
    neighbors.forEach(neighbor => {
        console.log(neighbor)
        if (neighbor.className == 'battleImage') {
            neighbor.setAttribute('data', 'war')
            fight();
        }
    })
}



function findNeighbors(when) {

    //let columns = document.querySelectorAll('cell')
    let columns = cells;
    let activeColumn;
    columns.forEach((col, i) => {
        console.log(col.className, col.id, col.innerHTML)
        if (col.id == "moving") {
            activeColumn = i;
        }
    })
    console.log('active column', activeColumn)

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