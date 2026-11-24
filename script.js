document.addEventListener('DOMContentLoaded', () => {
    // Reveal elements on scroll
    const sections = document.querySelectorAll('.section');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('revealed');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0.7';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        section.style.transform = 'translateY(20px)';
        revealOnScroll.observe(section);
    });

    // Add revealed class styles dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .section.revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Subtle parallax effect on stickers and polaroids
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        const stickers = document.querySelectorAll('.sticker');
        const polaroids = document.querySelectorAll('.polaroid');

        stickers.forEach(sticker => {
            // Only apply to visible stickers
            const rect = sticker.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 30; // parallax speed
                const currentTransform = sticker.style.transform || window.getComputedStyle(sticker).transform;
                
                // Extract rotation if exists
                let rotate = '0deg';
                if (sticker.classList.contains('whale-tr')) rotate = '10deg';
                if (sticker.classList.contains('bear-sticker')) rotate = '15deg';
                if (sticker.classList.contains('heart-br')) rotate = '-15deg';
                if (sticker.classList.contains('fish-tl')) rotate = '-15deg';
                if (sticker.classList.contains('cat-sticker')) rotate = '10deg';
                
                sticker.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px) rotate(${rotate})`;
            }
        });

        polaroids.forEach(polaroid => {
            const rect = polaroid.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 15;
                
                let rotate = '0deg';
                if (polaroid.classList.contains('tilt-left')) rotate = '-6deg';
                if (polaroid.classList.contains('tilt-right')) rotate = '5deg';
                
                polaroid.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px) rotate(${rotate})`;
            }
        });
    });
});
