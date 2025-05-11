// Icônes personnalisées et effets 3D pour BricoleTout

// Types pour les icônes
interface IconDefinition {
  name: string;
  viewBox: string;
  path: string;
}

// Collection d'icônes personnalisées pour remplacer Font Awesome
const customIcons: Record<string, IconDefinition> = {
  'hammer': {
    name: 'hammer',
    viewBox: '0 0 24 24',
    path: 'M13.7 21.8c-1 0-2-.4-2.7-1.1l-7-7c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0l7 7c.7.7 1.9.7 2.6 0l7-7c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-7 7c-.7.7-1.7 1.1-2.7 1.1zM7 10.2c-.3 0-.5-.1-.7-.3l-4-4c-.4-.4-.4-1 0-1.4l4-4c.4-.4 1-.4 1.4 0l4 4c.4.4.4 1 0 1.4l-4 4c-.2.2-.4.3-.7.3zm0-8L4.4 4.8 7 7.4l2.6-2.6L7 2.2z'
  },
  'wrench': {
    name: 'wrench',
    viewBox: '0 0 24 24',
    path: 'M21.7 13.5l-5-5c-.4-.4-1-.4-1.4 0l-2.8 2.8-7.8-7.8c-.4-.4-1-.4-1.4 0l-2 2c-.4.4-.4 1 0 1.4l7.8 7.8-2.8 2.8c-.4.4-.4 1 0 1.4l5 5c.4.4 1 .4 1.4 0l9-9c.4-.4.4-1 0-1.4zM4.3 5.7l1.4-1.4 7.8 7.8-1.4 1.4-7.8-7.8zm12.2 12.2l-4.3-4.3 7.6-7.6 4.3 4.3-7.6 7.6z'
  },
  'paint-roller': {
    name: 'paint-roller',
    viewBox: '0 0 24 24',
    path: 'M18 4V3c0-.6-.4-1-1-1H7c-.6 0-1 .4-1 1v1H4v8h2v1c0 .6.4 1 1 1h10c.6 0 1-.4 1-1v-1h2V4h-2zM8 4h8v6H8V4zm10 6h-1V4h1v6zM6 10V4h1v6H6zm11 2H7v-1h10v1z M9 14v7c0 .6.4 1 1 1h4c.6 0 1-.4 1-1v-7H9zm5 6h-4v-5h4v5z'
  },
  'screwdriver': {
    name: 'screwdriver',
    viewBox: '0 0 24 24',
    path: 'M20.7 3.3c-.4-.4-1-.4-1.4 0l-3.6 3.6-1.4-1.4c-.4-.4-1-.4-1.4 0L8.3 10c-.4.4-.4 1 0 1.4l1.4 1.4-7.4 7.4c-.4.4-.4 1 0 1.4.2.2.5.3.7.3.3 0 .5-.1.7-.3l7.4-7.4 1.4 1.4c.2.2.5.3.7.3.3 0 .5-.1.7-.3l4.6-4.6c.4-.4.4-1 0-1.4l-1.4-1.4 3.6-3.6c.4-.3.4-.9 0-1.3zM14.6 14.6l-5.2-5.2 3.2-3.2 5.2 5.2-3.2 3.2z'
  },
  'tools': {
    name: 'tools',
    viewBox: '0 0 24 24',
    path: 'M21.3 13.3l-5-5c-.4-.4-1-.4-1.4 0l-2.8 2.8-7.8-7.8c-.4-.4-1-.4-1.4 0l-2 2c-.4.4-.4 1 0 1.4l7.8 7.8-2.8 2.8c-.4.4-.4 1 0 1.4l5 5c.4.4 1 .4 1.4 0l9-9c.4-.4.4-1 0-1.4zM4.3 5.7l1.4-1.4 7.8 7.8-1.4 1.4-7.8-7.8zm12.2 12.2l-4.3-4.3 7.6-7.6 4.3 4.3-7.6 7.6z M15 2.4l1.4-1.4c.4-.4 1-.4 1.4 0l1.4 1.4c.4.4.4 1 0 1.4l-1.4 1.4-2.8-2.8z M4.8 19.2l-1.4 1.4c-.4.4-1 .4-1.4 0L.6 19.2c-.4-.4-.4-1 0-1.4l1.4-1.4 2.8 2.8z'
  },
  'certificate': {
    name: 'certificate',
    viewBox: '0 0 24 24',
    path: 'M22 12c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2s10 4.5 10 10zm-2 0c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8zm-8 4c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-5 9.5l3-1.5 2 1-2-3.5 3-1.5-3.5-.5-1-3-1 3-3.5.5 3 1.5-2 3.5 2-1z'
  },
  'shield-check': {
    name: 'shield-check',
    viewBox: '0 0 24 24',
    path: 'M12 22c-.3 0-.6-.1-.8-.2-4.1-2.9-6.7-7.4-6.7-12.4V4.8c0-.7.5-1.3 1.2-1.4l6-1.5c.2 0 .4 0 .6 0l6 1.5c.7.2 1.2.8 1.2 1.4v4.6c0 5-2.6 9.5-6.7 12.4-.2.1-.5.2-.8.2zm-5.5-16.8v4.2c0 4.3 2.2 8.1 5.5 10.6 3.3-2.5 5.5-6.3 5.5-10.6V5.2l-5-1.2-6 1.2zm8.1 5.4l-3.4 3.4-1.7-1.7c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l2.4 2.4c.2.2.5.3.7.3.3 0 .5-.1.7-.3l4.1-4.1c.4-.4.4-1 0-1.4s-1-.4-1.4 0z'
  },
  'star': {
    name: 'star',
    viewBox: '0 0 24 24',
    path: 'M12 17.8l-6.9 4.2c-.5.3-1.2 0-1.3-.6l1.3-8-5.5-5.4c-.4-.4-.2-1.1.4-1.2l7.6-1.1 3.4-6.9c.3-.6 1.1-.6 1.4 0l3.4 6.9 7.6 1.1c.6.1.8.8.4 1.2l-5.5 5.4 1.3 8c.1.6-.4.9-.9.6l-6.7-4.2z'
  }
};

// Fonction pour créer une icône SVG personnalisée
export function createCustomIcon(iconName: string, className: string = ''): SVGSVGElement | null {
  const iconDef = customIcons[iconName];
  
  if (!iconDef) {
    console.error(`Icône "${iconName}" non trouvée`);
    return null;
  }
  
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', iconDef.viewBox);
  svg.setAttribute('class', className);
  svg.setAttribute('aria-hidden', 'true');
  
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', iconDef.path);
  path.setAttribute('fill', 'currentColor');
  
  svg.appendChild(path);
  
  return svg;
}

// Fonction pour remplacer les icônes Font Awesome par des icônes personnalisées
export function replaceIcons() {
  // Correspondance entre les classes Font Awesome et les icônes personnalisées
  const iconMappings: Record<string, string> = {
    'fa-wrench': 'wrench',
    'fa-hammer': 'hammer',
    'fa-paint-roller': 'paint-roller',
    'fa-screwdriver-wrench': 'tools',
    'fa-certificate': 'certificate',
    'fa-shield-check': 'shield-check',
    'fa-star': 'star'
  };
  
  // Remplacer les icônes Font Awesome
  document.querySelectorAll('i[class*="fa-"]').forEach(iconElement => {
    // Trouver quelle icône remplacer
    const classNames = Array.from(iconElement.classList);
    const iconClass = classNames.find(className => iconMappings[className]);
    
    if (iconClass && iconMappings[iconClass]) {
      const parentElement = iconElement.parentElement;
      if (parentElement) {
        // Récupérer les classes de style (taille, couleur, etc.)
        const styleClasses = classNames
          .filter(cls => !cls.startsWith('fa-') && cls !== 'fas' && cls !== 'far' && cls !== 'fab')
          .join(' ');
        
        // Créer l'icône personnalisée
        const customIcon = createCustomIcon(iconMappings[iconClass], styleClasses);
        
        if (customIcon) {
          // Remplacer l'icône Font Awesome par l'icône personnalisée
          parentElement.replaceChild(customIcon, iconElement);
        }
      }
    }
  });
}

// Fonction pour appliquer des effets 3D subtils aux éléments
export function apply3DEffects() {
  // Effet de carte 3D sur les éléments avec la classe .card-3d
  document.querySelectorAll('.card-3d').forEach(card => {
    if (!card.classList.contains('card-3d-initialized')) {
      card.classList.add('card-3d-initialized', 'preserve-3d');
      
      // Conteneur parent pour la perspective
      const parent = card.parentElement;
      if (parent) {
        parent.classList.add('perspective-1000');
      }
      
      // Effet de rotation au survol
      card.addEventListener('mousemove', (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left; // Position X de la souris dans l'élément
        const y = mouseEvent.clientY - rect.top;  // Position Y de la souris dans l'élément
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculer l'angle de rotation (limité à ±10 degrés)
        const rotateY = ((x - centerX) / centerX) * 5; // Rotation sur l'axe Y (mouvement horizontal)
        const rotateX = ((centerY - y) / centerY) * 5; // Rotation sur l'axe X (mouvement vertical)
        
        // Appliquer la transformation
        (card as HTMLElement).style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
      
      // Réinitialiser la rotation quand la souris quitte l'élément
      card.addEventListener('mouseleave', () => {
        (card as HTMLElement).style.transform = 'rotateX(0) rotateY(0)';
      });
    }
  });
  
  // Effet de bouton 3D sur les éléments avec la classe .button-3d
  document.querySelectorAll('.button-3d').forEach(button => {
    if (!button.classList.contains('button-3d-initialized')) {
      button.classList.add('button-3d-initialized');
      
      // Effet d'enfoncement au clic
      button.addEventListener('mousedown', () => {
        (button as HTMLElement).style.transform = 'translateY(3px)';
        button.classList.add('shadow-3d-button-pressed');
        button.classList.remove('shadow-3d-button');
      });
      
      // Retour à l'état normal
      button.addEventListener('mouseup', () => {
        (button as HTMLElement).style.transform = 'translateY(0)';
        button.classList.add('shadow-3d-button');
        button.classList.remove('shadow-3d-button-pressed');
      });
      
      button.addEventListener('mouseleave', () => {
        (button as HTMLElement).style.transform = 'translateY(0)';
        button.classList.add('shadow-3d-button');
        button.classList.remove('shadow-3d-button-pressed');
      });
    }
  });
  
  // Effet de profondeur sur les images avec la classe .depth-effect
  document.querySelectorAll('.depth-effect').forEach(image => {
    if (!image.classList.contains('depth-initialized')) {
      image.classList.add('depth-initialized');
      
      // Créer un conteneur pour l'effet de profondeur
      const parent = image.parentElement;
      if (parent) {
        parent.classList.add('perspective-500', 'relative');
        
        // Ajouter une ombre portée qui bouge avec la souris
        const shadow = document.createElement('div');
        shadow.classList.add('absolute', 'inset-0', 'rounded-lg', 'shadow-elevation-3', 'pointer-events-none');
        shadow.style.zIndex = '-1';
        shadow.style.transition = 'transform 0.2s ease-out';
        
        parent.appendChild(shadow);
        
        // Effet de mouvement au survol
        parent.addEventListener('mousemove', (e: Event) => {
          const mouseEvent = e as MouseEvent;
          const rect = parent.getBoundingClientRect();
          const x = mouseEvent.clientX - rect.left;
          const y = mouseEvent.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          // Calculer le déplacement (limité à ±5px)
          const moveX = ((x - centerX) / centerX) * 5;
          const moveY = ((y - centerY) / centerY) * 5;
          
          // Appliquer la transformation
          (image as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
          shadow.style.transform = `translate(${moveX * 1.5}px, ${moveY * 1.5}px)`;
        });
        
        // Réinitialiser quand la souris quitte l'élément
        parent.addEventListener('mouseleave', () => {
          (image as HTMLElement).style.transform = 'translate(0, 0)';
          shadow.style.transform = 'translate(0, 0)';
        });
      }
    }
  });
}

// Fonction pour ajouter des badges et certifications
export function addBadgesAndCertifications() {
  const badgesContainer = document.getElementById('badges-certifications');
  
  if (!badgesContainer) return;
  
  // Données des badges et certifications
  const badges = [
    {
      icon: 'certificate',
      title: 'Artisan Certifié',
      description: 'Certification professionnelle reconnue par la Chambre des Métiers'
    },
    {
      icon: 'shield-check',
      title: 'Garantie Qualité',
      description: 'Tous nos travaux sont garantis pendant 1 an'
    },
    {
      icon: 'tools',
      title: '10+ ans d\'expérience',
      description: 'Une décennie d\'expertise à votre service'
    }
  ];
  
  // Créer les badges
  badges.forEach(badge => {
    const badgeElement = document.createElement('div');
    badgeElement.className = 'bg-white rounded-xl shadow-elevation-2 p-6 border border-bois-accent/20 card-3d transition-all duration-300';
    
    // Créer l'icône personnalisée
    const iconContainer = document.createElement('div');
    iconContainer.className = 'w-16 h-16 mx-auto mb-4 rounded-full bg-bois-accent/20 flex items-center justify-center text-bois-accent';
    
    const icon = createCustomIcon(badge.icon, 'w-8 h-8');
    if (icon) {
      iconContainer.appendChild(icon);
    }
    
    // Contenu du badge
    badgeElement.innerHTML = `
      ${iconContainer.outerHTML}
      <h4 class="text-xl font-bold font-playfair text-bois-fonce mb-2 text-center">${badge.title}</h4>
      <p class="text-bois-fonce/80 text-center">${badge.description}</p>
    `;
    
    badgesContainer.appendChild(badgeElement);
  });
}

// Initialiser les icônes et effets 3D quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
  // Remplacer les icônes Font Awesome par des icônes personnalisées
  replaceIcons();
  
  // Appliquer les effets 3D
  apply3DEffects();
  
  // Ajouter les badges et certifications si le conteneur existe
  addBadgesAndCertifications();
});
