// ==========================================
// EXTRAS.JS - Améliorations, UI, Thèmes, Sons & Formspree
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

            <form class="contact-form" id="contactExtraForm">
                <label for="extraEmail">VOTRE ADRESSE E-MAIL</label>
                <input type="email" name="email" id="extraEmail" placeholder="votre.email@exemple.com" required>

                <label for="extraSubject">SUJET DU MESSAGE</label>
                <input type="text" name="subject" id="extraSubject" placeholder="Proposition d'alternance / projet..." required>

                <label for="extraMessage">VOTRE MESSAGE</label>
                <textarea name="message" id="extraMessage" placeholder="Écrivez votre message ici..." required></textarea>

                <button type="submit" class="submit-btn" id="submitFormBtn">ENVOYER LE MESSAGE ➔</button>
                <p id="formStatusMsg" style="font-family: 'Orbitron', sans-serif; font-size: 0.85rem; margin-top: 10px; text-align: center; display: none;"></p>
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

    // Envoi asynchrone AJAX via Formspree
    const form = document.getElementById('contactExtraForm');
    const submitBtn = document.getElementById('submitFormBtn');
    const statusMsg = document.getElementById('formStatusMsg');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            submitBtn.disabled = true;
            submitBtn.textContent = "ENVOI EN COURS...";
            statusMsg.style.display = "none";

            const formData = new FormData(form);

            try {
                const response = await fetch(FORMSPREE_ENDPOINT, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    statusMsg.style.color = "#39ff14";
                    statusMsg.textContent = "✔ Message envoyé avec succès ! Je vous répondrai rapidement.";
                    statusMsg.style.display = "block";
                    form.reset();
                    setTimeout(() => {
                        modalOverlay.classList.remove('active');
                        statusMsg.style.display = "none";
                        submitBtn.disabled = false;
                        submitBtn.textContent = "ENVOYER LE MESSAGE ➔";
                    }, 2500);
                } else {
                    throw new Error("Erreur réseau");
                }
            } catch (error) {
                statusMsg.style.color = "#ff2a6d";
                statusMsg.textContent = "✖ Une erreur est survenue. Réessayez ou écrivez à samgueg@gmx.fr";
                statusMsg.style.display = "block";
                submitBtn.disabled = false;
                submitBtn.textContent = "ENVOYER LE MESSAGE ➔";
            }
        });
    }


    // C. SÉLECTEUR DE COULEUR DE FOND
    const colorPickerContainer = document.createElement('div');
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
        transition: all 0.2s ease;
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

});
