  
  console.log(777);
  let imgTitle = document.querySelector('.imgTitle')
  let pressBtn = document.querySelector('.pressBtn')

  pressBtn.addEventListener('click', function (){
    localStorage.setItem('imgTitle', imgTitle.value)
    window.location.reload()
  })

  const apiKey = '42601925-df210fda4f1b32a7710045eeb';
  const imgTitleLocal = localStorage.getItem('imgTitle')
  const searchQuery = imgTitleLocal; 
  
  const imageContainer = document.getElementById('container');

  fetch(`https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}`)
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      data.hits.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.webformatURL;
        imgElement.alt = image.tags;
        imgElement.title = image.pageURL;
        imageContainer.appendChild(imgElement);

        imgElement.addEventListener('click', () => {
            navigator.clipboard.writeText(image.pageURL)
              .then(() => {
                alert('Ссылка скопирована в буфер обмена');
              })
              .catch(err => {
                console.error('Не удалось скопировать ссылку:', err);
              });
          });
      });
    })
    .catch(error => {
      console.error('Произошла ошибка:', error);
    });