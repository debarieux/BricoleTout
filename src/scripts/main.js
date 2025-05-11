// Import des polices
import '@fontsource/inter/variable.css';
import '@fontsource/lora/400.css';
import '@fontsource/lora/700.css';
import '@fontsource/playfair-display/400.css';
import '@fontsource/playfair-display/700.css';
// Script interactif BricoleTout (header, menu, animations, accessibilité, parallax, 3D)
// Fonction pour détecter si l'utilisateur préfère les animations réduites
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// Fonction pour charger les images progressivement (lazy loading)
const lazyLoadImages = () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        // Le navigateur supporte le lazy loading natif
        console.log('Lazy loading natif supporté');
    }
    else {
        // Fallback pour les navigateurs qui ne supportent pas le lazy loading natif
        const lazyImageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    if (lazyImage.dataset.src) {
                        lazyImage.src = lazyImage.dataset.src;
                    }
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        lazyImages.forEach(image => {
            lazyImageObserver.observe(image);
        });
    }
};
// Animation ombre dynamique sur le header
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        header === null || header === void 0 ? void 0 : header.classList.add('shadow-lg');
    }
    else {
        header === null || header === void 0 ? void 0 : header.classList.remove('shadow-lg');
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
        }
        else {
            document.body.style.overflow = '';
        }
    });
    burger.addEventListener('keyup', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            burger.click();
        }
    });
}
// Animation douce sur le soleil SVG du header
const sun = document.querySelector('header svg');
if (sun) {
    sun.classList.add('animate-spin-slow');
}
// Animation fade-in des sections au scroll avec diffu00e9rents effets
const animatedElements = document.querySelectorAll('[class*="animate-fade-in"], [class*="animate-scale-in"], [class*="animate-sectionReveal"], [class*="animate-gallery-appear"]');
// Fonction avancu00e9e pour animer les u00e9lu00e9ments au scroll
const animateOnScroll = () => {
    if (prefersReducedMotion)
        return; // Respecter les pru00e9fu00e9rences d'accessibilitu00e9
    animatedElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const delayAttr = element.getAttribute('data-delay');
        const delay = delayAttr ? parseInt(delayAttr, 10) : index * 100; // Du00e9lai progressif ou personnalisu00e9
        // Activer l'animation quand l'u00e9lu00e9ment est visible
        if (rect.top < window.innerHeight - 50) {
            setTimeout(() => {
                element.classList.add('animate-active');
                element.style.opacity = '1';
            }, delay);
        }
    });
};
// Effet parallax sur les u00e9lu00e9ments avec la classe .parallax
const parallaxElements = document.querySelectorAll('.parallax');
const parallaxEffect = () => {
    if (prefersReducedMotion)
        return;
    parallaxElements.forEach(element => {
        const speedAttr = element.getAttribute('data-speed');
        const speed = speedAttr ? parseFloat(speedAttr) : 0.2;
        const yPos = -(window.scrollY * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
};
// Observer pour les animations au défilement
const createScrollObserver = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationClass = Array.from(element.classList).find(cls => cls.startsWith('animate-'));
                if (animationClass) {
                    element.style.opacity = '1';
                    element.classList.add(animationClass + '-active');
                }
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('[class*="animate-"]').forEach(element => {
        if (!prefersReducedMotion) {
            element.style.opacity = '0';
            observer.observe(element);
        }
        else {
            element.style.opacity = '1'; // Afficher directement si animations réduites préférées
        }
    });
};
// Initialiser les observers et u00e9couteurs d'u00e9vu00e9nements pour les animations
window.addEventListener('scroll', () => {
    animateOnScroll();
    parallaxEffect();
});
window.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    createScrollObserver();
    lazyLoadImages();
});
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
const focusEls = document.querySelectorAll('a, button');
focusEls.forEach(el => {
    el.addEventListener('focus', () => {
        el.classList.add('ring-2', 'ring-accent-orange');
    });
    el.addEventListener('blur', () => {
        el.classList.remove('ring-2', 'ring-accent-orange');
    });
});
// Importer les modules des nouvelles fonctionnalitu00e9s
import { initConfigurator } from './configurateur';
import { initCalendar } from './calendrier';
import { replaceIcons, apply3DEffects, addBadgesAndCertifications } from './icones';
// Initialiser les fonctionnalitu00e9s quand le DOM est chargu00e9
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser le configurateur de devis si pru00e9sent sur la page
    if (document.getElementById('configurateur-devis')) {
        initConfigurator();
    }
    // Initialiser le calendrier de disponibilitu00e9 si pru00e9sent sur la page
    if (document.getElementById('calendrier-disponibilite')) {
        initCalendar();
    }
    // Remplacer les icu00f4nes Font Awesome par des icu00f4nes personnalisu00e9es
    replaceIcons();
    // Appliquer les effets 3D
    apply3DEffects();
    // Ajouter les badges et certifications si le conteneur existe
    if (document.getElementById('badges-certifications')) {
        addBadgesAndCertifications();
    }
    // Ajouter la classe card-3d aux u00e9lu00e9ments qui devraient avoir cet effet
    document.querySelectorAll('.service-card, .testimonial-card').forEach(card => {
        card.classList.add('card-3d');
    });
    // Ajouter la classe button-3d aux boutons CTA principaux
    document.querySelectorAll('.cta-primary').forEach(button => {
        button.classList.add('button-3d', 'shadow-3d-button');
    });
    // Ajouter la classe depth-effect aux images de la galerie
    document.querySelectorAll('.gallery-img').forEach(img => {
        img.classList.add('depth-effect');
    });
});
