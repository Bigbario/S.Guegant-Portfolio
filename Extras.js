// ==========================================
// EXTRAS.JS - UI, Thèmes, Sons, Paillettes, Tooltips Agrandis, Modale CV & Onde Spatio-Temporelle Pure
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
    const cvBtn = document.createElement('button');
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


    // B. CRÉATION DE LA MODALE DU CV
    const cvModalOverlay = document.createElement('div');
    cvModalOverlay.className = 'contact-modal';
    cvModalOverlay.id = 'cvModal';
    cvModalOverlay.innerHTML = `
        <div class="contact-modal-container" style="width: 85vw; max-width: 900px; height: 85vh; display: flex; flex-direction: column;">
            <button class="close-btn" id="closeCvModalBtn">FERMER [X]</button>
            <h2 style="font-family: 'Orbitron', sans-serif; color: #00f0ff; font-size: 1.8rem; border-bottom: 2px solid rgba(0, 240, 255, 0.4); padding-bottom: 10px; margin-bottom: 15px;">MON CV - SAMUEL GUEGANT</h2>
            
            <div style="flex-grow: 1; width: 100%; border: 1px solid rgba(0, 240, 255, 0.5); border-radius: 8px; overflow: hidden; background: #000;">
                <embed src="Galleries/Guegant_Samuel_CV.pdf" type="application/pdf" width="100%" height="100%">
            </div>

            <div style="margin-top: 15px; display: flex; justify-content: flex-end;">
                <a href="Galleries/Guegant_Samuel_CV.pdf" download="Guegant_Samuel_CV.pdf" class="submit-btn" style="text-decoration: none; text-align: center; padding: 10px 20px; margin-top: 0;">
                    📥 TÉLÉCHARGER LE CV ➔
                </a>
            </div>
        </div>
    `;
    document.body.appendChild(cvModalOverlay);

    cvBtn.addEventListener('click', () => {
        cvModalOverlay.classList.add('active');
    });

    const closeCvBtn = document.getElementById('closeCvModalBtn');
    if (closeCvBtn) {
        closeCvBtn.addEventListener('click', () => {
            cvModalOverlay.classList.remove('active');
        });
    }

    cvModalOverlay.addEventListener('click', (e) => {
        if (!e.target.closest('.contact-modal-container')) {
            cvModalOverlay.classList.remove('active');
        }
    });


    // C. CRÉATION DE LA MODALE DE CONTACT FORMSPREE
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


    // D. SÉLECTEUR DE COULEUR DE FOND
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
        cursor: none !important;
        box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
        transition: opacity 0.3s ease, transform 0.3s ease;
    `;
    colorPickerContainer.innerHTML = `
        <span>THEME BG</span>
        <input type="color" id="hudColorPicker" value="#8c1eff" style="cursor: none !important; border: none; width: 24px; height: 24px; background: none; pointer-events: none;">
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


    // E. RACCOURCI CLAVIER (ÉCHAP)
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const activeModals = document.querySelectorAll('.video-modal-overlay.active, .char-sheet-modal.active, .project-detail-modal.active, .lightbox-modal.active, .contact-modal.active, #cvModal.active');
            activeModals.forEach(modal => {
                modal.classList.remove('active');
                if (modal.id === 'videoModal') {
                    const iframe = document.getElementById('youtubeIframe');
                    if (iframe) iframe.src = iframe.src;
                }
            });
        }
    });


    // F. SONS (CLIC RÉTRO & EXPLOSION FUSÉE)
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

    function playExplosionSound() {
        try {
            if (audioCtx.state === 'suspended') audioCtx.resume();

            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(160, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(20, audioCtx.currentTime + 0.35);

            gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.35);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + 0.35);
        } catch (e) {}
    }

    document.addEventListener('click', (e) => {
        if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.project-bubble')) {
            playUiBeep();
        }
    });


    // ==========================================
    // G. EFFETS DE SURVOL (PAILLETTES & TOOLTIPS AGRANDIS)
    // ==========================================

    const tooltipsData = [
        { selector: '.btn-projets', text: "Liste de quelques projets que j'ai pu réaliser" },
        { selector: '.btn-demo', text: "Vidéo de présentation de certains de mes projets." },
        { selector: '.btn-about', text: "Quelques informations sur moi" }
    ];

    const globalTooltip = document.createElement('div');
    globalTooltip.style.cssText = `
        position: fixed;
        background: rgba(15, 3, 35, 0.96);
        border: 2px solid #00f0ff;
        box-shadow: 0 0 20px rgba(0, 240, 255, 0.5), inset 0 0 12px rgba(180, 50, 255, 0.3);
        color: #ffffff;
        font-family: 'Orbitron', sans-serif;
        font-size: 0.95rem;
        padding: 12px 18px;
        border-radius: 8px;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s ease, transform 0.2s ease;
        transform: scale(0.9);
        white-space: nowrap;
        z-index: 99999;
        backdrop-filter: blur(6px);
    `;
    document.body.appendChild(globalTooltip);

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

    const sparkleStyle = document.createElement('style');
    sparkleStyle.innerHTML = `
        @keyframes sparkleAnim {
            0% { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
            100% { opacity: 0; transform: translate(calc(-50% + ${(Math.random() - 0.5) * 60}px), calc(-50% + ${(Math.random() - 0.5) * 60}px)) scale(0) rotate(180deg); }
        }
        @keyframes screenShake {
            0% { transform: translate(0, 0); }
            20% { transform: translate(-8px, 5px); }
            40% { transform: translate(8px, -5px); }
            60% { transform: translate(-5px, -3px); }
            80% { transform: translate(5px, 2px); }
            100% { transform: translate(0, 0); }
        }
        .shake-screen {
            animation: screenShake 0.35s cubic-bezier(0.36, 0.07, 0.19, 0.97);
        }
    `;
    document.head.appendChild(sparkleStyle);

    tooltipsData.forEach(item => {
        const btn = document.querySelector(item.selector);
        if (!btn) return;

        let sparkleInterval = null;

        btn.addEventListener('mouseenter', () => {
            globalTooltip.textContent = item.text;
            globalTooltip.style.opacity = '1';
            globalTooltip.style.transform = 'scale(1)';

            const rect = btn.getBoundingClientRect();
            globalTooltip.style.left = `${rect.right + 15}px`;
            globalTooltip.style.top = `${rect.top}px`;

            sparkleInterval = setInterval(() => {
                const r = btn.getBoundingClientRect();
                const rx = r.left + Math.random() * r.width;
                const ry = r.top + Math.random() * r.height;
                createSparkle(rx, ry);
            }, 60);
        });

        btn.addEventListener('mousemove', (e) => {
            if (Math.random() < 0.3) {
                createSparkle(e.clientX, e.clientY);
            }
        });

        btn.addEventListener('mouseleave', () => {
            globalTooltip.style.opacity = '0';
            globalTooltip.style.transform = 'scale(0.9)';
            if (sparkleInterval) clearInterval(sparkleInterval);
        });
    });


    // ==========================================
    // H. DÉFORMATION ESPACE-TEMPS (ONDE LENTE ET PURE SANS ANNEAUX)
    // ==========================================

    const svgFilterHTML = `
        <svg style="position: absolute; width: 0; height: 0; pointer-events: none;" aria-hidden="true">
            <filter id="spacetimeDistortion">
                <feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="3" result="noise" />
                <feDisplacementMap id="spacetimeDisplacement" in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" />
            </filter>
        </svg>
    `;
    const filterContainer = document.createElement('div');
    filterContainer.innerHTML = svgFilterHTML;
    document.body.appendChild(filterContainer);

    const bgGrid = document.querySelector('.bg-grid') || document.body;

    function triggerSpacetimeDistortion(x, y) {
        const displacement = document.getElementById('spacetimeDisplacement');
        bgGrid.style.filter = "url('#spacetimeDistortion')";

        let maxScale = 140;
        if (displacement) displacement.setAttribute('scale', maxScale);

        // Onde lente et progressive (2 secondes) pour voir la grille s'étirer et onduler en douceur
        let duration = 2000;
        let startTime = performance.now();

        function animateResorption(now) {
            let elapsed = now - startTime;
            let progress = elapsed / duration;

            if (progress < 1) {
                let currentScale = maxScale * (1 - progress);
                if (displacement) displacement.setAttribute('scale', currentScale);
                requestAnimationFrame(animateResorption);
            } else {
                if (displacement) displacement.setAttribute('scale', 0);
                bgGrid.style.filter = "none";
            }
        }
        requestAnimationFrame(animateResorption);
    }

    function triggerScreenShake() {
        document.body.classList.add('shake-screen');
        setTimeout(() => {
            document.body.classList.remove('shake-screen');
        }, 350);
    }

    function createExplosionConfetti(x, y) {
        const confettiCount = 24;
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 100 + 40;
            const tx = Math.cos(angle) * speed;
            const ty = Math.sin(angle) * speed;

            confetti.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: ${Math.random() * 8 + 4}px;
                height: ${Math.random() * 8 + 4}px;
                background: ${Math.random() > 0.5 ? '#00f0ff' : (Math.random() > 0.5 ? '#d488ff' : '#ffd700')};
                box-shadow: 0 0 10px #ffffff;
                border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
                pointer-events: none;
                z-index: 99999;
                transition: transform 0.6s cubic-bezier(0.15, 0.85, 0.35, 1.2), opacity 0.6s ease-in;
            `;
            document.body.appendChild(confetti);

            requestAnimationFrame(() => {
                confetti.style.transform = `translate(${tx}px, ${ty}px) rotate(${Math.random() * 360}deg) scale(0.2)`;
                confetti.style.opacity = '0';
            });

            setTimeout(() => confetti.remove(), 600);
        }
    }

    let activeRocketCount = 0;
    let nextRocketTimeout = null;

    function spawnRocket(immediate = false) {
        if (activeRocketCount >= 1 || document.querySelector('.contact-modal.active, .video-modal-overlay.active, .char-sheet-modal.active, .project-detail-modal.active, .lightbox-modal.active, #cvModal.active')) {
            if (!immediate) scheduleNextRocket();
            return;
        }

        activeRocketCount++;
        const rocket = document.createElement('div');
        const startX = Math.random() * (window.innerWidth - 120) + 60;
        
        rocket.innerHTML = '🚀';
        rocket.style.cssText = `
            position: fixed;
            left: ${startX}px;
            bottom: -50px;
            font-size: 1.6rem;
            pointer-events: auto;
            cursor: none !important;
            z-index: 9997;
            user-select: none;
            transform: rotate(-90deg);
            filter: drop-shadow(0 0 10px rgba(0, 240, 255, 0.9));
        `;
        document.body.appendChild(rocket);

        let currentY = -50;
        const speedY = Math.random() * 1.6 + 1.4;
        let isAlive = true;

        function destroyRocket(respawnInstant = false) {
            if (!isAlive) return;
            isAlive = false;
            rocket.remove();
            activeRocketCount = Math.max(0, activeRocketCount - 1);

            if (respawnInstant) {
                if (nextRocketTimeout) clearTimeout(nextRocketTimeout);
                nextRocketTimeout = setTimeout(() => spawnRocket(true), 500);
            } else {
                scheduleNextRocket();
            }
        }

        rocket.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!isAlive) return;

            const rect = rocket.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;

            triggerSpacetimeDistortion(cx, cy);
            createExplosionConfetti(cx, cy);
            triggerScreenShake();
            playExplosionSound();
            
            destroyRocket(true);
        });

        function animateRocket() {
            if (!isAlive) return;

            currentY += speedY;
            rocket.style.bottom = `${currentY}px`;

            if (currentY > window.innerHeight + 80) {
                destroyRocket(false);
                return;
            }

            requestAnimationFrame(animateRocket);
        }

        requestAnimationFrame(animateRocket);
    }

    function scheduleNextRocket() {
        if (nextRocketTimeout) clearTimeout(nextRocketTimeout);
        const randomDelay = Math.random() * 4000 + 4000;
        nextRocketTimeout = setTimeout(() => {
            spawnRocket();
        }, randomDelay);
    }

    setTimeout(spawnRocket, 3000);

});
