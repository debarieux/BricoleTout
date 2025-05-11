// Calendrier de disponibilité pour BricoleTout
// Paramètres du calendrier
const calendarSettings = {
    workingDays: [1, 2, 3, 4, 5], // Lundi au vendredi
    workingHours: {
        start: '08:00',
        end: '18:00'
    },
    slotDuration: 60, // 1 heure par créneau
    maxDaysInAdvance: 30, // Réservation possible jusqu'à 30 jours à l'avance
    excludedDates: ['2025-05-01', '2025-05-08', '2025-07-14', '2025-08-15'] // Jours fériés
};
// Créneaux déjà réservés (simulation)
const bookedSlots = [
    { date: '2025-05-12', time: '09:00' },
    { date: '2025-05-12', time: '10:00' },
    { date: '2025-05-13', time: '14:00' },
    { date: '2025-05-15', time: '16:00' },
    { date: '2025-05-20', time: '11:00' },
];
// État du calendrier
let selectedDate = null;
let selectedSlot = null;
let availableSlots = [];
let currentMonthDate = new Date();
// Initialisation du calendrier
function initCalendar() {
    const calendarContainer = document.getElementById('calendrier-disponibilite');
    if (!calendarContainer) {
        console.error('Conteneur du calendrier non trouvé');
        return;
    }
    // Création de l'interface du calendrier
    createCalendarUI(calendarContainer);
    // Générer le calendrier du mois en cours
    generateMonthCalendar(currentMonthDate);
    // Attacher les événements
    attachCalendarEvents();
}
// Création de l'interface utilisateur du calendrier
function createCalendarUI(container) {
    // Structure principale
    container.innerHTML = `
    <div class="bg-white/90 rounded-xl shadow-elevation-2 p-6 border border-bois-accent/30">
      <h3 class="text-2xl md:text-3xl font-bold font-playfair text-bois-fonce mb-6">Réservez votre créneau</h3>
      
      <!-- Navigation du calendrier -->
      <div class="flex justify-between items-center mb-6">
        <button id="prev-month" class="p-2 rounded-full hover:bg-bois-clair/50 transition-colors duration-200">
          <i class="fas fa-chevron-left text-bois-fonce"></i>
        </button>
        <h4 id="current-month" class="text-xl font-bold text-bois-fonce">Mai 2025</h4>
        <button id="next-month" class="p-2 rounded-full hover:bg-bois-clair/50 transition-colors duration-200">
          <i class="fas fa-chevron-right text-bois-fonce"></i>
        </button>
      </div>
      
      <!-- Calendrier -->
      <div class="mb-6">
        <div class="grid grid-cols-7 gap-1 mb-2">
          <div class="text-center font-medium text-bois-fonce/70">Lun</div>
          <div class="text-center font-medium text-bois-fonce/70">Mar</div>
          <div class="text-center font-medium text-bois-fonce/70">Mer</div>
          <div class="text-center font-medium text-bois-fonce/70">Jeu</div>
          <div class="text-center font-medium text-bois-fonce/70">Ven</div>
          <div class="text-center font-medium text-bois-fonce/70">Sam</div>
          <div class="text-center font-medium text-bois-fonce/70">Dim</div>
        </div>
        <div id="calendar-grid" class="grid grid-cols-7 gap-1">
          <!-- Les jours du mois seront générés ici -->
        </div>
      </div>
      
      <!-- Créneaux horaires (affichés après sélection d'une date) -->
      <div id="time-slots" class="hidden">
        <h5 class="text-lg font-bold text-bois-fonce mb-3">Créneaux disponibles <span id="selected-date-display"></span></h5>
        <div id="slots-container" class="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          <!-- Les créneaux seront générés ici -->
        </div>
      </div>
      
      <!-- Formulaire de réservation (affiché après sélection d'un créneau) -->
      <div id="booking-form" class="hidden mt-6 pt-6 border-t border-bois-clair">
        <h5 class="text-lg font-bold text-bois-fonce mb-4">Finaliser votre réservation</h5>
        <form id="reservation-form" class="space-y-4">
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label for="booking-name" class="block text-sm font-medium text-bois-fonce mb-1">Nom complet</label>
              <input type="text" id="booking-name" class="w-full px-4 py-2 rounded-lg border border-bois-clair focus:ring-2 focus:ring-bois-accent focus:border-transparent" required>
            </div>
            <div>
              <label for="booking-email" class="block text-sm font-medium text-bois-fonce mb-1">Email</label>
              <input type="email" id="booking-email" class="w-full px-4 py-2 rounded-lg border border-bois-clair focus:ring-2 focus:ring-bois-accent focus:border-transparent" required>
            </div>
          </div>
          <div>
            <label for="booking-phone" class="block text-sm font-medium text-bois-fonce mb-1">Téléphone</label>
            <input type="tel" id="booking-phone" class="w-full px-4 py-2 rounded-lg border border-bois-clair focus:ring-2 focus:ring-bois-accent focus:border-transparent" required>
          </div>
          <div>
            <label for="booking-message" class="block text-sm font-medium text-bois-fonce mb-1">Message (optionnel)</label>
            <textarea id="booking-message" rows="3" class="w-full px-4 py-2 rounded-lg border border-bois-clair focus:ring-2 focus:ring-bois-accent focus:border-transparent"></textarea>
          </div>
          <div class="flex justify-end">
            <button type="submit" class="px-6 py-2 rounded-full bg-gradient-to-r from-bois-accent via-orange-500 to-bois-fonce text-white font-bold shadow-3d-button hover:shadow-3d-button-pressed hover:translate-y-1 transition-all duration-200">
              Confirmer la réservation
            </button>
          </div>
        </form>
      </div>
      
      <div class="mt-4 text-sm text-bois-fonce/70 italic">
        <p>Les créneaux sont d'une durée d'une heure. Pour des interventions plus longues, plusieurs créneaux consécutifs peuvent être nécessaires.</p>
      </div>
    </div>
  `;
}
// Générer le calendrier pour un mois donné
function generateMonthCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    // Mettre à jour l'affichage du mois et de l'année
    const currentMonthElement = document.getElementById('current-month');
    if (currentMonthElement) {
        const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        currentMonthElement.textContent = `${monthNames[month]} ${year}`;
    }
    // Obtenir le premier jour du mois
    const firstDayOfMonth = new Date(year, month, 1);
    // Obtenir le dernier jour du mois
    const lastDayOfMonth = new Date(year, month + 1, 0);
    // Obtenir le jour de la semaine du premier jour (0 = dimanche, 1 = lundi, etc.)
    let firstDayWeekday = firstDayOfMonth.getDay();
    // Convertir pour que lundi soit le premier jour (0 = lundi)
    firstDayWeekday = firstDayWeekday === 0 ? 6 : firstDayWeekday - 1;
    // Nombre de jours dans le mois
    const daysInMonth = lastDayOfMonth.getDate();
    // Obtenir la grille du calendrier
    const calendarGrid = document.getElementById('calendar-grid');
    if (!calendarGrid)
        return;
    // Vider la grille
    calendarGrid.innerHTML = '';
    // Ajouter des cellules vides pour les jours avant le premier jour du mois
    for (let i = 0; i < firstDayWeekday; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'h-10 flex items-center justify-center';
        calendarGrid.appendChild(emptyCell);
    }
    // Date actuelle pour comparer
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Date maximale pour la réservation
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + calendarSettings.maxDaysInAdvance);
    // Ajouter les jours du mois
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        const currentDate = new Date(year, month, day);
        const dateString = formatDate(currentDate);
        // Vérifier si le jour est un jour ouvré
        const isWorkingDay = calendarSettings.workingDays.includes(currentDate.getDay() === 0 ? 7 : currentDate.getDay());
        // Vérifier si la date est exclue (jour férié)
        const isExcludedDate = calendarSettings.excludedDates.includes(dateString);
        // Vérifier si la date est dans le passé
        const isPastDate = currentDate < today;
        // Vérifier si la date est au-delà de la période de réservation maximale
        const isFutureDate = currentDate > maxDate;
        // Déterminer si le jour est sélectionnable
        const isSelectable = isWorkingDay && !isExcludedDate && !isPastDate && !isFutureDate;
        // Déterminer si le jour est aujourd'hui
        const isToday = currentDate.getTime() === today.getTime();
        // Appliquer les classes CSS appropriées
        dayCell.className = `h-10 flex items-center justify-center rounded-full ${isToday ? 'ring-2 ring-bois-accent' : ''}`;
        if (isSelectable) {
            dayCell.classList.add('cursor-pointer', 'hover:bg-bois-accent/20', 'transition-colors', 'duration-200');
            dayCell.dataset.date = dateString;
            // Vérifier si cette date a des créneaux réservés
            const hasBookings = bookedSlots.some(slot => slot.date === dateString);
            if (hasBookings) {
                // Indiquer visuellement que certains créneaux sont déjà réservés
                dayCell.innerHTML = `
          <div class="relative">
            <span>${day}</span>
            <span class="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
          </div>
        `;
            }
            else {
                dayCell.textContent = day.toString();
            }
            // Ajouter l'événement de clic
            dayCell.addEventListener('click', () => selectDate(currentDate));
        }
        else {
            // Jour non sélectionnable
            dayCell.classList.add('text-bois-fonce/30');
            dayCell.textContent = day.toString();
        }
        calendarGrid.appendChild(dayCell);
    }
}
// Sélectionner une date et afficher les créneaux disponibles
function selectDate(date) {
    // Mettre à jour la date sélectionnée
    selectedDate = date;
    // Mettre à jour l'affichage de la date sélectionnée
    const selectedDateDisplay = document.getElementById('selected-date-display');
    if (selectedDateDisplay) {
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        selectedDateDisplay.textContent = `- ${date.toLocaleDateString('fr-FR', options)}`;
    }
    // Générer les créneaux horaires disponibles
    generateTimeSlots(date);
    // Afficher la section des créneaux
    const timeSlotsSection = document.getElementById('time-slots');
    if (timeSlotsSection) {
        timeSlotsSection.classList.remove('hidden');
    }
    // Masquer le formulaire de réservation
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.classList.add('hidden');
    }
    // Mettre en évidence la date sélectionnée dans le calendrier
    document.querySelectorAll('#calendar-grid div[data-date]').forEach(dayCell => {
        if (dayCell.dataset.date === formatDate(date)) {
            dayCell.classList.add('bg-bois-accent/30');
        }
        else {
            dayCell.classList.remove('bg-bois-accent/30');
        }
    });
    // Faire défiler jusqu'aux créneaux
    timeSlotsSection === null || timeSlotsSection === void 0 ? void 0 : timeSlotsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
// Générer les créneaux horaires pour une date donnée
function generateTimeSlots(date) {
    const slotsContainer = document.getElementById('slots-container');
    if (!slotsContainer)
        return;
    // Vider le conteneur
    slotsContainer.innerHTML = '';
    // Générer les créneaux selon les heures de travail
    const [startHour, startMinute] = calendarSettings.workingHours.start.split(':').map(Number);
    const [endHour, endMinute] = calendarSettings.workingHours.end.split(':').map(Number);
    // Convertir en minutes pour faciliter le calcul
    const startTimeInMinutes = startHour * 60 + startMinute;
    const endTimeInMinutes = endHour * 60 + endMinute;
    // Générer les créneaux
    availableSlots = [];
    const dateString = formatDate(date);
    for (let timeInMinutes = startTimeInMinutes; timeInMinutes < endTimeInMinutes; timeInMinutes += calendarSettings.slotDuration) {
        const hour = Math.floor(timeInMinutes / 60);
        const minute = timeInMinutes % 60;
        const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const endTimeInMinutes = timeInMinutes + calendarSettings.slotDuration;
        const endHour = Math.floor(endTimeInMinutes / 60);
        const endMinute = endTimeInMinutes % 60;
        const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
        // Vérifier si le créneau est déjà réservé
        const isBooked = bookedSlots.some(slot => slot.date === dateString && slot.time === startTime);
        // Créer l'objet de créneau
        const timeSlot = {
            id: `${dateString}-${startTime}`,
            date: new Date(date),
            startTime,
            endTime,
            available: !isBooked,
            reserved: isBooked
        };
        availableSlots.push(timeSlot);
        // Créer l'élément de créneau
        const slotElement = document.createElement('div');
        slotElement.className = `p-2 rounded-lg text-center ${isBooked ? 'bg-gray-200 text-gray-500' : 'bg-white border border-bois-clair hover:border-bois-accent cursor-pointer'}`;
        slotElement.innerHTML = `${startTime} - ${endTime}`;
        slotElement.dataset.slotId = timeSlot.id;
        if (!isBooked) {
            slotElement.addEventListener('click', () => selectTimeSlot(timeSlot));
        }
        else {
            slotElement.innerHTML += `<br><span class="text-xs">Réservé</span>`;
        }
        slotsContainer.appendChild(slotElement);
    }
    // Si aucun créneau disponible
    if (availableSlots.filter(slot => slot.available).length === 0) {
        slotsContainer.innerHTML = `<div class="col-span-4 p-4 text-center text-bois-fonce/70">Aucun créneau disponible pour cette date.</div>`;
    }
}
// Sélectionner un créneau horaire
function selectTimeSlot(slot) {
    // Mettre à jour le créneau sélectionné
    selectedSlot = slot;
    // Mettre en évidence le créneau sélectionné
    document.querySelectorAll('#slots-container div[data-slot-id]').forEach(slotElement => {
        if (slotElement.dataset.slotId === slot.id) {
            slotElement.classList.add('bg-bois-accent/20', 'border-bois-accent');
        }
        else {
            slotElement.classList.remove('bg-bois-accent/20', 'border-bois-accent');
        }
    });
    // Afficher le formulaire de réservation
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.classList.remove('hidden');
        bookingForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}
// Attacher les événements au calendrier
function attachCalendarEvents() {
    // Navigation entre les mois
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
            currentMonthDate.setMonth(currentMonthDate.getMonth() - 1);
            generateMonthCalendar(currentMonthDate);
        });
    }
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => {
            currentMonthDate.setMonth(currentMonthDate.getMonth() + 1);
            generateMonthCalendar(currentMonthDate);
        });
    }
    // Formulaire de réservation
    const reservationForm = document.getElementById('reservation-form');
    if (reservationForm) {
        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!selectedSlot)
                return;
            // Récupérer les valeurs du formulaire
            const nameInput = document.getElementById('booking-name');
            const emailInput = document.getElementById('booking-email');
            const phoneInput = document.getElementById('booking-phone');
            const messageInput = document.getElementById('booking-message');
            // Simuler l'envoi de la réservation
            alert(`Réservation confirmée !\n\nDate: ${formatDate(selectedSlot.date)}\nHoraire: ${selectedSlot.startTime} - ${selectedSlot.endTime}\nNom: ${nameInput.value}\nEmail: ${emailInput.value}\nTéléphone: ${phoneInput.value}`);
            // Dans une application réelle, vous enverriez ces données à un serveur
            console.log('Réservation:', {
                slot: selectedSlot,
                name: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                message: messageInput.value
            });
            // Ajouter le créneau aux créneaux réservés
            bookedSlots.push({
                date: formatDate(selectedSlot.date),
                time: selectedSlot.startTime
            });
            // Réinitialiser le formulaire et rafraîchir les créneaux
            reservationForm.reset();
            if (selectedDate) {
                generateTimeSlots(selectedDate);
            }
            // Masquer le formulaire
            const bookingForm = document.getElementById('booking-form');
            if (bookingForm) {
                bookingForm.classList.add('hidden');
            }
        });
    }
}
// Formater une date au format YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}
// Initialiser le calendrier quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    // Vérifier si on est sur la page avec le calendrier
    if (document.getElementById('calendrier-disponibilite')) {
        initCalendar();
    }
});
