// Import des polices
import '@fontsource/inter/variable.css';
import '@fontsource/lora/400.css';
import '@fontsource/lora/700.css';
import '@fontsource/playfair-display/400.css';
import '@fontsource/playfair-display/700.css';

// Script interactif BricoleTout (header, menu, animations, accessibilité)

// Animation ombre dynamique sur le header
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header?.classList.add('shadow-lg');
  } else {
    header?.classList.remove('shadow-lg');
  }
});

// Animation menu burger mobile + accessibilité
const burger = document.querySelector('button[aria-label="Ouvrir le menu de navigation"]');
const nav = document.querySelector('nav');
if (burger && nav) {
  burger.addEventListener('click', () => {
    document.body.classList.toggle('js-menu-open');
    nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');
    // Scroll lock
    if (nav.classList.contains('open')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
  (burger as HTMLButtonElement).addEventListener('keyup', (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      (burger as HTMLButtonElement).click();
    }
  });
}

// Animation douce sur le soleil SVG du header
const sun = document.querySelector('header svg');
if (sun) {
  sun.classList.add('animate-spin-slow');
}

// Animation fade-in des sections au scroll
const fadeSections = document.querySelectorAll('section[class*="animate-fade-in-up"]');
const fadeInOnScroll = () => {
  fadeSections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      section.classList.add('opacity-100');
    }
  });
};
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('DOMContentLoaded', fadeInOnScroll);

// Micro-interactions sur liens et boutons (scale rapide au clic)
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('pointerdown', () => {
    el.classList.add('scale-95');
  });
  el.addEventListener('pointerup', () => {
    el.classList.remove('scale-95');
  });
  el.addEventListener('mouseleave', () => {
    el.classList.remove('scale-95');
  });
});

// Focus visible pour accessibilité sur tous les boutons/links
const focusEls = document.querySelectorAll<HTMLElement>('a, button');
focusEls.forEach(el => {
  el.addEventListener('focus', () => {
    el.classList.add('ring-2', 'ring-accent-orange');
  });
  el.addEventListener('blur', () => {
    el.classList.remove('ring-2', 'ring-accent-orange');
  });
});

// TODO: Ajouter d'autres animations custom selon la checklist
