function copyCommand() {
    const command = document.getElementById("command").value;
    navigator.clipboard.writeText(command).then(() => {
        alert("Command copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy command: ", err);
    });
}

function writeCommand() {
    var arch = document.getElementById("arch").value;
    var ram = document.getElementById("ram").value;
    var disk = document.getElementById("disk").value;
    var cd = document.getElementById("cd").value;
    var boot = document.getElementById("boot").value;
    var command = `qemu-system-${arch} -m ${ram} -hda ${disk} -cdrom ${cd} -boot ${boot}`;
    document.getElementById("command").value = command;
}