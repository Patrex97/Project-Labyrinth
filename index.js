const $gameArea = document.querySelector("#gameArea");
const $popup = document.querySelector('.popup');
let $filePath = 'maps/map1.json';
let $playerX = -1;
let $playerY = -1;
let $scaleValue;
let $oldScaleValue = 0;
let $level = 1;

const mapCreator = () => {
    let mapInfo = [];
    fetch($filePath)
        .then((response) => {
            return response.json();
        })
        .then(data => mapInfo.push(data))
        .then((data) => {
            let player = document.createElement('div');
            player.setAttribute('id', 'player');
            player.style.left = $playerX + "px";
            player.style.top = $playerY + "px";
            $gameArea.appendChild(player);
            player = document.querySelector("#player");

            $playerX = mapInfo[0][0].xStart * $scaleValue;
            $playerY = mapInfo[0][0].yStart * $scaleValue;
            player.style.left = $playerX + "px";
            player.style.top = $playerY + "px";

            let mapFinish = document.createElement('div');
            mapFinish.setAttribute('id', 'finish');
            mapFinish.style.left = mapInfo[0][1].xStart * $scaleValue + "px";
            mapFinish.style.top = mapInfo[0][1].yStart * $scaleValue + "px";
            $gameArea.appendChild(mapFinish);
            for (i = 2; i < mapInfo[0].length; i++) {
                let wall = document.createElement('div');
                wall.setAttribute('class', 'wall');
                wall.style.left = mapInfo[0][i].xStart * $scaleValue + "px";
                wall.style.top = mapInfo[0][i].yStart * $scaleValue + "px";
                wall.style.width = mapInfo[0][i].xEnd * $scaleValue - mapInfo[0][i].xStart * $scaleValue + "px";
                wall.style.height = mapInfo[0][i].yEnd * $scaleValue - mapInfo[0][i].yStart * $scaleValue + "px";
                wall.setAttribute("name", mapInfo[0][i].name);
                $gameArea.appendChild(wall);
            }
        });
}

const checkSize = () => {
    if (window.innerHeight > 850) {
        $scaleValue = 25;
    } else if(window.innerHeight < 700) {
        $scaleValue = 15;
    }else{
        $scaleValue = 20;
    }
    if ($oldScaleValue != $scaleValue) {
        $gameArea.innerHTML = '';
        switch($scaleValue){
            case 15: $playerX = $playerX * 3 / 5;
                     $playerY = $playerY * 3 / 5;
                     break;
            case 20: $playerX = $playerX * 4 / 5;
                     $playerY = $playerY * 4 / 5;
                     break;
            case 25: $playerX = $playerX * 5 / 3;
                     $playerY = $playerY * 5 / 3;
                     break;
        }
        mapCreator();
        $oldScaleValue = $scaleValue;

    }
}
checkSize()

const playerMove = e => {
    const rightBorder = $gameArea.offsetWidth;
    const bottomBorder = $gameArea.offsetHeight;
    const walls = document.querySelectorAll(".wall");
    const mapFinish = document.querySelector("#finish");
    let player = document.querySelector("#player");
    let key;
    if (typeof e === 'string') key = e;
    else key = e.code;
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

                if ($playerX + $scaleValue == wallStartX && ($playerY >= wallStartY && $playerY < wallEndY)) isWall = true;
                break;

            case "KeyS":
                if ($playerY + $scaleValue == wallStartY && ($playerX >= wallStartX && $playerX < wallEndX)) isWall = true;
                break;

            case "KeyA":
                if ($playerX == wallEndX && ($playerY >= wallStartY && $playerY < wallEndY)) isWall = true;
                break;

            case "KeyW":
                if ($playerY == wallEndY && ($playerX >= wallStartX && $playerX < wallEndX)) isWall = true;
                break;
        }

    }
    if (!isWall) {
        switch (key) {
            case "KeyD":
                if ($playerX + $scaleValue < rightBorder - 2 * $scaleValue) $playerX += $scaleValue;
                break;
            case "KeyS":
                if ($playerY + $scaleValue < bottomBorder - 2 * $scaleValue) $playerY += $scaleValue;
                break;
            case "KeyA":
                if ($playerX > 0) $playerX -= $scaleValue;
                break;
            case "KeyW":
                if ($playerY > 0) $playerY -= $scaleValue;
                break;

            case "KeyP": 
                $popup.style.display = 'grid';
                $popup.children[0].style.display = 'block';
                $gameArea.blur();
                break;

        }
        player.style.left = $playerX + "px";
        player.style.top = $playerY + "px";
        if (player.style.left == mapFinish.style.left && player.style.top == mapFinish.style.top) levelDone();
    }
}

const levelDone = () => {
    $filePath = `maps/map${++$level}.json`;
    $gameArea.style.opacity = "0";
    setTimeout(function () {
        $gameArea.innerHTML = '';
        mapCreator();
        $gameArea.style.opacity = "1";
    }, 2000);
}

window.addEventListener('DOMContentLoaded', () =>{
    $popup.style.display = 'grid';
    $popup.children[0].style.display = 'block';
    window.addEventListener('keydown', (e) =>{
        if(e.code == "Space"){
            $popup.style.display = 'none';
            $popup.children[0].style.display = 'none'; 
            $gameArea.focus();
        }
    })
    window.addEventListener("resize", checkSize);
    $gameArea.addEventListener("keydown", playerMove);
})