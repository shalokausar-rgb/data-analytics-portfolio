// MINIMAL VERSION - Just copy and paste

function startCountingAnimation() {
    const counters = [
        { id: 'projectsCounter', target: 127 },
        { id: 'clientsCounter', target: 89 },
        { id: 'experienceCounter', target: 12 },
        { id: 'analysisCounter', target: 99 }
    ];
    
    const duration = 2000;
    const delay = 300;
    
    counters.forEach((counter, index) => {
        const element = document.getElementById(counter.id);
        if (!element) return;
        
        setTimeout(() => {
            let start = 0;
            const increment = counter.target / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= counter.target) {
                    current = counter.target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current);
            }, 16);
        }, index * delay);
    });
}

// Start on page load
window.addEventListener('load', startCountingAnimation);

// Or start when scrolled into view
function startOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            startCountingAnimation();
            observer.unobserve(entries[0].target);
        }
    });
    
    const statsSection = document.querySelector('.stats-container');
    if (statsSection) observer.observe(statsSection);
}

document.addEventListener('DOMContentLoaded', startOnScroll);