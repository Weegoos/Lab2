let inputs = document.querySelectorAll('input')
let timeout;

inputs.forEach(element => {
    let status = document.querySelector('p')
    element.addEventListener('keyup', function (){
        status.innerHTML = "The user is typing..."
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            status.innerHTML = "The user stopped printing"
        }, 1000); 
    });

    element.addEventListener('change', function (){
        clearTimeout(timeout);
        status.innerHTML = "The data has been changed"
    });
});

let submitBtn = document.querySelector('.submitBtn')
let country = document.querySelector('.country')
submitBtn.addEventListener('click', function (){
    if (country.value.length !== 0){
        localStorage.setItem('country', country.value)
    }
})