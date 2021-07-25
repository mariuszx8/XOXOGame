document.addEventListener("DOMContentLoaded", function() {
// Sprawdzenie nazw użytkownika z poprzedniej rozgrywki
player1 = getCookie("player1");
player2 = getCookie("player2");
document.cookie = "player1=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
document.cookie = "player2=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
if (player1 != "" && player2 != "") {
    document.querySelector("div.intro").classList.add("hide");
    document.querySelector("div.flex-container").classList.remove("hide");
    document.querySelector("span.players").classList.remove("hide");
    document.querySelector(".players").innerText = "" + player1 + " vs " + player2;  
}

// Przejście z ekranu startowego do planszy z grą
startBtn = document.querySelector("div.start-btn");    
startBtn.addEventListener("click", start);

function start() {
    player1 = document.querySelector("#player1").value;
    player2 = document.querySelector("#player2").value;
    if (player1 == "" || player2 == "") {
        document.querySelector("span.message").innerText = "Nie podano nazwy gracza";
    } else {
        document.querySelector("div.intro").classList.add("hide");
        document.querySelector("div.flex-container").classList.remove("hide");
        document.querySelector("span.players").classList.remove("hide");
        document.querySelector(".players").innerText = "" + player1 + " vs " + player2;    
    }
}
// Właściwy kod gry
var div = document.querySelectorAll(".container  div");
var winner = document.querySelector(".winner");
var xo = "x";

for (var pole of div) {
    pole.addEventListener("click", game)
}

restartBtn = document.querySelector("div.restart-btn");    
restartBtn.addEventListener("click", () => {again(player1, player2)});

function game() {
    this.innerHTML = xo;
    var row1 = new Array();
    for (var i=0; i<3; i++) {
        row1.push(""+div[i].innerHTML);
    }
    var row2 = new Array();
    for (var i=3; i<6; i++) {
        row2.push(""+div[i].innerHTML);
    }
    var row3 = new Array();
    for (var i=6; i<9; i++) {
        row3.push(""+div[i].innerHTML);
    }
    
    if(checkRow(row1) || checkRow(row2) || checkRow(row3) || checkAslant(row1, row2, row3)) {
        if (xo == "x") {win = player1} else {win = player2}
        winner.innerHTML ="wygrał " + win;
        winner.classList.remove("hide");
        restartBtn.classList.remove("hide");
        for (var el of div) {
            el.removeEventListener('click', game)
        }        
    }else if(!row1.includes("")&&!row2.includes("")&&!row3.includes("")) {
        winner.innerHTML = "Remis";
        winner.classList.remove("hide");
        restartBtn.classList.remove("hide");
    }
    if (xo=='x') {
        xo = 'o'
    } else {
        xo = 'x'
    }
    this.removeEventListener('click', game);
}

function checkRow(a1) {
    if(a1[0]==a1[1] && a1[1]==a1[2] && a1[1]!="" && a1[0]!="" && a1[2]!="")return true
    return false;
}

function checkAslant(a1,a2,a3) {
    if(a1[0]==a2[1] && a2[1]==a3[2] && a1[0]!="" && a2[1]!="" && a3[2]!="")return true
    if(a1[2]==a2[1] && a2[1]==a3[0] && a1[2]!="" && a2[1]!="" && a3[0]!="")return true
    return false;
}

function again(player1, player2) {
    var date = new Date();
    date.setTime(date.getTime()+(5*60*1000));
    var expires = "; expires="+date.toUTCString();

    document.cookie = "player1=" + player1 + expires + "; path=/";
    document.cookie = "player2=" + player2 + expires + "; path=/";
    location.reload();
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

})