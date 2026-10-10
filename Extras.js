// ==========================================
// EXTRAS.JS - Améliorations & UX Gamifiée
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. GESTION DES RACCOURCIS CLAVIER (Échape & Flèches)
    window.addEventListener('keydown', (e) => {
        // Touche ECHAP pour fermer toutes les modales ouvertes
        if (e.key === 'Escape') {
            const activeModals = document.querySelectorAll('.video-modal-overlay.active, .char-sheet-modal.active, .project-detail-modal.active, .lightbox-modal.active, .contact-modal.active');
            activeModals.forEach(modal => {
                modal.classList.remove('active');
                // Stoppe les vidéos YouTube si c'était la modale vidéo
                if (modal.id === 'videoModal') {
                    const iframe = document.getElementById('youtubeIframe');
                    if (iframe) iframe.src = iframe.src;
                }
                if (modal.id === 'lightboxModal') {
                    const wrapper = document.getElementById('lightboxMediaWrapper');
                    if (wrapper) wrapper.innerHTML = '';
                }
            });
        }

        // Navigation par flèches gauche/droite dans la lightbox ou le carrousel de projet
        const lightboxActive = document.getElementById('lightboxModal').classList.contains('active');
        const projectModalActive = document.getElementById('projectDetailModal').classList.contains('active');

        if (lightboxActive) {
            if (e.key === 'ArrowLeft') document.getElementById('lightboxPrevBtn').click();
            if (e.key === 'ArrowRight') document.getElementById('lightboxNextBtn').click();
        }
    });

    // 2. ADAPTATION MOBILE / TABLETTES AUTOMATIQUE
    // Si l'appareil est tactile, on réactive le curseur natif pour éviter les bugs de navigation
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        const styleTag = document.createElement('style');
        styleTag.innerHTML = `
            body, button, a, .project-bubble, .gallery-media, input, textarea {
                cursor: auto !important;
            }
            #custom-cursor {
                display: none !important;
            }
        `;
        document.head.appendChild(styleTag);
    }

    // 3. EFFET SONORE RÉTRO LÉGER SUR LES CLICS (Web Audio API sans fichier externe)
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    function playUiBeep(freq = 440, type = 'sine', duration = 0.05) {
        try {
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = type;
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.05, audioCtx.currentTime); // Volume très faible pour ne pas surprendre
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) {
            // Ignore si l'utilisateur n'a pas interagi avec la page
        }
    }

    // Ajout du son discret au clic sur les boutons du menu et du portfolio
    document.querySelectorAll('.menu-btn, .project-bubble, .back-menu-btn, .nav-arrow-btn').forEach(element => {
        element.addEventListener('click', () => {
            playUiBeep(587.33, 'triangle', 0.08); // Petit son aigu type "UI Game Select"
        });
    });

});