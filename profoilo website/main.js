const header = document.querySelector("header");

window.addEventListener("scroll", function(){
    header.classList.toggle("sticky", window.scrollY > 120);
});

// var typed = new Typed(".auto-type", {
//     strings: [ "Shopade Omolara"," a Programmer",  "a Front-End Developer", " a Back-End Developer"," a Ui/Ux Designer"],
//     typeSpeed: 150,
//     backSpeed: 150,
//     loop: true
// });