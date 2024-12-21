document.addEventListener('DOMContentLoaded', () => {
    // Manejo del video de fondo
    const video = document.getElementById('heroVideo');
    const playPromise = video.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
            // Video se está reproduciendo
        })
        .catch(error => {
            console.log("Auto-play was prevented");
            // Mostrar un botón de play si es necesario
        });
    }

    // Menú de navegación
    const exploreButton = document.querySelector('.nav-explore');
    const searchInput = document.querySelector('.search-bar input');
    const navLinks = document.querySelector('.nav-links');

    exploreButton.addEventListener('click', () => {
        const dropdownMenu = document.createElement('div');
        dropdownMenu.classList.add('dropdown-menu');
        // Agregar opciones del menú
        dropdownMenu.innerHTML = `
            <a href="#cursos">Cursos Populares</a>
            <a href="#certificados">Certificados</a>
            <a href="#carreras">Carreras</a>
            <a href="#empresas">Para Empresas</a>
        `;
        
        // Posicionar y mostrar el menú
        const buttonRect = exploreButton.getBoundingClientRect();
        dropdownMenu.style.top = buttonRect.bottom + 'px';
        dropdownMenu.style.left = buttonRect.left + 'px';
        
        document.body.appendChild(dropdownMenu);

        // Cerrar el menú al hacer clic fuera
        const closeDropdown = (e) => {
            if (!dropdownMenu.contains(e.target) && e.target !== exploreButton) {
                dropdownMenu.remove();
                document.removeEventListener('click', closeDropdown);
            }
        };

        setTimeout(() => {
            document.addEventListener('click', closeDropdown);
        }, 0);
    });

    // Animación de números en estadísticas
    const statsNumbers = document.querySelectorAll('.stat-number');
    
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            element.textContent = currentValue.toLocaleString() + '+';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Observador de Intersección para activar animaciones
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const finalValue = parseInt(element.textContent);
                animateValue(element, 0, finalValue, 2000);
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.5
    });

    statsNumbers.forEach(number => {
        observer.observe(number);
    });

    // Manejo del formulario de búsqueda
    const searchForm = document.querySelector('.search-bar');
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            // Implementar lógica de búsqueda
            console.log(`Búsqueda realizada: ${searchTerm}`);
        }
    });

    // Lazy loading para imágenes
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});