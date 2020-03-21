const gameArea = document.getElementById("gameArea");
const player = document.getElementById("player");
const rightBorder = document.getElementById("gameArea").offsetWidth;
const bottomBorder = document.getElementById("gameArea").offsetHeight;
const walls = document.getElementsByClassName("wall");
let wallCollection = new Set();
let playerX = 0;
let playerY = 0;

console.log(walls[0]);
wallCreator();

gameArea.addEventListener("keydown", playerMove);

function playerMove(e){
    setTimeout(function(){},2000);
    switch(e.code){

        case "KeyD": if(playerX + 30 < rightBorder) playerX += 30;
        break;
        case "KeyS": if(playerY + 30 < bottomBorder) playerY += 30;   
        break;
        case "KeyA": if(playerX > 0) playerX -= 30;
        break;
        case "KeyW": if(playerY > 0) playerY -= 30;
        break;
    }

    player.style.left = playerX+"px";
    player.style.top = playerY+"px";

}

function wallCreator(){
    for(let i = 0;i < 5; i++){
        let wallX = randomInt();
        let wallY = randomInt();
        walls[i].style.left = wallX+"px";
        walls[i].style.top = wallY+"px";
        wallCollection.add({x: wallX, y: wallY});
    }
    
    wallCollection.forEach(value => {
        console.log(value.x + " " + value.y);
    });
} 

function randomInt(){
    return Math.floor((870 - 0) * Math.random());
}   