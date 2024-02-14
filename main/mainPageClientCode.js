// header
window.addEventListener('scroll', function (){
    let scrollTop = window.scrollY
    let headerSection = document.querySelector('.header');
    if(scrollTop === 0){
        headerSection.classList.add('headerRemoveScroll')
        headerSection.classList.remove('headerScroll')


    }else {
        headerSection.classList.add('headerScroll')
        headerSection.classList.remove('headerRemoveScroll')

    }
})

document.querySelector('.singin__button').addEventListener('click', function (){
    window.location.href = "http://localhost:3000/registration"
})
