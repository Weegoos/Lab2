document.addEventListener('DOMContentLoaded', function () {

    let savedUserName = localStorage.getItem('user');

    let user_nameInput = document.querySelector('.user_nameInput');
    user_nameInput.value = savedUserName;
    user_nameInput.addEventListener('input', function (event) {
       
        if (user_nameInput.value !== savedUserName) {
         
            user_nameInput.value = savedUserName;
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const headline = document.querySelector('.headline');
    const contentTextArea = document.querySelector('.contentTextArea');

    headline.addEventListener('input', function() {
        const headlineHeight = headline.scrollHeight;

        contentTextArea.style.marginTop = (headlineHeight - 60) +  'px';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const textareas = document.querySelectorAll('textarea');

    textareas.forEach(function(textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    });
});

window.addEventListener('DOMContentLoaded', function() {
    const wrapper = document.querySelector('.wrapper');

    function toggleScrollbar() {
        if (wrapper.scrollHeight > wrapper.clientHeight) {
            wrapper.style.overflowY = 'scroll';
        } else {
            wrapper.style.overflowY = 'hidden';
        }
    }

    toggleScrollbar(); // Проверка при загрузке страницы

    wrapper.addEventListener('input', toggleScrollbar); // Проверка при изменении содержимого
});

new Vue({
    el: '.container',
    data: {
        headlineStorage: '',
        contentStorage: '',
        fontInput: ''
    },
    methods: {
        headline:  function (){
            localStorage.setItem('saveHeadline',this.headlineStorage)
        },
        content: function (){
            localStorage.setItem('saveContent',this.contentStorage)

        },
        saveFont: function (){
            localStorage.setItem('font', this.fontInput)
            location.reload()
        }
    }
})
function recoverHeadline() {
    let headline = document.querySelector('.headline');
    let blogTextArea = document.getElementById('blogTextArea');

    if (headline && blogTextArea) {
        let saveHeadline = localStorage.getItem('saveHeadline');
        let saveContent = localStorage.getItem('saveContent');


        if (saveHeadline !== null || saveContent !== null) {
            headline.value = saveHeadline || '';
            blogTextArea.value = saveContent || '';
        }

        let submitButton = document.querySelector('.submitButton');


        if (submitButton) {
            submitButton.addEventListener('click', function() {
               
                localStorage.removeItem('saveHeadline');
                localStorage.removeItem('saveContent');
            });
        }

        // Если пользователь не нажал на кнопку, сохраняем данные в локальное хранилище при изменении содержимого

            // [headline, blogTextArea].forEach(function(element) {
            //     element.addEventListener('input', function() {
            //         localStorage.setItem('saveHeadline', headline.value);
            //         localStorage.setItem('saveContent', blogTextArea.value);
            //         });
            //     });
            
        }
    
}

document.addEventListener('DOMContentLoaded', recoverHeadline);

function createFontsDatalist(){
    let fonts = document.getElementById('fonts')
    array.forEach(element =>{
        let option = document.createElement('option')
        option.append(element)
    fonts.appendChild(option)
    })
}

createFontsDatalist()

function setFontFamily(){
    let font = localStorage.getItem('font')
    let headline = document.querySelector('.headline')
    let blogTextArea = document.getElementById('blogTextArea')

    headline.style.fontFamily = font
    blogTextArea.style.fontFamily = font
    defineFonts(font)
}

setFontFamily()

function defineFonts(fontsLocal){
    let fontsInput = document.querySelector('.fontsInput')
    let fontsLength = array.length
    if (fontsLocal.length > 0){
        fontsInput.placeholder = fontsLocal
    }else  {
        fontsInput.placeholder = `Выберите шрифт (${fontsLength})`
    }
}