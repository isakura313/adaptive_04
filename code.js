const nav_container = document.querySelector(".nav-container");
const big_nav = document.querySelector(".Big-nav")

nav_container.onclick = function(){
    this.classList.toggle("change")
    big_nav.classList.toggle("see")
}
