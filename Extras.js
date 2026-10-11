// ==========================================
// EXTRAS.JS - Améliorations, UI, Thèmes, Sons, Effets & Tooltips
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // A. CONTENEUR DES BOUTONS DU HAUT (CV & CONTACT)
    const topBarContainer = document.createElement('div');
    topBarContainer.style.cssText = `
        position: absolute;
        top: 25px;
        right: 155px;
        z-index: 15;
        display: flex;
        gap: 12px;
        align-items: center;
    `;
    
    // Bouton CV
    const cvBtn = document.createElement('a');
    cvBtn.href = "https://drive.google.com/file/d/1NDAKqytWr7U1Gritd7IpsqdXnHcfKrBD/view?usp=sharing";
    cvBtn.target = "_blank";
    cvBtn.className = "contact-top-btn";
    cvBtn.style.position = "static";
    cvBtn.textContent = "📄 MON CV";
    topBarContainer.appendChild(cvBtn);

    // Bouton Contact
    const contactBtn = document.createElement('button');
    contactBtn.className = "contact-top-btn";
    contactBtn.style.position = "static";
    contactBtn.textContent = "✉️ CONTACT";
    topBarContainer.appendChild(contactBtn);

    document.body.appendChild(topBarContainer);


    // B. CRÉATION DE LA MODALE DE CONTACT FORMSPREE
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/mnpjvbgp";

    const modalHTML = `
        <div class="contact-modal-container" style="position: relative;">
            <button class="close-btn" id="closeContactExtraBtn">FERMER [X]</button>
            <h2 style="font-family: 'Orbitron', sans-serif; color: #00f0ff; font-size: 1.8rem; border-bottom: 2px solid rgba(0, 240, 255, 0.4); padding-bottom: 10px;">ME CONTACTER</h2>
            
            <p style="font-size: 0.9rem; color: #d1c4e9;">Envoyer un message direct à <strong style="color: #00f0ff;">Samuel Guegant</strong></p>

            <form class="contact-form" id="contactExtraForm" action="${FORMSPREE_ENDPOINT}" method="POST">
                <label for="extraEmail">VOTRE ADRESSE E-MAIL</label>
                <input type="email" name="email" id="extraEmail" placeholder="votre.email@exemple.com" required>

                <label for="extraSubject">SUJET DU MESSAGE</label>
                <input type="text" name="subject" id="extraSubject" placeholder="Proposition d'alternance / projet..." required>

                <label for="extraMessage">VOTRE MESSAGE</label>
                <textarea name="message" id="extraMessage" placeholder="Écrivez votre message ici..." required></textarea>

                <button type="submit" class="submit-btn" id="submitFormBtn">ENVOYER LE MESSAGE ➔</button>
            </form>
        </div>
    `;

    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'contact-modal';
    modalOverlay.id = 'contactExtraModal';
    modalOverlay.innerHTML = modalHTML;
    document.body.appendChild(modalOverlay);

    // Ouverture / Fermeture de la modale
    contactBtn.addEventListener('click', () => {
        modalOverlay.classList.add('active');
    });

    const closeBtn = document.getElementById('closeContactExtraBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });
    }

    modalOverlay.addEventListener('click', (e) => {
        if (!e.target.closest('.contact-modal-container')) {
            modalOverlay.classList.remove('active');
        }
    });


    // C. SÉLECTEUR DE COULEUR DE FOND
    const colorPickerContainer = document.createElement('div');
    colorPickerContainer.id = 'themePickerWidget';
    colorPickerContainer.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        z-index: 999;
        display: flex;
        align-items: center;
        gap: 10px;
        background: rgba(11, 2, 26, 0.9);
        border: 1px solid rgba(0, 240, 255, 0.5);
        padding: 8px 14px;
        border-radius: 8px;
        backdrop-filter: blur(6px);
        font-family: 'Orbitron', sans-serif;
        font-size: 0.75rem;
        color: #00f0ff;
        cursor: pointer;
        box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
        transition: opacity 0.3s ease, transform 0.3s ease;
    `;
    colorPickerContainer.innerHTML = `
        <span>THEME BG</span>
        <input type="color" id="hudColorPicker" value="#8c1eff" style="cursor: pointer; border: none; width: 24px; height: 24px; background: none; pointer-events: none;">
    `;
    document.body.appendChild(colorPickerContainer);

    const colorPicker = document.getElementById('hudColorPicker');
    colorPickerContainer.addEventListener('click', () => {
        colorPicker.click();
    });

    function hexToRgb(hex) {
        let c = hex.replace('#', '');
        if (c.length === 3) c = c.split('').map(x => x + x).join('');
        const num = parseInt(c, 16);
        return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
    }

    colorPicker.addEventListener('input', (e) => {
        const hex = e.target.value;
        const rgb = hexToRgb(hex);

        const styleDyn = document.getElementById('dynamicThemeStyle') || document.createElement('style');
        styleDyn.id = 'dynamicThemeStyle';
        
        styleDyn.innerHTML = `
            body {
                background-image: 
                    radial-gradient(circle at center, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.35) 0%, rgba(10, 2, 25, 0.95) 75%),
                    linear-gradient(to right, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.12) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.12) 1px, transparent 1px) !important;
            }
            .menu-btn {
                background: linear-gradient(135deg, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4), rgba(40, 5, 60, 0.7)) !important;
                border-color: rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.7) !important;
                box-shadow: 0 0 20px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.35), inset 0 0 15px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.25) !important;
            }
            .subtitle {
                color: rgb(${Math.min(255, rgb.r + 60)}, ${Math.min(255, rgb.g + 60)}, ${Math.min(255, rgb.b + 60)}) !important;
            }
        `;
        document.head.appendChild(styleDyn);
    });

    // Observer pour le sélecteur de thème
    const projectsStage = document.getElementById('projectsStage');
    if (projectsStage) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    const isProjectsActive = projectsStage.classList.contains('active');
                    if (isProjectsActive) {
                        colorPickerContainer.style.opacity = '0';
                        colorPickerContainer.style.pointerEvents = 'none';
                    } else {
                        colorPickerContainer.style.opacity = '1';
                        colorPickerContainer.style.pointerEvents = 'auto';
                    }
                }
            });
        });
        observer.observe(projectsStage, { attributes: true });
    }


    // D. RACCOURCI CLAVIER (ÉCHAP)
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModals = document.querySelectorAll('.video-modal-overlay.active, .char-sheet-modal.active, .project-detail-modal.active, .lightbox-modal.active, .contact-modal.active');
            activeModals.forEach(modal => {
                modal.classList.remove('active');
                if (modal.id === 'videoModal') {
                    const iframe = document.getElementById('youtubeIframe');
                    if (iframe) iframe.src = iframe.src;
                }
            });
        }
    });


    // E. SON DE CLIC RÉTRO FEUTRÉ
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    function playUiBeep() {
        try {
            if (audioCtx.state === 'suspended') audioCtx.resume();
            
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(320, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(180, audioCtx.currentTime + 0.04);
            
            gain.gain.setValueAtTime(0.012, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);
            
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            
            osc.start();
            osc.stop(audioCtx.currentTime + 0.04);
        } catch (e) {}
    }

    document.addEventListener('click', (e) => {
        if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.project-bubble')) {
            playUiBeep();
        }
    });


    // ==========================================
    // F. EFFETS DE SURVOL (PAILLETTES & POPUP INFOBULLE)
    // ==========================================

    // 1. Création du composant Infobulle (Tooltip)
    const tooltip = document.createElement('div');
    tooltip.id = 'extraHoverTooltip';
    tooltip.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 100000;
        background: rgba(15, 3, 35, 0.9);
        border: 1px solid #00f0ff;
        box-shadow: 0 0 15px rgba(0, 240, 255, 0.5), inset 0 0 10px rgba(180, 50, 255, 0.3);
        color: #e0b0ff;
        font-family: 'Orbitron', sans-serif;
        font-size: 0.82rem;
        padding: 8px 14px;
        border-radius: 6px;
        opacity: 0;
        transform: translate(-50%, -130%);
        transition: opacity 0.2s ease, transform 0.15s ease-out;
        white-space: nowrap;
        backdrop-filter: blur(4px);
    `;
    document.body.appendChild(tooltip);

    // Textes pour chaque bouton
    const tooltipsData = [
        { selector: '.btn-projets', text: "Liste de quelques projets que j'ai pu réaliser" },
        { selector: '.btn-demo', text: "Vidéo de présentation de certains de mes projets." },
        { selector: '.btn-about', text: "Quelques informations sur moi" }
    ];

    // 2. Générateur de paillettes (Sparkles) au survol
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: ${Math.random() * 6 + 3}px;
            height: ${Math.random() * 6 + 3}px;
            background: ${Math.random() > 0.5 ? '#00f0ff' : '#d488ff'};
            box-shadow: 0 0 10px ${Math.random() > 0.5 ? '#00f0ff' : '#d488ff'};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            animation: sparkleAnim 0.6s ease-out forwards;
        `;
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 600);
    }

    // Ajout du CSS dynamique pour l'animation des paillettes
    const sparkleStyle = document.createElement('style');
    sparkleStyle.innerHTML = `
        @keyframes sparkleAnim {
            0% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
            100% { opacity: 0; transform: translate(calc(-50% + ${(Math.random() - 0.5) * 60}px), calc(-50% + ${(Math.random() - 0.5) * 60}px)) scale(0) rotate(180deg); }
        }
    `;
    document.head.appendChild(sparkleStyle);

    // 3. Liaison des événements de survol
    tooltipsData.forEach(item => {
        const btn = document.querySelector(item.selector);
        if (!btn) return;

        let sparkleInterval = null;

        btn.addEventListener('mouseenter', () => {
            // Activer la popup
            tooltip.textContent = item.text;
            tooltip.style.opacity = '1';

            // Lancer la génération de paillettes en continu
            sparkleInterval = setInterval(() => {
                const rect = btn.getBoundingClientRect();
                const rx = rect.left + Math.random() * rect.width;
                const ry = rect.top + Math.random() * rect.height;
                createSparkle(rx, ry);
            }, 60);
        });

        btn.addEventListener('mousemove', (e) => {
            // La popup suit la souris
            tooltip.style.left = `${e.clientX}px`;
            tooltip.style.top = `${e.clientY}px`;
            
            // Génération ponctuelle au mouvement
            if (Math.random() < 0.3) {
                createSparkle(e.clientX, e.clientY);
            }
        });

        btn.addEventListener('mouseleave', () => {
            // Masquer la popup et stopper les paillettes
            tooltip.style.opacity = '0';
            if (sparkleInterval) clearInterval(sparkleInterval);
        });
    });

});
