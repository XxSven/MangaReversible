window.addEventListener('load', init);

function init() {
    [...document.getElementsByClassName('flip-banner-button')].forEach((button)=>{
        button.addEventListener('click', (e)=>{
            var headerNode = document.getElementsByClassName('rotating-header')[0];
            if(headerNode.classList.contains('rotate')){
                headerNode.classList.remove('rotate');
            } else {
                headerNode.classList.add('rotate');
            }
        });
    });
}