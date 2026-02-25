document.addEventListener("DOMContentLoaded", () => {
    // 1. Entry Animation Logic
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');

    // Trigger animations after a short delay
    setTimeout(() => {
        // NIKO slides in from right
        firstName.style.transition = "all 1.2s cubic-bezier(0.22, 1, 0.36, 1)";
        firstName.style.transform = "translateX(0)";
        firstName.style.opacity = "1";

        // SALMINEN slides up from bottom
        setTimeout(() => {
            lastName.style.transition = "all 1.2s cubic-bezier(0.22, 1, 0.36, 1)";
            lastName.style.transform = "translateY(0)";
            lastName.style.opacity = "1";
        }, 400); // Slight delay for sequential feel
    }, 300);

    // 2. Vertical Progress Bar Logic
    window.onscroll = function() { updateProgress() };

    function updateProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById("myBar").style.height = scrolled + "%";
    }

    // 3. Optional: Subtle Parallax or Contrast handling can go here
});
