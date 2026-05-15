document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
        });
    }

    // Number Counter Animation
    const counters = document.querySelectorAll('.counter-value');
    const speed = 200;

    const runCounter = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target;
                }
            };
            
            // Intersection Observer to trigger counter
            const observer = new IntersectionObserver((entries) => {
                if(entries[0].isIntersecting) {
                    updateCount();
                    observer.disconnect();
                }
            });
            observer.observe(counter);
        });
    };
    
    if (counters.length > 0) {
        runCounter();
    }

    // GSAP floating animations if GSAP is loaded
    if (typeof gsap !== 'undefined') {
        const floaters = document.querySelectorAll('.float-anim');
        floaters.forEach((el, i) => {
            gsap.to(el, {
                y: "-=20",
                duration: 2 + (i % 3),
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut"
            });
        });
        
        // Packet flow animation
        const packets = document.querySelectorAll('.packet');
        packets.forEach((el, i) => {
            gsap.to(el, {
                x: 300,
                opacity: 0,
                duration: 1.5 + (i * 0.2),
                repeat: -1,
                ease: "power1.inOut",
                delay: i * 0.5
            });
        });
    }
});
