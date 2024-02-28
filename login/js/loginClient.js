let userInput = document.querySelector('.userName')


userInput.addEventListener('keyup', function (){
    localStorage.setItem('user', userInput.value)
})