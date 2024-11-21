function timer(){
    let sec = 60;
    let timer = setInterval(function(){
        document.getElementById('timer').innerHTML='00:'+sec;
        sec--;
        if (sec < 0) {
            clearInterval(timer);
            document.getElementById('timer').innerHTML="Fin"
        }
    }, 1000);
}