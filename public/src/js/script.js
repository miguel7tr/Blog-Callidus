// - Google Analytics -
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-WMH53GJ184');

// - Active Link in Footer -
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
