var rand=1;
var matrix = [];
function onCellEnter(id){

    var r=parseInt(id[4]);
    var c=parseInt(id[5]);
    var img = document.getElementById(id).getElementsByTagName('img')[0];
    if(matrix[r][c]===-1)
        img.style.visibility='visible';
    if(rand===0){
        
        img.src="Ogrey.png";
    }
    else{
        
        img.src="Xgrey.png";
    }
    
}

function initializeGame(callback){
    for(var i=1; i<=3; i++) {
        matrix[i] = new Array(3);
        for (var j=1; j<=3; j++)
            matrix[i][j]=-1;
    }
    if(callback){
        callback();
    }
}

function initializeUI() {
    for (let i = 1; i <= 3; i++) {
      document.getElementById("board").innerHTML += `<div id="r${i}"></div>`;
      for (let j = 1; j <= 3; j++) {
        document.getElementById(
          `r${i}`
        ).innerHTML += `<div class="cell" id="cell${i}${j}" onmouseenter="onCellEnter('cell${i}${j}')" onmouseleave="onCellExit('cell${i}${j}')" onclick="onCellClick('cell${i}${j}')"> <img src="Xgrey.png"/> <img src="X.png"/> </div>`;
      }
    }
}



function onCellExit(id){  
    var img = document.getElementById(id).getElementsByTagName('img')[0];
    img.style.visibility='hidden'; 
}

function onCellClick(id){

    var r=parseInt(id[4]);
    var c=parseInt(id[5]);
    var img = document.getElementById(id).getElementsByTagName('img')[1];
    img.style.visibility='visible';
    if(matrix[r][c]===-1)
        matrix[r][c]=rand;
    else
        return;

    if(rand===0){
        rand=1;
        img.src="O.png";
    }
    else{
        rand=0;
        img.src="X.png";
    }


    const message = checkWin();
    if(message!=""){
        document.getElementById("winning-message").innerHTML=message;
        (function () {
            function cancel () { return false; };
            document.getElementById("board").disabled = true;
            var nodes = document.getElementById("board").getElementsByTagName('*');
            
            for (var i = 0; i < nodes.length; i++) {
                nodes[i].setAttribute('disabled', true);
                nodes[i].onclick = cancel;
                nodes[i].onmouseenter = cancel;
            }
        }());
        setTimeout(function(){
            if(confirm("Do you wanna play again?")){
                clearUI();
                initializeGame(initializeUI);
            }
        },3000)

    }
}

function clearUI(){
    document.getElementById('board').innerHTML ="";
    document.getElementById('winning-message').innerHTML ="";
}

document.addEventListener("DOMContentLoaded", function(){
        
     document.addEventListener('onmouseleave',function(event){onCellExit(event)});
     document.addEventListener('onmouseenter',function(event){onCellEnter(event)});
     document.addEventListener('onclick',function(event){onCellClick(event)});
    
    
    initializeGame();   
});
function checkWin(){
    let wonX;
    if(matrix[1][1]===matrix[1][2] && matrix[1][2]===matrix[1][3] && matrix[1][1]!=-1)
        wonX = matrix[1][1]===1;

    else if(matrix[2][1]===matrix[2][2] && matrix[2][2]===matrix[2][3]&& matrix[2][1]!=-1)
        wonX = matrix[2][1]===1;

    else if(matrix[3][1]===matrix[3][2] && matrix[3][2]===matrix[3][3]&& matrix[3][1]!=-1)
        wonX = matrix[3][1]===1;

    else if(matrix[1][1]===matrix[2][2] && matrix[2][2]===matrix[3][3]&& matrix[1][1]!=-1)
        wonX = matrix[1][1]===1;

    else if(matrix[1][2]===matrix[2][2] && matrix[2][2]===matrix[3][2]&& matrix[1][2]!=-1)
        wonX = matrix[1][2]===1;

    else if(matrix[1][1]===matrix[2][1] && matrix[2][1]===matrix[3][1]&& matrix[1][1]!=-1)      
        wonX = matrix[1][1]===1;

    else if(matrix[1][3]===matrix[2][3] && matrix[2][3]===matrix[3][3]&& matrix[1][3]!=-1)
        wonX = matrix[1][3]===1;

    else if(matrix[1][3]===matrix[2][2] && matrix[2][2]===matrix[3][1]&& matrix[1][3]!=-1)
        wonX = matrix[1][3]===1;

    if(wonX===undefined)
        for(let i = 1; i<=3; i++){
            for(let j = 1; j<=3; j++){
                if(matrix[i][j]===-1) return "";
            }
        }

    return wonX===undefined?"Draw":wonX?"X won":"0 won";

}