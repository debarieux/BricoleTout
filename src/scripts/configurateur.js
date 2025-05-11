// Configurateur de devis interactif pour BricoleTout
// Services disponibles
const services = [
    {
        id: 'montage',
        name: 'Montage de meubles',
        description: 'Assemblage rapide et précis de vos meubles en kit',
        basePrice: 50,
        icon: 'fa-screwdriver-wrench',
        options: [
            { id: 'simple', name: 'Meuble simple', description: 'Étagère, table basse, chaise', priceModifier: 0 },
            { id: 'moyen', name: 'Meuble moyen', description: 'Commode, bureau, lit', priceModifier: 20 },
            { id: 'complexe', name: 'Meuble complexe', description: 'Armoire, cuisine, dressing', priceModifier: 50 }
        ]
    },
    {
        id: 'peinture',
        name: 'Peinture & Papier peint',
        description: 'Rafraîchissement de vos murs, pose de papier peint soignée',
        basePrice: 80,
        icon: 'fa-paint-roller',
        options: [
            { id: 'petite', name: 'Petite surface', description: 'Jusqu\'à 10m²', priceModifier: 0 },
            { id: 'moyenne', name: 'Surface moyenne', description: '10-25m²', priceModifier: 40 },
            { id: 'grande', name: 'Grande surface', description: '25-50m²', priceModifier: 100 }
        ]
    },
    {
        id: 'depannage',
        name: 'Petits dépannages',
        description: 'Plomberie légère, électricité simple, fixations diverses',
        basePrice: 60,
        icon: 'fa-wrench',
        options: [
            { id: 'simple', name: 'Intervention simple', description: 'Moins d\'1h de travail', priceModifier: 0 },
            { id: 'moyenne', name: 'Intervention moyenne', description: '1-2h de travail', priceModifier: 30 },
            { id: 'complexe', name: 'Intervention complexe', description: '2-4h de travail', priceModifier: 80 }
        ]
    }
];
// État du configurateur
let selectedServices = [];
let totalPrice = 0;
// Initialisation du configurateur
export function initConfigurator() {
    const configuratorContainer = document.getElementById('configurateur-devis');
    if (!configuratorContainer) {
        console.error('Conteneur du configurateur non trouvé');
        return;
    }
    // Création de l'interface du configurateur
    createConfiguratorUI(configuratorContainer);
    // Attacher les événements
    attachConfiguratorEvents();
}
// Création de l'interface utilisateur du configurateur
function createConfiguratorUI(container) {
    // Titre et introduction
    const header = document.createElement('div');
    header.className = 'mb-8 text-center';
    header.innerHTML = `
    <h3 class="text-2xl md:text-3xl font-bold font-playfair text-bois-fonce mb-3">Estimez le coût de vos travaux</h3>
    <p class="text-base md:text-lg text-bois-fonce/80">Sélectionnez les services dont vous avez besoin pour obtenir une estimation rapide.</p>
  `;
    container.appendChild(header);
    // Conteneur des services
    const servicesContainer = document.createElement('div');
    servicesContainer.className = 'grid md:grid-cols-3 gap-6 mb-8';
    servicesContainer.id = 'services-container';
    // Générer les cartes de services
    services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'bg-white/80 rounded-xl shadow-elevation-1 hover:shadow-elevation-3 transition-all duration-300 p-6 border border-bois-clair cursor-pointer service-card';
        serviceCard.dataset.serviceId = service.id;
        serviceCard.innerHTML = `
      <div class="flex items-center mb-4">
        <div class="w-12 h-12 rounded-full bg-bois-accent/20 flex items-center justify-center text-bois-accent mr-4">
          <i class="fas ${service.icon} text-xl"></i>
        </div>
        <h4 class="text-xl font-bold font-playfair text-bois-fonce">${service.name}</h4>
      </div>
      <p class="text-bois-fonce/80 mb-4">${service.description}</p>
      <div class="flex justify-between items-center">
        <span class="text-bois-accent font-bold">À partir de ${service.basePrice}€</span>
        <button class="px-4 py-2 rounded-full bg-bois-accent text-white hover:bg-bois-fonce transition-colors duration-300 select-btn">
          Sélectionner
        </button>
      </div>
    `;
        servicesContainer.appendChild(serviceCard);
    });
    container.appendChild(servicesContainer);
    // Conteneur des options (affiché après sélection d'un service)
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'hidden bg-bois-clair/30 rounded-xl p-6 mb-8';
    optionsContainer.id = 'options-container';
    container.appendChild(optionsContainer);
    // Résumé et estimation
    const summaryContainer = document.createElement('div');
    summaryContainer.className = 'bg-white/90 rounded-xl shadow-elevation-2 p-6 border border-bois-accent/30';
    summaryContainer.id = 'summary-container';
    summaryContainer.innerHTML = `
    <h4 class="text-xl font-bold font-playfair text-bois-fonce mb-4">Votre estimation</h4>
    <div id="selected-services-list" class="mb-4">
      <p class="text-bois-fonce/70 italic">Aucun service sélectionné</p>
    </div>
    <div class="flex justify-between items-center border-t border-bois-clair pt-4">
      <span class="text-lg font-bold text-bois-fonce">Total estimé:</span>
      <span id="total-price" class="text-2xl font-bold text-bois-accent">0€</span>
    </div>
    <div class="mt-6">
      <button id="request-quote-btn" class="w-full py-3 rounded-full bg-gradient-to-r from-bois-accent via-orange-500 to-bois-fonce text-white font-bold shadow-3d-button hover:shadow-3d-button-pressed hover:translate-y-1 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
        Demander un devis personnalisé
      </button>
      <p class="text-xs text-center mt-2 text-bois-fonce/60">Cette estimation est donnée à titre indicatif et sera affinée lors du devis personnalisé.</p>
    </div>
  `;
    container.appendChild(summaryContainer);
}
// Attacher les événements au configurateur
function attachConfiguratorEvents() {
    // Sélection d'un service
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const target = e.target;
            const isButton = target.classList.contains('select-btn') || target.closest('.select-btn');
            if (isButton) {
                e.stopPropagation(); // Éviter la propagation si on clique sur le bouton
            }
            const serviceId = card.dataset.serviceId;
            const service = services.find(s => s.id === serviceId);
            if (service) {
                showServiceOptions(service);
            }
        });
    });
    // Événement pour le bouton de demande de devis
    const requestQuoteBtn = document.getElementById('request-quote-btn');
    if (requestQuoteBtn) {
        requestQuoteBtn.addEventListener('click', () => {
            // Rediriger vers la page de contact avec les informations pré-remplies
            const servicesParam = selectedServices.map(s => `${s.service.name}${s.option ? ` (${s.option.name})` : ''}`).join(',');
            window.location.href = `contact.html?services=${encodeURIComponent(servicesParam)}&total=${totalPrice}`;
        });
    }
}
// Afficher les options pour un service sélectionné
function showServiceOptions(service) {
    var _a;
    const optionsContainer = document.getElementById('options-container');
    if (!optionsContainer)
        return;
    // Afficher le conteneur d'options
    optionsContainer.classList.remove('hidden');
    optionsContainer.innerHTML = '';
    // Titre du service
    const title = document.createElement('h4');
    title.className = 'text-xl font-bold font-playfair text-bois-fonce mb-4';
    title.textContent = `Options pour ${service.name}`;
    optionsContainer.appendChild(title);
    // Liste des options
    const optionsList = document.createElement('div');
    optionsList.className = 'space-y-4';
    if (service.options && service.options.length > 0) {
        service.options.forEach(option => {
            var _a;
            const optionItem = document.createElement('div');
            optionItem.className = 'flex items-center justify-between bg-white/80 rounded-lg p-4 cursor-pointer hover:bg-bois-accent/10 transition-colors duration-200 option-item';
            optionItem.dataset.serviceId = service.id;
            optionItem.dataset.optionId = option.id;
            optionItem.innerHTML = `
        <div>
          <h5 class="font-bold text-bois-fonce">${option.name}</h5>
          <p class="text-sm text-bois-fonce/70">${option.description}</p>
        </div>
        <div class="flex items-center">
          <span class="text-bois-accent font-bold mr-4">${service.basePrice + option.priceModifier}€</span>
          <button class="px-3 py-1 rounded-full bg-bois-accent text-white hover:bg-bois-fonce transition-colors duration-300 add-option-btn">
            Ajouter
          </button>
        </div>
      `;
            optionsList.appendChild(optionItem);
            // Événement pour ajouter l'option
            (_a = optionItem.querySelector('.add-option-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {
                e.stopPropagation();
                addServiceWithOption(service, option);
                updateSummary();
            });
        });
    }
    else {
        // Si pas d'options, proposer d'ajouter le service de base
        const baseOption = document.createElement('div');
        baseOption.className = 'flex items-center justify-between bg-white/80 rounded-lg p-4';
        baseOption.innerHTML = `
      <div>
        <h5 class="font-bold text-bois-fonce">Service standard</h5>
        <p class="text-sm text-bois-fonce/70">Prestation de base</p>
      </div>
      <div>
        <span class="text-bois-accent font-bold mr-4">${service.basePrice}€</span>
        <button class="px-3 py-1 rounded-full bg-bois-accent text-white hover:bg-bois-fonce transition-colors duration-300 add-base-btn">
          Ajouter
        </button>
      </div>
    `;
        optionsList.appendChild(baseOption);
        // Événement pour ajouter le service de base
        (_a = baseOption.querySelector('.add-base-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            addServiceWithOption(service);
            updateSummary();
        });
    }
    optionsContainer.appendChild(optionsList);
    // Bouton pour fermer les options
    const closeBtn = document.createElement('button');
    closeBtn.className = 'mt-4 text-bois-fonce/70 hover:text-bois-fonce transition-colors duration-200';
    closeBtn.textContent = 'Fermer les options';
    closeBtn.addEventListener('click', () => {
        optionsContainer.classList.add('hidden');
    });
    optionsContainer.appendChild(closeBtn);
    // Scroll jusqu'aux options
    optionsContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
// Ajouter un service avec une option au panier
function addServiceWithOption(service, option) {
    // Vérifier si le service est déjà sélectionné
    const existingIndex = selectedServices.findIndex(s => s.service.id === service.id &&
        (!option || (s.option && s.option.id === option.id)));
    if (existingIndex !== -1) {
        // Service déjà sélectionné, on le retire
        selectedServices.splice(existingIndex, 1);
    }
    else {
        // Ajouter le nouveau service
        selectedServices.push({ service, option });
    }
    // Activer/désactiver le bouton de demande de devis
    const requestQuoteBtn = document.getElementById('request-quote-btn');
    if (requestQuoteBtn) {
        requestQuoteBtn.disabled = selectedServices.length === 0;
    }
}
// Mettre à jour le résumé et le prix total
function updateSummary() {
    const selectedServicesList = document.getElementById('selected-services-list');
    const totalPriceElement = document.getElementById('total-price');
    if (!selectedServicesList || !totalPriceElement)
        return;
    if (selectedServices.length === 0) {
        selectedServicesList.innerHTML = `<p class="text-bois-fonce/70 italic">Aucun service sélectionné</p>`;
        totalPriceElement.textContent = '0€';
        totalPrice = 0;
        return;
    }
    // Générer la liste des services sélectionnés
    selectedServicesList.innerHTML = '';
    const servicesList = document.createElement('ul');
    servicesList.className = 'space-y-2';
    // Calculer le prix total
    totalPrice = 0;
    selectedServices.forEach((item, index) => {
        const { service, option } = item;
        const itemPrice = option ? service.basePrice + option.priceModifier : service.basePrice;
        totalPrice += itemPrice;
        const listItem = document.createElement('li');
        listItem.className = 'flex justify-between items-center';
        listItem.innerHTML = `
      <div>
        <span class="font-medium">${service.name}</span>
        ${option ? `<span class="text-sm text-bois-fonce/70"> - ${option.name}</span>` : ''}
      </div>
      <div class="flex items-center">
        <span class="mr-3">${itemPrice}€</span>
        <button class="text-red-500 hover:text-red-700 transition-colors duration-200 remove-service-btn" data-index="${index}">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;
        servicesList.appendChild(listItem);
    });
    selectedServicesList.appendChild(servicesList);
    // Mettre à jour le prix total
    totalPriceElement.textContent = `${totalPrice}€`;
    // Ajouter les événements pour supprimer les services
    document.querySelectorAll('.remove-service-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.dataset.index || '0', 10);
            selectedServices.splice(index, 1);
            updateSummary();
            // Activer/désactiver le bouton de demande de devis
            const requestQuoteBtn = document.getElementById('request-quote-btn');
            if (requestQuoteBtn) {
                requestQuoteBtn.disabled = selectedServices.length === 0;
            }
        });
    });
}
// Initialiser le configurateur quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    // Vérifier si on est sur la page d'accueil ou une page avec le configurateur
    if (document.getElementById('configurateur-devis')) {
        initConfigurator();
    }
});
