/**
 * @Package Website Kalkulator
 * @Function Navbar And Main Animation
 */

const nav = document.getElementById("navbar");
const navToggle = document.getElementById("navbar-toggle");
const navBar = document.getElementById("navbar-list");
const navItem = navBar.getElementsByClassName("navbar__item");
const contentBar = document.getElementById("main-content");
const contentItem = contentBar.getElementsByClassName("content__item");

navToggle.addEventListener('click', ()=>{
    nav.classList.toggle("active");
})

const windowWidth = ()=>{
    if (window.innerWidth < 992){
        nav.classList.add("active");
    }else {
        nav.classList.remove("active");  
    }
}

for (let item = 0; item < navItem.length; item++) {
    navItem[item].addEventListener("click", function() {
        let currentNav = navBar.querySelector(".active");
        let currentContent = contentBar.querySelector(".active");
        currentNav.className = currentNav.className.replace(" active", "");
        currentContent.className = currentContent.className.replace(" active", "");
        navItem[item].classList.add("active");
        contentItem[item].classList.add("active");
    });
}