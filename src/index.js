import './sass/main.scss';

const news = document.querySelector('.news-wrap');
const moreBtn = document.querySelector('.more-btn');
const headerListEl = document.querySelector('.header-list');

let pageCount = 1;
let category = 'general';
let baseUrl = `https://newsapi.org/v2/top-headlines?country=ua&category=${category}&pageSize=6&page=${pageCount}&apiKey=58507d4f9e44467cac1401fbd4d3c576`;

fetchNews(baseUrl)
  .then(articleMarkup)
  .catch(err => console.log(err));

function fetchNews(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
}

function articleMarkup(data) {
  const articles = data.articles;
  const markup = articles
    .map(article => {
      //   console.log(article.urlToImage);
      if (article.urlToImage === null) {
        article.urlToImage =
          'https://www.akc.org/wp-content/uploads/2017/11/Rottweiler-puppy-fetching-a-toy-in-the-grass.jpeg';
      }
      return `
    <div class="news-card">
  <p class="news-author"><a href="${article.url}" target="_blank">${article.author}</a></p>
  <img src="${article.urlToImage}" alt="${article.author}" />
  <div class="news-text">
    <h2 class="news-title">${article.title}</h2>
    <p class="news-descr">${article.description}
    <a href="${article.url}" class="news-link" target="_blank">Читати далі</a>
    </p>
  </div>
</div>`;
    })
    .join('');
  // console.log(markup);
  news.insertAdjacentHTML('beforeend', markup);
}

function onMoreBtnClick() {
  pageCount += 1;
  let baseUrl = `https://newsapi.org/v2/top-headlines?country=ua&category=${category}&pageSize=6&page=${pageCount}&apiKey=58507d4f9e44467cac1401fbd4d3c576`;
  //   console.log(baseUrl);
  fetchNews(baseUrl).then(articleMarkup);
}

function onHeaderListClick(event) {
  if (event.target.nodeName !== 'LI') return;
  // console.log(category);
  category = event.target.dataset.value;
  baseUrl = `https://newsapi.org/v2/top-headlines?country=ua&category=${category}&pageSize=6&page=${pageCount}&apiKey=58507d4f9e44467cac1401fbd4d3c576`;
  console.log(baseUrl);
  news.innerHTML = '';
  fetchNews(baseUrl).then(articleMarkup);
}
moreBtn.addEventListener('click', onMoreBtnClick);
headerListEl.addEventListener('click', onHeaderListClick);
console.log(category);

//==================================================
const images = [
  'https://randompicturegenerator.com/img/dog-generator/g9281b8866ef1125449a12d7a4c70cf447927acc7b311c089f7b516b4899395da54f384bd02a22e766263bbeba4104683_640.jpg',
  'https://randompicturegenerator.com/img/dog-generator/g3126e61c75999e90a549252915c20f712abc3a1b50686b2b58622b3ec78105aa8a65aae0aef8d956c3b744c1cd50c849_640.jpg',
  'https://randompicturegenerator.com/img/dog-generator/g69060b1857cf2f0e7ed5119947c403947404e6857fb4aa85c377e7db82da0e834e500972187f8e565ac1a75bf64111ef_640.jpg',
  'https://randompicturegenerator.com/img/dog-generator/gb066a2042cffd0262bd779a54f67ea2f585951e7ca67f0846441c2e9abfc293a197518673ce1e6d1027484890d704476_640.jpg',
  'https://randompicturegenerator.com/img/dog-generator/gca6a8e6d4bece74cfd92dc632694b4462bf8aafc1364e09ceb9fc5825d66d3cb7511248a7e5cc3839ca4aedf545b90a1_640.jpg',
  'https://randompicturegenerator.com/img/dog-generator/g3fbc0540f9e605b32bf473cd0a29b53771097808a97c2f92d6328874738e0235eb75a2720aa9ae985887c8cd282ee5fa_640.jpg',
];
const heroEl = document.querySelector('.hero');
heroEl.style.backgroundRepeat = 'no-repeat';
heroEl.style.backgroundPosition = 'center';
heroEl.style.backgroundSize = 'contain';
heroEl.style.backgroundImage = `url(${images[0]})`;

function getImage(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const img = setInterval(() => {
  const img = getImage(images);
  // console.log(img);
  heroEl.style.backgroundImage = `url(${img})`;
}, 5000);
