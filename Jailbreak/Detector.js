document.addEventListener('DOMContentLoaded', function () {
    const checkButton = document.getElementById('checkButton');
    const iosInput = document.getElementById('iosVersionInput');
    const deviceInput = document.getElementById('deviceInput');
    const checkType = document.getElementById('checkType');
    const resultId = 'jb-result';

    // Crea o recupera il div del risultato
    let resultDiv = document.getElementById(resultId);
    if (!resultDiv) {
        resultDiv = document.createElement('div');
        resultDiv.id = resultId;
        resultDiv.style.marginTop = '18px';
        iosInput.parentNode.appendChild(resultDiv);
    }

    // Crea il select per i dispositivi
    let deviceSelect = document.createElement('select');
    deviceSelect.id = 'deviceSelect';
    deviceSelect.style.display = 'none';
    deviceSelect.innerHTML = `
        <option value="">Select your device</option>
        <option value="iPhone 16">iPhone 16 (Pro and Pro Max)</option>
        <option value="iPhone 15">iPhone 15 (Pro and Pro Max)</option>
        <option value="iPhone 14">iPhone 14 (Pro and Pro Max)</option>
        <option value="iPhone 13">iPhone 13 (Pro and Pro Max)</option>
        <option value="iPhone 12">iPhone 12 (Pro and Pro Max)</option>
        <option value="iPhone 11">iPhone 11 (Pro and Pro Max)</option>
        <option value="iPhone Xs/Xr">iPhone Xs/Xr</option>
        <option value="Other">Other</option>
    `;
    deviceInput.parentNode.insertBefore(deviceSelect, iosInput);
    
    // Gestisci la visibilità degli input
    function updateInputs() {
        if (checkType.checked) {
            iosInput.style.display = '';
            deviceInput.style.display = 'none';
            deviceSelect.style.display = 'none';
        } else {
            iosInput.style.display = 'none';
            deviceInput.style.display = 'none';
            deviceSelect.style.display = '';
        }
    }
    updateInputs();
    checkType.addEventListener('change', updateInputs);

    checkButton.addEventListener('click', function () {
        let message = '';
        if (checkType.checked) {
            // Metodo tramite versione iOS
            const iosVersion = iosInput.value.trim();
            const match = iosVersion.match(/^(\d+)(?:\.(\d+))?(?:\.(\d+))?/);
            if (!match) {
                message = 'Please enter a valid iOS version (e.g., 16.5)';
            } else {
                const major = parseInt(match[1], 10);
                const minor = match[2] ? parseInt(match[2], 10) : 0;
                const patch = match[3] ? parseInt(match[3], 10) : 0;

                if (
                    (major < 16) ||
                    (major === 16 && minor <= 5) ||
                    (major === 17 && minor === 0)
                ) {
                    message = "✅ Jailbreak possible for this iOS version!";
                } else if (
                    (major === 16 && ((minor === 6 && (patch === 0 || patch === 1)))) ||
                    (major === 17 && minor >= 1 && minor <= 6)
                ) {
                    message = "⚠️ Only with arm64 devices (A11 and earlier)";
                } else {
                    message = "❌ Jailbreak NOT possible for this iOS version.";
                }
            }
        } else {
            // Metodo tramite device
            switch (deviceSelect.value) {
                case "":
                    message = "Please select your device.";
                    break;
                case "iPhone 16":
                    message = "❌ Jailbreak not possible for iPhone 16.";
                    break;
                case "iPhone 15":
                    message = "⚠️ Only if you are on iOS 17.0";
                    break;
                case "iPhone 14":
                case "iPhone 13":
                case "iPhone 12":
                case "iPhone 11":
                case "iPhone Xs/Xr":
                    message = "⚠️ Only if you are on iOS 16.5 or earlier";
                    break;
                default:
                    message = "✅ Your device is jailbreakable";
            }
        }
        resultDiv.textContent = message;
    });
});