let menuBox = document.querySelector('.menu');
let menuToggle = document.querySelector('#toggle-menu');

function showMenu(){
    menuBox.classList.add('visible');
    menuToggle.style.backgroundImage = 'url("static/img/close.svg")';

    setTimeout(function(){
        menuBox.classList.add('open');
    }, 100);
}

function hideMenu(){
    menuBox.classList.remove('open');
    menuToggle.style.backgroundImage = 'url("static/img/sanduba.svg")';

    setTimeout(function(){
        menuBox.classList.remove('visible');
    }, 500);
}

menuToggle.onclick = function() {
    if(menuBox.classList.contains('visible')){
        hideMenu();
    }else{
        showMenu();
    }
};
