const gameArea = document.getElementById("gameArea");
let player;
const rightBorder = document.getElementById("gameArea").offsetWidth;
const bottomBorder = document.getElementById("gameArea").offsetHeight;
let filePath;
let playerX = 0;
let playerY = 0;
let mapInfo = [];
let scaleValue ;
let oldScaleValue = 0;

window.addEventListener("resize", checkSize);
gameArea.addEventListener("keydown", playerMove);

function checkSize(){
    if(window.innerWidth > 900){
        scaleValue = 30;
        
    }else{
        scaleValue = 20;
        
    }
    if(oldScaleValue != scaleValue){
        gameArea.innerHTML = '';
        if(scaleValue == 20)
        {
            playerX = playerX * 2/3;
            playerY = playerY * 2/3;
        }else{
            playerX = playerX * 3/2;
            playerY = playerY * 3/2;
        }
        mapCreator();
        oldScaleValue = scaleValue;
        
    }
}
checkSize()

function mapCreator(){
    fetch('maps/map1.json')
        .then((response) => {
            return response.json();
        })
        .then(data => mapInfo.push(data))
        .then((data) => {
            let player = document.createElement('div');
            player.setAttribute('id', 'player');
            player.style.left = playerX+"px";
            player.style.top = playerY+"px";
            gameArea.appendChild(player);
            player = document.getElementById("player");
            for(i = 0; i < mapInfo[0].length; i++){
                let wall = document.createElement('div');
                wall.setAttribute('class', 'wall');
                wall.style.left = mapInfo[0][i].xStart*scaleValue+"px";
                wall.style.top = mapInfo[0][i].yStart*scaleValue + "px";
                wall.style.width = mapInfo[0][i].xEnd*scaleValue - mapInfo[0][i].xStart*scaleValue + "px";
                wall.style.height = mapInfo[0][i].yEnd*scaleValue - mapInfo[0][i].yStart*scaleValue + "px";
                wall.setAttribute("name", mapInfo[0][i].name);
                gameArea.appendChild(wall);
             //   console.log(wall);
            }
            
    });
}

function playerMove(e){
    player = document.getElementById("player");
    let walls = document.getElementsByClassName("wall");
    console.log(walls.length);
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
            
                if(playerX + scaleValue  == wallStartX && (playerY >= wallStartY && playerY < wallEndY)) isWall = true;
                break;

            case "KeyS":
                if(playerY + scaleValue == wallStartY && (playerX >= wallStartX && playerX < wallEndX )) isWall = true;
                break;

            case "KeyA":
                if(playerX == wallEndX && (playerY >= wallStartY && playerY < wallEndY)) isWall = true;
                break;

            case "KeyW":
                if(playerY == wallEndY && (playerX >= wallStartX && playerX < wallEndX )) isWall = true;
                break;
        } 
        
    }
    console.log(isWall);
    if(!isWall){
        console.log(rightBorder);
        switch(e.code){
            case "KeyD": if(playerX + scaleValue < rightBorder - 2*scaleValue) playerX += scaleValue;break;
            case "KeyS": if(playerY + scaleValue < bottomBorder - 2*scaleValue) playerY += scaleValue;break;
            case "KeyA": if(playerX > 0) playerX -= scaleValue;break;
            case "KeyW": if(playerY > 0) playerY -= scaleValue;break;
            
        }
        player.style.left = playerX+"px";
        player.style.top = playerY+"px";
    }  
    console.log("Player X: " + playerX);
    console.log("Player Y: " + playerY);
}

