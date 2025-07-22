// - Import & Export JSON - 
    function getArticleId() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
      }
  
// - Carregar o JSON e exibir o artigo -
async function loadArticle() {
    const id = getArticleId();
    const response = await fetch('src/js/articles.json');
    const articles = await response.json();
    let article;
    for(let i = 0; i < articles.length; i++){
        if(articles[i].id == id){
            article = articles[i];
            break;
        }
    }

    if (article) {
        document.title = article.pageTitle;
        document.getElementById('title').textContent = article.title;
        document.getElementById('image').setAttribute('src', "src/imgs/"+article.image);
        document.getElementById('image').setAttribute('alt', article.altImage);
        document.getElementById('fineLine').textContent = article.fineLine;
        document.getElementById('content').innerHTML = article.content;
    } else {
        document.getElementById('content').textContent = 'Artigo não encontrado. Sinto muito pelo inconveniente.';
    }
}

window.onload = loadArticle;