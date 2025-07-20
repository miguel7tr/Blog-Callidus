// - Import & Export JSON - 
    function getArticleId() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
      }
  
// - Carregar o JSON e exibir o artigo -
async function loadArticle() {
    const id = getArticleId();
    const response = await fetch('/src/js/articles.json');
    const articles = await response.json();
    const article = articles.find(a => a.id == id);

    if (article) {
        document.getElementById('title').textContent = article.title;
        document.getElementById('content').innerHTML = article.content;
        document.getElementById('image').setAttribute('src', article.image);
        document.getElementById('image').setAttribute('alt', article.title);
        document.getElementById('fineLine').textContent = article.fineLine;
        document.getElementById('pageTitle').textContent = article.pageTitle;
    } else {
        document.getElementById('content').textContent = 'Artigo não encontrado. Sinto muito pelo inconveniente.';
    }
}

window.onload = loadArticle;