// ==========================================
// EXTRAS-MODIFS.JS - Version corrigée et stable
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. Injection des styles CSS pour les flèches et la page de sélection
    const modifsStyle = document.createElement('style');
    modifsStyle.innerHTML = `
        #projectMenuSelection {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 100;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 25px;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.4s ease;
            background: rgba(11, 2, 26, 0.95);
        }
        #projectMenuSelection.active {
            opacity: 1;
            pointer-events: auto;
        }
        .project-selection-container {
            display: flex;
            flex-direction: column;
            gap: 20px;
            width: 90%;
            max-width: 650px;
        }

        .stage-nav-bar { display: none !important; }

        .stage-nav-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(30, 8, 60, 0.85);
            border: 2px solid #00f0ff;
            color: #00f0ff;
            font-size: 1.8rem;
            width: 55px;
            height: 55px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 0.2s;
            z-index: 20;
            box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);
            cursor: pointer;
        }
        .stage-nav-arrow:hover {
            background: #00f0ff;
            color: #0b021a;
            box-shadow: 0 0 35px #00f0ff;
            transform: translateY(-50%) scale(1.1);
        }
        .stage-prev-arrow { left: 20px; }
        .stage-next-arrow { right: 20px; }

        .modal-project-nav-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(30, 8, 60, 0.85);
            border: 2px solid #00f0ff;
            color: #00f0ff;
            font-size: 1.8rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 0.2s;
            z-index: 9500;
            box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);
            cursor: pointer;
        }
        .modal-project-nav-btn:hover {
            background: #00f0ff;
            color: #0b021a;
            box-shadow: 0 0 35px #00f0ff;
            transform: translateY(-50%) scale(1.1);
        }
        .modal-prev-project { left: -25px; }
        .modal-next-project { right: -25px; }
        @media (max-width: 1300px) {
            .modal-prev-project { left: 10px; }
            .modal-next-project { right: 10px; }
        }
    `;
    document.head.appendChild(modifsStyle);

    // 2. Création de la page intermédiaire de sélection des projets
    const projectMenuSelection = document.createElement('div');
    projectMenuSelection.id = 'projectMenuSelection';
    projectMenuSelection.innerHTML = `
        <div class="project-selection-container">
            <button class="menu-btn btn-projets" id="selectGdProgBtn" style="font-size: 2.5rem; padding: 20px 0;">GD & PROG</button>
            <button class="menu-btn btn-projets" id="selectLdBtn" style="font-size: 2.5rem; padding: 20px 0;">LEVEL DESIGN</button>
            <button class="menu-btn btn-projets" id="selectDocsBtn" style="font-size: 2.5rem; padding: 20px 0;">DOCUMENTS</button>
            <button class="back-menu-btn" id="backToMainFromSelectBtn" style="margin-top: 15px; width: 100%; text-align: center; background: rgba(140, 30, 255, 0.3); border: 2px solid #00f0ff; color: #00f0ff; font-family: 'Orbitron', sans-serif; padding: 10px 24px; border-radius: 8px; font-weight: 700;">← RETOUR</button>
        </div>
    `;
    document.body.appendChild(projectMenuSelection);

    // Interception propre du bouton "PROJETS" du menu principal
    const openProjectsBtn = document.getElementById('openProjectsBtn');
    const mainMenu = document.getElementById('mainMenu');
    const titleContainer = document.getElementById('titleContainer');
    const projectsStage = document.getElementById('projectsStage');

    if (openProjectsBtn) {
        openProjectsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.classList.add('curtains-closed');
            setTimeout(() => {
                if (mainMenu) mainMenu.classList.add('hidden');
                if (titleContainer) titleContainer.classList.add('hidden');
                projectMenuSelection.classList.add('active');
                setTimeout(() => document.body.classList.remove('curtains-closed'), 300);
            }, 600);
        });
    }

    const backBtnSelect = document.getElementById('backToMainFromSelectBtn');
    if (backBtnSelect) {
        backBtnSelect.addEventListener('click', () => {
            document.body.classList.add('curtains-closed');
            setTimeout(() => {
                projectMenuSelection.classList.remove('active');
                if (mainMenu) mainMenu.classList.remove('hidden');
                if (titleContainer) titleContainer.classList.remove('hidden');
                setTimeout(() => document.body.classList.remove('curtains-closed'), 300);
            }, 600);
        });
    }

    function openDomainStageDirect(domainId) {
            if (typeof domains === 'undefined') return;
            
            const index = domains.findIndex(d => d.id === domainId);
            if (index !== -1) {
                currentDomainIndex = index;
            }
        
            document.body.classList.add('curtains-closed');
            setTimeout(() => {
                projectMenuSelection.classList.remove('active');
                if (projectsStage) projectsStage.classList.add('active');
        
                // Mettre à jour la scène pendant que les rideaux sont fermés
                if (typeof window.updateStage === 'function') {
                    window.updateStage();
                }
        
                setTimeout(() => {
                    document.body.classList.remove('curtains-closed');
                }, 150);
            }, 400); // Réduction légère du délai pour fluidifier le retour
        }

    const btnGd = document.getElementById('selectGdProgBtn');
    const btnLd = document.getElementById('selectLdBtn');
    const btnDocs = document.getElementById('selectDocsBtn');

    if (btnGd) btnGd.addEventListener('click', () => openDomainStageDirect('gd_prog'));
    if (btnLd) btnLd.addEventListener('click', () => openDomainStageDirect('level_design'));
    if (btnDocs) btnDocs.addEventListener('click', () => openDomainStageDirect('documents'));

    // 3. Gestion des flèches latérales du stage
    if (projectsStage) {
        const prevStageBtn = document.createElement('button');
        prevStageBtn.className = 'stage-nav-arrow stage-prev-arrow';
        prevStageBtn.innerHTML = '◄';

        const nextStageBtn = document.createElement('button');
        nextStageBtn.className = 'stage-nav-arrow stage-next-arrow';
        nextStageBtn.innerHTML = '►';

        projectsStage.appendChild(prevStageBtn);
        projectsStage.appendChild(nextStageBtn);

        prevStageBtn.addEventListener('click', () => {
            if (typeof domains !== 'undefined' && typeof window.updateStage === 'function') {
                currentDomainIndex = (currentDomainIndex - 1 + domains.length) % domains.length;
                window.updateStage();
            }
        });

        nextStageBtn.addEventListener('click', () => {
            if (typeof domains !== 'undefined' && typeof window.updateStage === 'function') {
                currentDomainIndex = (currentDomainIndex + 1) % domains.length;
                window.updateStage();
            }
        });
    }

});
