let startButton = document.getElementById("strButton");
let submitDiffButton = document.getElementById("sbtButton");
let diffChosen = document.getElementById("set-diff")
let fieldsetDiff = document.getElementById("choose-diff-fieldset")
let radioButtons = document.querySelectorAll('input[name="difficulty"]');
let divWordShown = document.getElementById("wordChosen");







startButton.addEventListener('click',()=>{
    timer()
});


submitDiffButton.addEventListener("click",($event)=>{
    $event.preventDefault();
    let selected_diff;
    for (let i of radioButtons){
        if (i.checked){
            selected_diff = i.value;
            break;
        }
    }
    fieldsetDiff.innerHTML = `You have chosen ${selected_diff} difficulty`
})


