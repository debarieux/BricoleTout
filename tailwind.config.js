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
      },
      backgroundImage: {
        'wood-pattern': "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h100v100H0V0zm10 10h80v80H10V10zm5 5h70v70H15V15zm5 5h60v60H20V20zm5 5h50v50H25V25zm5 5h40v40H30V30zm5 5h30v30H35V35zm5 5h20v20H40V40zm5 5h10v10H45V45z' fill='%235E3A1F' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
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
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [],
}
