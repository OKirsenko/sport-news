import './sass/main.scss';

const news = document.querySelector('.news-wrap');

const pageCount = 1;
const baseUrl =
  'https://newsapi.org/v2/top-headlines?' +
  'country=ua&' +
  'category=sports&' +
  'pageSize=20&' +
  `page=${pageCount}&` +
  'apiKey=58507d4f9e44467cac1401fbd4d3c576';

function fetchNews(url) {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

fetchNews(baseUrl).then(articleMarkup);

function articleMarkup(data) {
  const articles = data.articles;
  const markup = articles
    .map(article => {
      console.log(article);
      return `
    <div class="news-card">
  <p class="news-author"><a href="${article.url}">${article.author}</a></p>
  <img src="${article.urlToImage}" alt="${article.author}" />
  <div class="news-text">
    <h2 class="news-title">${article.title}</h2>
    <p class="news-descr">${article.description}
    <a href="${article.url}" class="news-link">Читати далі</a>
    </p>
  </div>
</div>`;
    })
    .join('');
  console.log(markup);
  news.innerHTML = markup;
}
