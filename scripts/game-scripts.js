function timer(){
    let sec = 60;
    let timer = setInterval(function(){
        document.getElementById('timer').innerText='00:'+sec;
        sec--;
        if (sec < 0) {
            clearInterval(timer);
            document.getElementById('timer').innerText="Fin"
        }
    }, 1000);
}


function showRandomWord(difficulty,timer){
    while (timer){
        if (difficulty === "easy"){
            generate({minLength:3,maxLength:5})
        }else if (difficulty ==="medium"){
            generate({minLength:5,maxLength:7})
        }else {
            generate({minLength:8})
        }
    }
}

