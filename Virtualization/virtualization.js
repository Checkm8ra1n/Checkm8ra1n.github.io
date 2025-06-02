document.addEventListener("DOMContentLoaded", function() {
    const select = document.getElementById("os-selection");
    const osImg = document.getElementById("os-img");

    // Mappa dei software per ogni OS
    const osSoftware = {
        Windows: ["VBox", "VMWare", "qemu", "hyperv"],
        macOS: ["VBox", "VMWare", "Parallels", "qemu", "utm"],
        Linux: ["VBox", "VMWare", "qemu"],
        all: ["VBox", "VMWare", "Parallels", "qemu", "hyperv", "utm"]
    };

    function updateCards(os) {
        // Nascondi tutte le card
        ["VBox", "VMWare", "Parallels", "qemu", "hyperv"].forEach(id => {
            const card = document.getElementById(id);
            if (card) card.style.display = "none";
        });
        // Mostra solo quelle compatibili
        osSoftware[os].forEach(id => {
            const card = document.getElementById(id);
            if (card) card.style.display = "";
        });
    }

    function detectOS() {
        const platform = navigator.platform.toLowerCase();
        if (platform.includes("win")) return "Windows";
        else if (platform.includes("mac")) return "macOS";
        else if (platform.includes("linux")) return "Linux";
        else return "all";
    }

    // Imposta la selezione automatica all'avvio
    const detectedOS = detectOS();
    select.value = detectedOS;
    switch (detectedOS) {
        case "Windows":
            osImg.src = "imgs/windows.png";
            osImg.alt = "Windows Logo";
            osImg.style.width = "54px";
            updateCards("Windows");
            break;
        case "macOS":
            osImg.src = "imgs/mac.png";
            osImg.alt = "macOS Logo";
            osImg.style.width = "54px";
            updateCards("macOS");
            break;
        case "Linux":
            osImg.src = "imgs/linux.png";
            osImg.alt = "Linux Logo";
            osImg.style.width = "54px";
            updateCards("Linux");
            break;
        default:
            osImg.src = "imgs/AllOS.png";
            osImg.alt = "All";
            osImg.style.width = "150px";
            updateCards("all");
    }

    select.addEventListener("change", function() {
        switch (select.value) {
            case "Windows":
                osImg.src = "imgs/windows.png";
                osImg.alt = "Windows Logo";
                osImg.style.width = "54px";
                updateCards("Windows");
                break;
            case "macOS":
                osImg.src = "imgs/mac.png";
                osImg.alt = "macOS Logo";
                osImg.style.width = "54px";
                updateCards("macOS");
                break;
            case "Linux":
                osImg.src = "imgs/linux.png";
                osImg.alt = "Linux Logo";
                osImg.style.width = "54px";
                updateCards("Linux");
                break;
            default:
                osImg.src = "imgs/AllOS.png";
                osImg.alt = "All";
                osImg.style.width = "150px";
                updateCards("all");
        }
    });
});