document.addEventListener("DOMContentLoaded", () => {
    const view = document.getElementById("view");
    const tabs = document.querySelectorAll("nav .tab");

    // funzione per caricare un file html dentro la view
    async function loadView(file) {
        try {
            const res = await fetch(file);
            if (!res.ok) throw new Error(`Errore: ${res.status}`);
            const html = await res.text();
            view.innerHTML = html;
        } catch (err) {
            view.innerHTML = `<p style="color:red">Impossibile caricare ${file}: ${err.message}</p>`;
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
});
