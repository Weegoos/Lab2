let startButton = document.querySelectorAll('.startButton')
let forms = document.querySelector('.forms')
startButton.forEach(button => {
    button.addEventListener('click', function (){
        forms.classList.toggle('submitButtonDisplay')
    })
})
