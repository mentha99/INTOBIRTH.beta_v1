function instructionScreenShow(area) {
    switch (area) {
        case "bottom":
            instructionImage.classList.add('hidden');
            instructionTopArea.classList.add('hidden');
            instructionBottomArea.classList.remove('hidden');
            instructionScreen.style.backgroundColor = "transparent";
            instructionScreen.classList.remove('hidden');
            break;

        case "top":
            instructionImage.classList.add('hidden');
            instructionTopArea.classList.remove('hidden');
            instructionBottomArea.classList.add('hidden');
            instructionScreen.style.backgroundColor = "transparent";
            instructionScreen.classList.remove('hidden');
            break;

        case "reset":
            instructionScreen.classList.add('hidden');
            break;

        case "viewAll":
            instructionImage.classList.remove('hidden');
            instructionTopArea.classList.remove('hidden');
            instructionBottomArea.classList.remove('hidden');
            instructionScreen.style.backgroundColor = "black";
            instructionScreen.classList.remove('hidden');
            break;
    }
}

//* * * * * * * * * * * * Instruction Button * * * * * * * * * * * *
const instructionIcon = document.getElementById('instructionIcon');
const backIcon = document.getElementById('backIcon');

let isInstructionShow = false;
document.querySelector('.info-button-container').addEventListener('click', () => {
    isInstructionShow = !isInstructionShow;
    if (isInstructionShow) {
        instructionScreenShow("viewAll");
    } else {
        instructionScreenShow("reset");
    }

    // Toggle visibility of the icons
    instructionIcon.style.display = isInstructionShow ? 'block' : 'none';
    backIcon.style.display = isInstructionShow ? 'none' : 'block';

});

//* * * * * * * * * * * * Mute Button * * * * * * * * * * * *
const muteIcon = document.getElementById('muteIcon');
const unmuteIcon = document.getElementById('unmuteIcon');
let isMuted = false;
// Handle mute/unmute toggle
document.querySelector('.mute-button-container').addEventListener('click', () => {
    isMuted = !isMuted;
    console.log("isMuted = true");

    // Mute or unmute all audio and video elements
    allAudioElements.forEach((audio) => {
        audio.muted = isMuted; // Set the muted property
    });

    // Toggle visibility of the icons
    muteIcon.style.display = isMuted ? 'block' : 'none';
    unmuteIcon.style.display = isMuted ? 'none' : 'block';
});
