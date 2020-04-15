const gameArea = document.getElementById("gameArea");
const btnUp = document.getElementById("up");
const btnDown = document.getElementById("down");
const btnLeft = document.getElementById("left");
const btnRight = document.getElementById("right");
let filePath = 'maps/map1.json';
let playerX = -1;
let playerY = -1;
let scaleValue;
let oldScaleValue = 0;

window.addEventListener("resize", checkSize);
gameArea.addEventListener("keypress", playerMove);
btnUp.addEventListener("click", moveBtn);
btnDown.addEventListener("click", moveBtn);
btnLeft.addEventListener("click", moveBtn);
btnRight.addEventListener("click", moveBtn);

alert("Red square represents you The Player (You can move with WSAD key's)");
alert("Black square represents Exit, reach it to complete level");
function moveBtn() {
    playerMove(this.getAttribute("move_direction"));
};

function checkSize() {
    if (window.innerWidth > 1000) {
        scaleValue = 30;

    } else {
        scaleValue = 20;

    }
    if (oldScaleValue != scaleValue) {
        gameArea.innerHTML = '';
        if (scaleValue == 20) {
            playerX = playerX * 2 / 3;
            playerY = playerY * 2 / 3;
        } else {
            playerX = playerX * 3 / 2;
            playerY = playerY * 3 / 2;
        }
        mapCreator();
        oldScaleValue = scaleValue;

    }
}
checkSize()

function mapCreator() {
    let mapInfo = [];
    fetch(filePath)
        .then((response) => {
            return response.json();
        })
        .then(data => mapInfo.push(data))
        .then((data) => {
            let player = document.createElement('div');
            player.setAttribute('id', 'player');
            player.style.left = playerX + "px";
            player.style.top = playerY + "px";
            gameArea.appendChild(player);
            player = document.getElementById("player");

            playerX = mapInfo[0][0].xStart * scaleValue;
            playerY = mapInfo[0][0].yStart * scaleValue;
            player.style.left = playerX + "px";
            player.style.top = playerY + "px";

            let mapFinish = document.createElement('div');
            mapFinish.setAttribute('id', 'finish');
            mapFinish.style.left = mapInfo[0][1].xStart * scaleValue + "px";
            mapFinish.style.top = mapInfo[0][1].yStart * scaleValue + "px";
            gameArea.appendChild(mapFinish);
            for (i = 2; i < mapInfo[0].length; i++) {
                let wall = document.createElement('div');
                wall.setAttribute('class', 'wall');
                wall.style.left = mapInfo[0][i].xStart * scaleValue + "px";
                wall.style.top = mapInfo[0][i].yStart * scaleValue + "px";
                wall.style.width = mapInfo[0][i].xEnd * scaleValue - mapInfo[0][i].xStart * scaleValue + "px";
                wall.style.height = mapInfo[0][i].yEnd * scaleValue - mapInfo[0][i].yStart * scaleValue + "px";
                wall.setAttribute("name", mapInfo[0][i].name);
                gameArea.appendChild(wall);
            }
        });
}

function playerMove(e) {
    const rightBorder = document.getElementById("gameArea").offsetWidth;
    const bottomBorder = document.getElementById("gameArea").offsetHeight;
    const walls = document.getElementsByClassName("wall");
    const mapFinish = document.getElementById("finish");
    let player = document.getElementById("player");
    let key;
    if (typeof e === 'string') key = e;
    else key = e.code;
    console.log(key);
    let isWall = false;
    for (let i = 0; i < walls.length; i++) {
        let wallStartX = parseInt(walls.item(i).style.left.match(/\d/g).join(""));
        let wallStartY = parseInt(walls.item(i).style.top.match(/\d/g).join(""));
        let wallWidth = parseInt(walls.item(i).style.width.match(/\d/g).join(""));
        let wallHeight = parseInt(walls.item(i).style.height.match(/\d/g).join(""));
        let wallEndX = wallWidth + wallStartX;
        let wallEndY = wallHeight + wallStartY;
        switch (key) {

            case "KeyD":

                if (playerX + scaleValue == wallStartX && (playerY >= wallStartY && playerY < wallEndY)) isWall = true;
                break;

            case "KeyS":
                if (playerY + scaleValue == wallStartY && (playerX >= wallStartX && playerX < wallEndX)) isWall = true;
                break;

            case "KeyA":
                if (playerX == wallEndX && (playerY >= wallStartY && playerY < wallEndY)) isWall = true;
                break;

            case "KeyW":
                if (playerY == wallEndY && (playerX >= wallStartX && playerX < wallEndX)) isWall = true;
                break;
        }

    }
    console.log(isWall);
    if (!isWall) {
        console.log(rightBorder);
        switch (key) {
            case "KeyD": if (playerX + scaleValue < rightBorder - 2 * scaleValue) playerX += scaleValue; break;
            case "KeyS": if (playerY + scaleValue < bottomBorder - 2 * scaleValue) playerY += scaleValue; break;
            case "KeyA": if (playerX > 0) playerX -= scaleValue; break;
            case "KeyW": if (playerY > 0) playerY -= scaleValue; break;

        }
        player.style.left = playerX + "px";
        player.style.top = playerY + "px";
        if (player.style.left == mapFinish.style.left && player.style.top == mapFinish.style.top) levelDone();
    }
    console.log("Player X: " + playerX);
    console.log("Player Y: " + playerY);
}

function levelDone() {
    filePath = "maps/map2.json";
    gameArea.style.opacity = "0";
    setTimeout(function () {
        gameArea.innerHTML = '';
        mapCreator();
        gameArea.style.opacity = "1";
    }, 3500);
}