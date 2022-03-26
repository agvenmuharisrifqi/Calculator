/**
 * @Function Navbar
 */

const navBar = document.getElementById("navbar");
const navToggle = document.getElementById("navbar-toggle");
navToggle.addEventListener('click', ()=>{
    navBar.classList.toggle("active");
})

function inactiveNavbar(){
    if (window.innerWidth < 992){
        navBar.classList.add("active");
    }
}