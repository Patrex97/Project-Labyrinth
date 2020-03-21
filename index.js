const gameArea = document.getElementById("gameArea");
const player = document.getElementById("player");
const rightBorder = document.getElementById("gameArea").offsetWidth;
const bottomBorder = document.getElementById("gameArea").offsetHeight;
let filePath;
let playerX = 0;
let playerY = 0;
let mapInfo = [];

const map1 = new Set();

mapCreator()

gameArea.addEventListener("keydown", playerMove);

function mapCreator(){
    fetch('maps/map1.json')
        .then((response) => {
            return response.json();
        })
        .then(data => mapInfo.push(data))
        .then((data) => {
            for(i = 0; i < mapInfo[0].length; i++){
                let wall = document.createElement('div');
                wall.setAttribute('class', 'wall');
                wall.style.left = mapInfo[0][i].xStart+"px";
                wall.style.top = mapInfo[0][i].yStart + "px";
                wall.style.width = mapInfo[0][i].xEnd - mapInfo[0][i].xStart + "px";
                wall.style.height = mapInfo[0][i].yEnd - mapInfo[0][i].yStart + "px";
                gameArea.appendChild(wall);
                console.log(wall);
            }
            
    });
}

function playerMove(e){
    const walls = document.getElementsByClassName("wall");
    let isWall = false;
    for(let i = 0; i < walls.length; i++)
    {
        let wallStartX = parseInt(walls.item(i).style.left.match(/\d/g).join(""));
        let wallStartY = parseInt(walls.item(i).style.top.match(/\d/g).join(""));
        let wallWidth = parseInt(walls.item(i).style.width.match(/\d/g).join(""));
        let wallHeight = parseInt(walls.item(i).style.height.match(/\d/g).join(""));
        let wallEndX = wallWidth + wallStartX;
        let wallEndY = wallHeight + wallStartY;
        switch(e.code){

            case "KeyD": 
            
                if(playerX + 30  == wallStartX && (playerY >= wallStartY && playerY < wallEndY)) isWall = true;
                break;

            case "KeyS":
                if(playerY + 30 == wallStartY && (playerX >= wallStartX && playerX < wallEndX )) isWall = true;
                break;

            case "KeyA":
                if(playerX == wallEndX && (playerY >= wallStartY && playerY < wallEndY)) isWall = true;
                break;

            case "KeyW":
                if(playerY == wallEndY && (playerX >= wallStartX && playerX < wallEndX )) isWall = true;
                break;
        } 
        console.log(isWall);
    }

     
    if(!isWall){
        switch(e.code){
            case "KeyD": if(playerX + 60 < rightBorder) playerX += 30;break;
            case "KeyS": if(playerY + 60 < bottomBorder) playerY += 30;break;
            case "KeyA": if(playerX > 0) playerX -= 30;break;
            case "KeyW": if(playerY > 0) playerY -= 30;break;
        }
        player.style.left = playerX+"px";
        player.style.top = playerY+"px";
    }  
  //  console.log("Player X: " + playerX);
    console.log("Player Y: " + playerY);
}

