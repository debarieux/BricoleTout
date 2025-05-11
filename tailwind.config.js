/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
      },
    },
    extend: {
      colors: {
        // Palette bois naturels
        'bois-clair': '#F5F0EB',  // Blanc cassé chaud
        'bois-moyen': '#D2B48C',  // Chêne clair
        'bois-fonce': '#5E3A1F',   // Noyer
        'bois-accent': '#A67C52',  // Chêne fumé
        'bois-doux': '#E8D5B5',    // Érable
        
        // Accents naturels
        'vert-sage': '#C8D5B9',
        'beige-sable': '#E6D5C3',
        'taupe': '#483C32',
        
        // Anciens noms conservés pour compatibilité
        'accent-orange': '#D49A2A',
        'glow-yellow': '#FFD700',
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        serif: ['Lora', 'serif'],
        display: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 14px 0 rgba(0, 0, 0, 0.05)',
        'soft-md': '0 6px 20px 0 rgba(0, 0, 0, 0.08)',
        'wood': '2px 4px 12px rgba(94, 58, 31, 0.12)',
        'wood-md': '4px 8px 24px rgba(94, 58, 31, 0.16)',
        'elevation-1': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
        'elevation-2': '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        'elevation-3': '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        'elevation-4': '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        'elevation-5': '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
        '3d-button': '0 4px 0 0 #D49A2A',
        '3d-button-pressed': '0 2px 0 0 #D49A2A',
        'inner-glow': 'inset 0 0 15px 0 rgba(255, 255, 255, 0.5)',
      },
      backgroundImage: {
        'wood-pattern': "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0V0zm10 10h80v80H10V10zm5 5h70v70H15V15zm5 5h60v60H20V20zm5 5h50v50H25V25zm5 5h40v40H30V30zm5 5h30v30H35V35zm5 5h20v20H40V40zm5 5h10v10H45V45z' fill='%235E3A1F' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-left': 'fadeInLeft 0.8s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'sectionReveal': 'sectionReveal 1.2s ease-out forwards',
        'gallery-appear': 'galleryAppear 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        sectionReveal: {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        galleryAppear: {
          '0%': { opacity: '0', transform: 'scale(0.9) translateY(10px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.perspective-500': {
          perspective: '500px',
        },
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.preserve-3d': {
          transformStyle: 'preserve-3d',
        },
        '.backface-hidden': {
          backfaceVisibility: 'hidden',
        },
        '.rotate-y-10': {
          transform: 'rotateY(10deg)',
        },
        '.rotate-y-minus-10': {
          transform: 'rotateY(-10deg)',
        },
        '.translate-z-5': {
          transform: 'translateZ(5px)',
        },
        '.translate-z-10': {
          transform: 'translateZ(10px)',
        },
        '.translate-z-20': {
          transform: 'translateZ(20px)',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}
