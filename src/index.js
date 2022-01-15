import './sass/main.scss';

const news = document.querySelector('.news-wrap');
const moreBtn = document.querySelector('.more-btn');
const headerListEl = document.querySelector('.header-list');

let pageCount = 1;
let category = 'general';
let baseUrl = `https://newsapi.org/v2/top-headlines?country=ua&category=${category}&pageSize=3&page=${pageCount}&apiKey=58507d4f9e44467cac1401fbd4d3c576`;

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
  let baseUrl = `https://newsapi.org/v2/top-headlines?country=ua&category=${category}&pageSize=3&page=${pageCount}&apiKey=58507d4f9e44467cac1401fbd4d3c576`;
  //   console.log(baseUrl);
  fetchNews(baseUrl).then(articleMarkup);
}

function onHeaderListClick(event) {
  if (event.target.nodeName !== 'LI') return;
  // console.log(category);
  category = event.target.dataset.value;
  baseUrl = `https://newsapi.org/v2/top-headlines?country=ua&category=${category}&pageSize=3&page=${pageCount}&apiKey=58507d4f9e44467cac1401fbd4d3c576`;
  console.log(baseUrl);
  news.innerHTML = '';
  fetchNews(baseUrl).then(articleMarkup);
}
moreBtn.addEventListener('click', onMoreBtnClick);
headerListEl.addEventListener('click', onHeaderListClick);
console.log(category);
