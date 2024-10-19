window.onload = function() {
    var userAgent = navigator.userAgent.toLowerCase();
    var osName = "unknown";
    var osDetectedText = ""; // Variabile per salvare l'OS rilevato
    var osContentDiv = document.getElementById("osContent");
    var osDropdown = document.getElementById("osDropdown");
    var osDetectionElement = document.querySelector(".os-detection p");

    // Rilevamento automatico dell'OS
    detectOS();

    // Cambia il contenuto dinamico quando l'utente seleziona un'opzione diversa dal dropdown
    osDropdown.addEventListener('change', function() {
        var selectedOS = osDropdown.value;
        if (selectedOS === "windows") {
            loadContent("Palera1n/other.html");
            loadCSS("Palera1n/os.css");
        } else if (selectedOS === "mac") {
            loadContent("Palera1n/mac.html");
            loadCSS("Palera1n/os.css");
        } else if (selectedOS === "linux") {
            loadContent("Palera1n/linux.html");
            loadCSS("Palera1n/os.css");
        } else {
            // Auto-detect OS
            detectOS();
        }
    });

    // Funzione per rilevare l'OS e cambiare il testo solo una volta
    function detectOS() {
        if (userAgent.indexOf("mac") !== -1) {
            osName = "mac";
            loadContent("Palera1n/mac.html");
            loadCSS("Palera1n/os.css");
        } else if (userAgent.indexOf("linux") !== -1) {
            osName = "linux";
            loadContent("Palera1n/linux.html");
            loadCSS("Palera1n/os.css");
        } else {
            // Default to Windows in else block
            osName = "windows";
            loadContent("Palera1n/other.html");
            loadCSS("Palera1n/os.css");
        }
        // Cambia il testo per indicare che l'OS è stato rilevato
        osDetectedText = "OS detected: " + osName;
        osDetectionElement.innerText = osDetectedText; // Aggiorna il testo di rilevamento una sola volta
        console.log("Detected OS: " + osName);
    }

    // Funzione per caricare il contenuto da file HTML esterno
    function loadContent(osFile) {
        fetch(osFile)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                osContentDiv.innerHTML = data;
            })
            .catch(error => {
                osContentDiv.innerHTML = "Error loading the guide: " + error;
            });
    }

    // Funzione per caricare dinamicamente il CSS in base all'OS
    function loadCSS(cssFile) {
        var head = document.head;
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = cssFile; // Aggiunge il percorso del CSS dinamico
        head.appendChild(link);
    }
}
