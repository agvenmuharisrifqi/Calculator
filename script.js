/**
 * @Function Navbar
 */

const navBar = document.getElementById("navbar");
const navToggle = document.getElementById("navbar-toggle");
navToggle.addEventListener('click', ()=>{
    navBar.classList.toggle("active");
})

const windowWidth = ()=>{
    if (window.innerWidth < 992){
        navBar.classList.add("active");
    }else {
        navBar.classList.remove("active");  
    }
}



/**
 * @Function Calculator
 */
const re = /\s|\D/gmi;
const inputNum = document.getElementById("number");
inputNum.addEventListener('keyup', (e)=>{
    var val = inputNum.value;
    let res = val.replace(re, "");
    inputNum.value = res;
})

console.log(document.getElementById('coba').textContent);