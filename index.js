// menu
// ***************************************************
// game title
// intro to game
// click 'get started' button -> to team selection



// eventually...
// **************************************************
// team build section 
// player one selects team Composition
// clicks ready button
// player two selects team Composition
// clicks ready button
// can select team comp at random - button
// click 'to battle' button 



// game logic
// **************************************************
// player one selects character

// pick action section
// three options:
//     move
//     attack
//     pass

// ********************
// if move:
// characters possible movement squares highlight - light green
//     initally character can only move in four cardinal directions
// if p1 selects a possible movement square the game prompts question 'Are you sure you want to move here?'
//     if yes, character moves to open space
//         then ends turn, p2 goes
//     if no resets back to p1 pick action section
// if p1 selects occupied space
//     game alerts 'cant move there'
//     then resets back to p1 pick action section

// ********************
// if attack:
// checks 4 cardinal directions for a p2c
// if p2c there, square turns red 

// if p1 character clicks p2 chracter, battle prompt initiates instead
//     i.e 'p1 Warrior will attack p2 warrior. Do you want to continue?'
//     if yes, p1c attacks p2c - initiate battle logic
//     if no, resets back to pick action section



// battle logic
// **************************************************
// accept another character as a parameter
// determine if hit lands or not
//     use hit percentage mechanism
//     do a math random to get a num from 0-.99 and compare to characters hit % to see if hit lands
// damage - roll random number on a dice
//     dice mechanism makes damage more realistic because two dice allows for more 5-9 and less outliers
// armor - subtract damage done from armor stat to get actual damage
// health - subract actual damage from p2c
// check if p2c has zero health
//     if so, p2c dead 
// check if p2 has any characters left alive
//     if yes, p2 turn
//     if no, game over p1 wins 


// **************************************************
// if pass:
// next players turn


// ************* ideas **************
// - during battle have fight simulation going on screen.
//  instead of clicking fight each time just have an auto timer going
// - Select Player function? Would need to change all warriors/soldiers to player/opponent 
//  and include if statement about choosing class






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

// '&#x1F6E1'
// './PNG/Warrior.png'
// './PNG/Soldier.png'
// '&#9876'

let warrior = new Character(100, 40, 9, 2, './PNG/Warrior.png'); //player 1 for now
let soldier = new Character(150, 60, 3, 7, './PNG/Soldier.png'); // player 2 for now
// let fighter = new Character(75, 75, 9, 2);


function printToScreen() {
    document.getElementById('warrior-health').innerText = warrior.health;
    document.getElementById('soldier-health').innerText = soldier.health;
}

function fight() {
    let fightButton = document.getElementById('fight-button');
    // let restartButton = document.getElementById('restart-button');
    let gameMessage = document.getElementById('game-message');

    warriorAttack();
    gameMessage.innerText = 'Soldier will attack now'

    if (isGameOver(soldier.health)) {
        endGame(`Warrior has killed the Soldier`)
        return;
    }

    fightButton.disabled = true;

    setTimeout(() => {
        soldierAttack();
        fightButton.disabled = false;
        gameMessage.innerText = 'Warrior will attack now'

        if (isGameOver(warrior.health)) {
            endGame(`Soldier has killed the Warrior`)
            return;
        }
    }, 1000)
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
function isGameOver(health) {
    return health <= 0;
};

function endGame(message) {
    document.getElementById('game-message').innerText = message;
    document.getElementById('restart-button').hidden = false;
    document.getElementById('fight-button').hidden = true;
}

function restart () {
    document.location.href = '';
}

// need to call print to screen here to display inital health and emojis
printToScreen();




//************************************* board logic ***********************************/





let id = 0

function createBoard() {
    let board = document.getElementById('gameboard');

    for(let r=0; r < 5; r++){
        let row = document.createElement('div');
        row.setAttribute('class', 'row');

        for(let c=0; c<5; c++){
            let cell = document.createElement('div');
            let theImage = document.createElement('img')
            // theImage.setAttribute('src', ' ')
            cell.setAttribute('class', 'cell');
            cell.appendChild(theImage)


            // cell.id = id;
            row.appendChild(cell);
            if(r === 0){
                // cell.innerHTML = warrior.pieceCode; //just to lable each cell. later this becomes the game pieces
                // cell.appendChild(theImage)
                theImage.setAttribute('class', 'cImage')
                theImage.src = warrior.pieceCode;
                theImage.width = "100";
            }
            if(r === 4){
                // cell.innerHTML = soldier.pieceCode; //just to lable each cell. later this becomes the game pieces
                // cell.appendChild(theImage)
                theImage.setAttribute('class', 'cImage')
                theImage.src = soldier.pieceCode;
                theImage.width = "100";
            }
            if(r > 0 && r < 4){
                theImage.setAttribute('class', 'cImage')
                theImage.src = './PNG/grass-png-cartoon.png'
                theImage.width = "100";
            }
        }
    board.appendChild(row);
    }
}

createBoard()






let board = document.getElementsByClassName('gameboard')[0];
let cells = document.querySelectorAll('.cImage')

// const pieces = {
//     warPiece: '&#9876',
//     solPiece: '&#x1F6E1', //placeholder
//     // fightPiece: 'ffff' //placeholder
// }


let clickedPiece;

let turns = 1

cells.forEach(function (element) {
    element.addEventListener('click', function (elem) {
        console.log(elem, elem.target.src);
        if (elem.target.src !== ' ') { //and does not equal any other pieces &&& this is one of my neighbots
            clickedPiece = elem.target.src
            // console.log(clickedPiece)
            elem.target.src = ''
            //movingColor();
            findNeighbors('before')
            $('.cImage').removeAttr('id')
            elem.target.setAttribute('id', '');

        } else if (elem.target.src === ' ') {
            console.log(elem.target.src)
            elem.target.src = clickedPiece;
            elem.target.setAttribute('id', 'moving');
            clickedPiece = ''
            //movingColor();
            findNeighbors('after')
            // console.log(clickedPiece)

            // switch turns 
            turns++
        }
    })
});

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

    let actives = []
    if((activeColumn + 1) % 5 !== 0){
         actives.push(columns[activeColumn + 1])
    } 

    if(activeColumn % 5 !== 0){
        actives.push(columns[activeColumn - 1])
    }

    if(activeColumn < 20) {
        actives.push(columns[activeColumn + 5])
    }

    if(activeColumn > 6){
        actives.push(columns[activeColumn - 5])
    }
    console.log(when, 'neighbors are ', actives)

}

// function movingColor () {
//     let movingElement = document.getElementById('moving');
//     movingElement.classList.toggle('moving-color');
// }