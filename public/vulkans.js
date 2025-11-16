window.initVulkans = function() {
  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  const Lenis = window.Lenis;

  // Initialize Lenis smooth scroll
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  gsap.registerPlugin(ScrollTrigger);
  lenis.on('scroll', ScrollTrigger.update);

  const canvas = document.getElementById('meshCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let time = 0;

    function drawCrystalBackground() {
      time += 1;
      ctx.fillStyle = '#0C0017';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Animated crystal clusters
      for (let i = 0; i < 6; i++) {
        const angle = (time * 0.0003 + (i / 6) * Math.PI * 2);
        const distance = 300 + Math.sin(time * 0.0005 + i) * 100;
        
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;

        // Crystal gradient
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 250);
        gradient.addColorStop(0, `rgba(160, 32, 240, ${0.3 + Math.sin(time * 0.0008 + i) * 0.2})`);
        gradient.addColorStop(0.5, `rgba(76, 0, 136, ${0.15 + Math.sin(time * 0.0008 + i + 1) * 0.1})`);
        gradient.addColorStop(1, 'rgba(160, 32, 240, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(x - 250, y - 250, 500, 500);
      }

      // Geometric refraction lines
      ctx.strokeStyle = 'rgba(160, 32, 240, 0.15)';
      ctx.lineWidth = 1.5;
      
      for (let i = 0; i < 8; i++) {
        const angle = (time * 0.0002 + (i / 8) * Math.PI * 2);
        const startX = centerX + Math.cos(angle) * 200;
        const startY = centerY + Math.sin(angle) * 200;
        const endX = centerX + Math.cos(angle) * 800;
        const endY = centerY + Math.sin(angle) * 800;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      // Animated particles for crystal dust
      for (let i = 0; i < 20; i++) {
        const x = (Math.sin(time * 0.0004 + i * 0.5) * 0.4 + 0.5) * canvas.width;
        const y = (Math.cos(time * 0.0003 + i * 0.7) * 0.4 + 0.5) * canvas.height;
        
        ctx.fillStyle = `rgba(160, 32, 240, ${0.2 + Math.sin(time * 0.001 + i) * 0.2})`;
        ctx.fillRect(x - 1, y - 1, 2, 2);
      }

      requestAnimationFrame(drawCrystalBackground);
    }

    drawCrystalBackground();

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  const preloader = document.getElementById('preloader');
  const mainContent = document.getElementById('main-content');
  const progress = document.querySelector('.loading-progress');
  const percentText = document.querySelector('.loading-percent');

  let currentProgress = 0;
  const preloaderTimeline = gsap.timeline();

  const progressInterval = setInterval(() => {
    if (currentProgress < 90) {
      currentProgress += Math.random() * 35;
      gsap.to(progress, {
        width: Math.min(currentProgress, 90) + '%',
        duration: 0.4,
        ease: 'power2.out',
      });
      if (percentText) {
        percentText.textContent = Math.floor(Math.min(currentProgress, 90)) + '%';
      }
    }
  }, 250);

  setTimeout(() => {
    clearInterval(progressInterval);
    currentProgress = 100;
    gsap.to(progress, {
      width: '100%',
      duration: 0.5,
      ease: 'power2.out',
    });
    if (percentText) {
      percentText.textContent = '100%';
    }

    gsap.to(preloader, {
      opacity: 0,
      duration: 0.8,
      delay: 0.4,
      ease: 'power2.inOut',
      onComplete: () => {
        preloader.style.display = 'none';
      },
    });

    gsap.to(mainContent, {
      opacity: 1,
      duration: 1,
      ease: 'power2.inOut',
    });
  }, 2200);

  const heroTopText = document.querySelector('.hero-top-text');
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const ctaButtons = document.querySelectorAll('.cta-btn');

  const heroTl = gsap.timeline({ delay: 2.4 });

  heroTl.fromTo(
    heroTopText,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
    0
  );

  heroTl.fromTo(
    heroTitle,
    { opacity: 0, y: 50, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'back.out' },
    0.2
  );

  heroTl.fromTo(
    heroSubtitle,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
    0.4
  );

  heroTl.fromTo(
    ctaButtons,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
    0.6
  );

  const aboutCards = document.querySelectorAll('.about-card');
  aboutCards.forEach((card, index) => {
    gsap.fromTo(
      card,
      { opacity: 0, y: 60, scale: 0.85, rotationX: 15 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 1,
        delay: index * 0.2,
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          end: 'top 15%',
          scrub: 0.5,
        },
        ease: 'back.out',
      }
    );
  });

  const playerCards = document.querySelectorAll('.player-card');
  playerCards.forEach((card, index) => {
    gsap.fromTo(
      card,
      { opacity: 0, scale: 0.4, y: 50, rotationZ: -5 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        rotationZ: 0,
        duration: 0.8,
        delay: (index % 12) * 0.08,
        scrollTrigger: {
          trigger: card.closest('.tier-group'),
          start: 'top 75%',
          scrub: 0.3,
        },
        ease: 'back.out',
      }
    );
  });

  // Form animation
  const formGroups = document.querySelectorAll('.form-group');
  gsap.fromTo(
    formGroups,
    { opacity: 0, y: 25, x: -15 },
    {
      opacity: 1,
      y: 0,
      x: 0,
      duration: 0.7,
      stagger: 0.12,
      scrollTrigger: {
        trigger: '.apply-form',
        start: 'top 80%',
        scrub: 0.2,
      },
      ease: 'back.out',
    }
  );

  // Form submission
  const form = document.getElementById('applicationForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const successMsg = document.createElement('div');
      successMsg.innerHTML =
        '<p style="color: #A020F0; font-weight: 600; text-align: center;">Application submitted successfully! Check your Discord for next steps.</p>';
      successMsg.style.padding = '1rem';
      successMsg.style.marginBottom = '1rem';
      successMsg.style.background = 'rgba(160, 32, 240, 0.1)';
      successMsg.style.borderRadius = '0.5rem';
      successMsg.style.border = '1px solid rgba(160, 32, 240, 0.2)';

      form.insertBefore(successMsg, form.firstChild);

      gsap.fromTo(
        successMsg,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'back.out' }
      );

      form.reset();

      setTimeout(() => {
        gsap.to(successMsg, {
          opacity: 0,
          y: -20,
          duration: 0.5,
          onComplete: () => {
            successMsg.remove();
          },
        });
      }, 4000);
    });
  }
};


// =============================
// LAVA EFFECT FUNCTION
// =============================
function triggerLavaEffect() {
  const lava = document.getElementById("lava-overlay");

  if (!lava) {
    console.warn("⚠️ Lava overlay not found in DOM!");
    return;
  }

  // Add class to show + animate lava
  lava.classList.add("lava-active");

  // Remove after animation duration
  setTimeout(() => {
    lava.classList.remove("lava-active");
  }, 1500);
}



// =============================
// FORM SUBMISSION HANDLER
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  if (!form) {
    console.warn("⚠️ Form not found!");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // remove if actually submitting backend

    // 1. Show lava
    triggerLavaEffect();

    // 2. Scroll to roster AFTER animation starts
    setTimeout(() => {
      const rosterSection = document.getElementById("roster");

      if (!rosterSection) {
        console.warn("⚠️ Roster section not found!");
        return;
      }

      rosterSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 250); // 0.25 sec delay so lava appears first
  });
});
