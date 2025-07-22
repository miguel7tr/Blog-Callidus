// - Google Analytics -
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-WMH53GJ184');

// - Active Link in Footer -
    const links = document.querySelectorAll('.links');
    const paragrafos = document.querySelectorAll('.footer-text');

    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function (event) {
            event.preventDefault();

            for (let j = 0; j < links.length; j++) {
                links[j].classList.remove('active-link')
            }
            this.classList.add('active-link');

            // Paragrafos
            for (let j = 0; j < paragrafos.length; j++) {
                paragrafos[j].style.display = 'none';
            }

            const targetId = this.getAttribute('href').substring(1);
            const targetParagrafo = document.getElementById(targetId);
            if (targetParagrafo) {
                targetParagrafo.style.display = 'block';
            }
        });
    }

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
