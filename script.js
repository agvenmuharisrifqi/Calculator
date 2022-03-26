/**
 * @Function Navbar
 */

const navBar = document.getElementById("navbar");
const navToggle = document.getElementById("navbar-toggle");
navToggle.addEventListener('click', ()=>{
    navBar.classList.toggle("active");
})
window.addEventListener("resize", ()=>{
    if (window.innerWidth < 992){
        navBar.classList.add("active");
    }else {
        navBar.classList.remove("active");
    }
})