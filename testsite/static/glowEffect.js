document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.querySelector('.grid-container');
    
    setInterval(() => {
        const glowElement = document.createElement('div');
        glowElement.className = 'glow';
        const randomX = Math.floor(Math.random() * 10) * 50;
        const randomY = Math.floor(Math.random() * 10) * 50;
        glowElement.style.left = `${randomX}px`;
        glowElement.style.top = `${randomY}px`;

        gridContainer.appendChild(glowElement);

        setTimeout(() => {
            glowElement.style.opacity = 1;
        }, 50);

        setTimeout(() => {
            glowElement.style.opacity = 0;
            setTimeout(() => {
                gridContainer.removeChild(glowElement);
            }, 300);
        }, 500);

    }, 1000);
});
