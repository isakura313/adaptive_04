// const nav_container = document.querySelector(".nav-container");
// const big_nav = document.querySelector(".Big-nav")
// const wrapper = document.querySelector(".wrapper"); // получаем первый элемент
//
// let section_p = document.querySelector(".wrapper_text") // получаем второй элемент
//
// nav_container.onclick = function(){
//     this.classList.toggle("change") // старый код для бургера
//     big_nav.classList.toggle("see")
// }
//
// if (window.pageYOffset > 900){
//     alert("ага!  Долистал почти до низу!") // просто пример отступа на 900
// }
//
//
// var full_height = document.documentElement.clientHeight;
// // мы пользуемся clientHeight для определения высоты всей страницы
// // мы пользуемся pageYOffset для получения отступа прокрутки страницы
//
//
// first_elem_height = wrapper.offsetHeight; // просто перезаписываем размер элемента в переменную
//
// window.onscroll = () =>{
//     console.log(document.documentElement.clientHeight) // показывают всю высоту нашего элемента
//
//     if  (window.pageYOffset > first_elem_height){
//         console.log("ага, долистал до следующего элемента")
//         //показываем что прокрутили до следующего элемента
//         //тут могла быть ваша анимация
//     }
// }



$('.main-slider').slick({
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
});

$('.arts_popup').magnificPopup({delegate:'a',
    type:'image',
    gallery:{
        enabled:true,
        navigateByImgClick: true
    },
    removalDelay: 300,

    mainClass:'mfp-fade'
});