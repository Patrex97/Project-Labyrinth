const gameArea = document.getElementById("gameArea");
const player = document.getElementById("player");
const rightBorder = document.getElementById("gameArea").offsetWidth;
const bottomBorder = document.getElementById("gameArea").offsetHeight;
let filePath;
let playerX = 0;
let playerY = 0;
let mapInfo = [];
let scaleValue ;
let oldScaleValue = 0;

const map1 = new Set();

window.addEventListener("resize", checkSize);
gameArea.addEventListener("keydown", playerMove);

function checkSize(){
    if(window.innerWidth > 900){
        scaleValue = 30;
    }else{
        scaleValue = 20;
    }
    if(oldScaleValue != scaleValue){
        const walls = document.getElementsByClassName("wall");
        console.log(walls.length);
        for(let i = 0; i < walls.length ; i++){
            gameArea.removeChild(walls[i]);
            console.log(i);
        }      
        
        oldScaleValue = scaleValue;
        mapCreator();
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

    if(!isWall){
        switch(e.code){
            case "KeyD": if(playerX + 2*scaleValue < rightBorder) playerX += scaleValue;break;
            case "KeyS": if(playerY + 2*scaleValue < bottomBorder) playerY += scaleValue;break;
            case "KeyA": if(playerX > 0) playerX -= scaleValue;break;
            case "KeyW": if(playerY > 0) playerY -= scaleValue;break;
        }
        player.style.left = playerX+"px";
        player.style.top = playerY+"px";
    }  
  //  console.log("Player X: " + playerX);
  //  console.log("Player Y: " + playerY);
}

