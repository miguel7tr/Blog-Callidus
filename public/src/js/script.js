// - Filter Post - 
function filterElements(category) {
    // active filter
    const filters = document.querySelectorAll(".filter-item");
    filters.forEach(filter => {
        filter.classList.remove("active-filter");
        if (filter.classList.contains(category)) {
            filter.classList.add("active-filter");
        }
    });

    // validação de critérios
    filterAndSearch();
}

// - Active Text Footer -
    const links = document.querySelectorAll('.links');
    const paragrafos = document.querySelectorAll('.footer-text');

    // adiciona evento de clique a cada link
    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            links.forEach(l => l.classList.remove('active-link'));
            this.classList.add('active-link');

            // Paragrafos
            paragrafos.forEach(p => p.style.display = 'none');

            const targetId = this.getAttribute('href').substring(1);
            const targetParagrafo = document.getElementById(targetId);
            if (targetParagrafo) {
                targetParagrafo.style.display = 'block';
            }
        });
    });

// - Email -
    const inputAssunto = document.getElementById('assunto');
    const textareaBody = document.getElementById('body');
    const linkEmail = document.getElementById('submit-email');

    linkEmail.addEventListener('click', (e) => {
        e.preventDefault();
        const assunto = 'Blog Callidus';
        const body = textareaBody.value;
        const email = 'blogcallidus@gmail.com';
        const url = `mailto:${email}?subject=${assunto}&body=${body}`;
        window.location.href = url;
    });

// - Search With Filter Validation -
    function filterAndSearch() {
        const category = document.querySelector(".filter-item.active-filter").classList[1] || "all";
        const searchValue = formatString(document.getElementById("search").value);

        const items = document.querySelectorAll(".post-box");
        const noResults = document.getElementById("no_results");
        let hasResults = false;

        items.forEach(item => {
            const matchesCategory = category === "all" || item.classList.contains(category);
            const itemTitle = item.querySelector(".post-title").textContent;
            const itemDescription = item.querySelector(".post-description").textContent;
            const matchesSearch = searchValue === "" || 
                formatString(itemTitle).indexOf(searchValue) !== -1 || 
                formatString(itemDescription).indexOf(searchValue) !== -1;

            if (matchesCategory && matchesSearch) {
                item.classList.remove("hide");
                hasResults = true;
            } else {
                item.classList.add("hide");
            }
        });

        noResults.style.display = hasResults ? "none" : "block";
    }

// Função para formatar strings: remove espaços em branco, transforma em lowercase e remove acentos
    function formatString(value) {
    return value
            .trim()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }


// - Import & Export JSON - 
    function getArticleId() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
      }
  
// Carregar o JSON e exibir o artigo
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
