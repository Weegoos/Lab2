

const country = localStorage.getItem('country'); 
console.log(country);
async function getNews() {
    const apiKey = '62258a344ca5405a8e27ca63ed9decef'; 
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayNews(data.articles);
    } 
    catch (error) {
        console.error('Error fetching news:', error);
    }
}

function displayNews(articles) {
const newsContainer = document.createElement('div');

articles.forEach(article => {
const articleElement = document.createElement('div');
articleElement.classList.add('articles')
articleElement.innerHTML = `
  <h2>${article.title}</h2>
  <p>${article.description}</p>
  <a href="${article.url}" target="_blank">Read more</a>
  <hr>
`

newsContainer.appendChild(articleElement);
});

document.body.appendChild(newsContainer);
}

window.onload = getNews;

fetch('https://restcountries.com/v3/all')
  .then(response => response.json())
  .then(data => {
    const selectedCountry = data.find(c => c.cca3 === country);
    const countryCodes = data.map(country => country.cca3);
    console.log('Коды стран:', countryCodes);
    if (selectedCountry) {
      const countryInfoContainer = document.createElement('div');
      countryInfoContainer.classList.add('country-info');
      const countryName = document.createElement('h1');
      countryName.textContent = selectedCountry.name.common;
      countryInfoContainer.appendChild(countryName);

      const capital = document.createElement('p');
      capital.textContent = `Capital: ${selectedCountry.capital}`;
      countryInfoContainer.appendChild(capital);
    
      const area = document.createElement('p');
      area.textContent = `Area: ${selectedCountry.area} square kilometers`;
      countryInfoContainer.appendChild(area);

      const population = document.createElement('p');
      population.textContent = `Population: ${selectedCountry.population}`;
      countryInfoContainer.appendChild(population);


      document.body.appendChild(countryInfoContainer);
    } else {
      console.log('Страна не найдена');
    }
  })
  .catch(error => {
    console.error('Ошибка при получении данных о странах:', error);
  });
