// - Filter -
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



// - Search with Filter Validation -
    function filterAndSearch() {
        const category = document.querySelector(".filter-item.active-filter").classList[1] || "all";
        const searchValue = formatString(document.getElementById("search").value);

        const items = document.querySelectorAll(".post-box");
        const noResults = document.getElementById("no_results");
        let hasResults = false;

        for(let i = 0; i <items.length; i++) {
            const matchesCategory = category === "all" || items[i].classList.contains(category);
            const itemTitle = items[i].querySelector(".post-title").textContent;
            const itemDescription = items[i].querySelector(".post-description").textContent;
            const matchesSearch = searchValue === "" || 
                formatString(itemTitle).indexOf(searchValue) !== -1 || 
                formatString(itemDescription).indexOf(searchValue) !== -1;

            if (matchesCategory && matchesSearch) {
                items[i].classList.remove("hide");
                hasResults = true;
            } else {
                items[i].classList.add("hide");
            }
        };

        noResults.style.display = hasResults ? "none" : "block";
    }

// - Função para formatar strings: remove espaços em branco, transforma em lowercase e remove acentos -
    function formatString(value) {
    return value
            .trim()
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");
    }


// - Loading Lazy -
    window.addEventListener('DOMContentLoaded', () => {
        const images = document.querySelectorAll('img');
        for(let i = 0; i < images.length; i++) {
            if (i > 5) {
                images[i].setAttribute('loading', 'lazy');
            }
        };
    });

// - Cookies -
    window.onload = () => {
        const popup = document.getElementById("cookie-popup");
        if (!popup) return;

        const aceitou = localStorage.getItem("cookies-aceitos") === "true";

        if (aceitou) {
            popup.classList.add("hide");
        } else {
            popup.classList.remove("hide");

            popup.querySelector("button").onclick = () => {
                localStorage.setItem("cookies-aceitos", "true");
                popup.classList.add("hide");
            };
        }
    };

// - Create Articles -
    fetch("src/js/articles.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao carregar artigos");
        }
        return response.json();
    })
    .then(articles => {
        const section = document.getElementById("posts-section");
        for(let i = 0; i < articles.length; i++) {
            const figure = document.createElement("figure");
            figure.className = `post-box ${articles[i].type}`;
            figure.innerHTML = `
            <!-- Post Box ${i+1} -->
                <img src="src/imgs/${articles[i].image}" alt="${articles[i].altImage}" class="post-img">
                <figcaption>
                    <h2 class="category">${articles[i].category}</h2>
                    <a href="post-page.html?id=${articles[i].id}" class="post-title">
                        ${articles[i].title}
                    </a>
                    <span class="post-date">${articles[i].date}</span>
                    <p class="post-description">${articles[i].description}</p>
                    <!-- Profile -->
                    <div class="profile">
                        <img src="src/imgs/${articles[i].profileImg}" alt="Foto do Autor" class="profile-img">
                        <span class="profile-name">Miguel T. Rodrigues</span>
                    </div>
                </figcaption>
            `;
            section.appendChild(figure);
        };
    })
    .catch(error => {
        console.error("Erro ao carregar ou processar os artigos:", error);
    });