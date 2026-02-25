document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".content-wrapper");
    const title = document.querySelector("#hero-title");

    // 1. Title Opening Animation (Letter by Letter)
    const text = title.innerText;
    title.innerHTML = "";
    text.split("").forEach((char, i) => {
        const span = document.createElement("span");
        span.innerText = char === " " ? "\u00A0" : char;
        title.appendChild(span);
        setTimeout(() => span.classList.add("active"), i * 100);
    });

    // 2. Horizontal Scroll Logic
    let scrollPos = 0;
    let targetPos = 0;
    const ease = 0.075;

    window.addEventListener("wheel", (e) => {
        targetPos += e.deltaY;
        // Clamp scroll within bounds
        const maxScroll = container.offsetWidth - window.innerWidth;
        targetPos = Math.max(0, Math.min(targetPos, maxScroll));
    });

    function update() {
        scrollPos += (targetPos - scrollPos) * ease;
        container.style.transform = `translateX(-${scrollPos}px)`;
        
        requestAnimationFrame(update);
    }
    update();

    // 3. Dynamic Text Color Contrast
    // Note: To work locally, images must be served via server (like GitHub Pages) 
    // to avoid CORS issues when reading pixel data.
    const projectImages = document.querySelectorAll('.project-img');
    
    projectImages.forEach(img => {
        img.addEventListener('load', () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 1; 
            canvas.height = 1;
            
            // Draw a tiny version of the image to get the average color
            ctx.drawImage(img, 0, 0, 1, 1);
            const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
            
            // Calculate Complementary or Contrast (YIQ formula)
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            const textColor = (brightness > 128) ? 'black' : 'white';
            
            // Apply to meta text
            const metaTexts = img.parentElement.querySelectorAll('.dynamic-text');
            metaTexts.forEach(txt => txt.style.color = textColor);
        });
    });
});
