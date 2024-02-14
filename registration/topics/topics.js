let topics = document.querySelectorAll('.topics')
let topics_all = document.querySelector('.topics_all')
let array = [];
let continueButton = document.querySelector('.continue')

topics.forEach(element => {
   element.addEventListener('click', function (){
        if (!element.classList.contains('topics__click')) {
            element.classList.add('topics__click');
            array.push(element.innerHTML);
        } else {
            element.classList.remove('topics__click');
            let index = array.indexOf(element.innerHTML)

            if(index !== -1){
                array.splice(index, 1)
            }
        }
    });
    topics_all.addEventListener('click', function (){
        if (!element.classList.contains('topics__click')){
            element.classList.add('topics__click');

            array.push(element.innerHTML);

        }else {
            element.classList.remove('topics__click');

            let index = array.indexOf(element.innerHTML)
            if(index !== -1){
                array.splice(index, 1)
            }
        }
    })
})

continueButton.addEventListener('click',  function() {
    localStorage.setItem('topics', array)
    window.location.href = "http://localhost:3000/blogs"
})

let topics_storage = localStorage.getItem('topics')
console.log(topics_storage);
