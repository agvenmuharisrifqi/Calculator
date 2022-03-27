/**
 * @Subpacakge Calculator Standard
 * @Function Input Session
 */
const re = /[^x\/\-\+\d]/gmi;
const inputNum = document.getElementById("number");
inputNum.addEventListener('keyup', ()=>{
    let val = inputNum.value;
    let res = val.replace(re, "");
    inputNum.value = res;
})

/**
 * @Function Number Button
 */
const btnNormal = document.getElementsByClassName("button__normal");
for(let btnN = 0; btnN < btnNormal.length; btnN++){
    btnNormal[btnN].addEventListener("click", ()=>{
        inputNum.value += btnNormal[btnN].textContent;
        inputNum.focus();
    })
}
document.addEventListener("keypress", (event)=>{
    let x = event.key;
    inputNum.value += x;
})

/**
 * @Function Delete All Button
 */
const delAll = document.getElementById("delete-all");
delAll.addEventListener("click", ()=>{
    inputNum.value = "";
})