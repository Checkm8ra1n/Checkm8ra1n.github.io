document.addEventListener("DOMContentLoaded", () => {

    // Controllo iOS / iPadOS
    function isIOS() {
        const ua = navigator.userAgent || navigator.vendor || window.opera;
        if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) return true;
        // iPadOS 13+ può riportare "MacIntel" — controlla il touch capability
        if (navigator.platform === 'MacIntel' && navigator.maxTouchPoints && navigator.maxTouchPoints > 1) return true;
        return false;
    }

    // Se non è iOS/iPadOS, sostituisci tutto il body con il messaggio e interrompi l'esecuzione
    if (!isIOS()) {
        document.documentElement.innerHTML = `
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width,initial-scale=1">
                <title>iOS Required</title>
                <style>
                    html,body{height:100%;margin:0;background:#232323;color:#fff;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;display:flex;align-items:center;justify-content:center}
                    .msg{padding:24px;text-align:center;border-radius:8px;background:rgba(255,255,255,0.03);max-width:90%;box-shadow:0 4px 20px rgba(0,0,0,0.6)}
                    h1{margin:0 0 8px;font-size:1.6rem}
                </style>
            </head>
            <body>
                <div class="msg">
                    <h1>You must view this page from iOS</h1>
                </div>
            </body>
        `;
        return;
    }

    const view = document.getElementById("view");
    const tabs = document.querySelectorAll("nav .tab");

    // Funzione per caricare e parsare l'XML delle app
    async function loadApps() {
        try {
            const response = await fetch('Apps.xml');
            const xmlText = await response.text();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
            
            const appsContainer = document.getElementById('apps-container');
            const categories = xmlDoc.getElementsByTagName('category');

            Array.from(categories).forEach(category => {
                const categoryName = category.getElementsByTagName('name')[0].textContent;
                const apps = category.getElementsByTagName('app');
                
                const categoryDiv = document.createElement('div');
                categoryDiv.className = 'category';
                
                const categoryContent = document.createElement('div');
                categoryContent.className = 'category-content';
                
                categoryDiv.innerHTML = `<h2>${categoryName}</h2>`;
                categoryDiv.appendChild(categoryContent);

                Array.from(apps).forEach(app => {
                    const title = app.getElementsByTagName('title')[0].textContent;
                    const developer = app.getElementsByTagName('developer')[0].textContent;
                    const icon = app.getElementsByTagName('icon')[0].textContent;
                    const link = app.getElementsByTagName('link')[0].textContent;

                    const appElement = document.createElement('a');
                    appElement.className = 'app';
                    appElement.href = link;
                    appElement.target = '_blank';
                    appElement.innerHTML = `
                        <img src="Icons/${icon}" alt="${title}">
                        <div class="app-info">
                            <h3>${title} - <span class="developer">${developer}</span></h3>
                        </div>
                    `;
                    categoryContent.appendChild(appElement);

                    // Modifica la creazione dell'elemento app nel loadApps()
                    appElement.addEventListener('click', (e) => {
                        e.preventDefault();
                        showDownloadSheet({
                            title: title,
                            developer: developer,
                            icon: icon,
                            description: app.getElementsByTagName('description')[0].textContent,
                            link: link,
                            downloadType: app.getElementsByTagName('download')[0].getAttribute('type')
                        });
                    });
                });

                appsContainer.appendChild(categoryDiv);
            });
        } catch (error) {
            console.error('Errore nel caricamento delle app:', error);
        }
    }

    // click su ogni tab
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            loadView(tab.dataset.view);
        });
    });

    // carica la prima view di default
    if (tabs.length > 0) {
        tabs[0].classList.add("active");
        loadView(tabs[0].dataset.view);
    }

    // Modifica la funzione loadView per caricare le app quando necessario
    async function loadView(file) {
        try {
            const res = await fetch(file);
            if (!res.ok) throw new Error(`Errore: ${res.status}`);
            const html = await res.text();
            view.innerHTML = html;
            
            // Se stiamo caricando la pagina apps.html, carica le app
            if (file === 'apps.html') {
                await loadApps();
            }
        } catch (err) {
            view.innerHTML = `<p style="color:red">Impossibile caricare ${file}: ${err.message}</p>`;
        }
    }

    // Aggiungi queste nuove funzioni
    function showDownloadSheet(appData) {
        // Carica download.html se non è già stato caricato
        if (!document.querySelector('.download-sheet')) {
            fetch('download.html')
                .then(res => res.text())
                .then(html => {
                    document.body.insertAdjacentHTML('beforeend', html);
                    populateDownloadSheet(appData);
                });
        } else {
            populateDownloadSheet(appData);
        }
    }

    function populateDownloadSheet(appData) {
        const sheet = document.querySelector('.download-sheet');
        document.getElementById('app-icon').src = `Icons/${appData.icon}`;
        document.getElementById('app-title').textContent = appData.title;
        document.getElementById('app-developer').textContent = appData.developer;
        document.getElementById('app-description').textContent = appData.description;
        
        const downloadButton = document.getElementById('download-button');
        downloadButton.textContent = appData.downloadType === 'site' ? 'Visit Site' : 'Download';
        downloadButton.onclick = () => window.open(appData.link, '_blank');
        
        // Mostra la sheet
        requestAnimationFrame(() => {
            sheet.classList.add('visible');
        });
    }

    function closeDownloadSheet() {
        const sheet = document.querySelector('.download-sheet');
        sheet.classList.remove('visible');
    }
});
