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
        images.forEach((img, index) => {
            if (index > 3) {
                img.setAttribute('loading', 'lazy');
            }
        });
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