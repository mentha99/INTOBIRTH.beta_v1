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
    backIcon.style.display = isInstructionShow ? 'block' : 'none';
    instructionIcon.style.display = isInstructionShow ? 'none' : 'block';

});

//* * * * * * * * * * * * Mute Button * * * * * * * * * * * *
const muteIcon = document.getElementById('muteIcon');
const unmuteIcon = document.getElementById('unmuteIcon');
let isMuted = false;
let hasMutedOrNot = false;
// Handle mute/unmute toggle

document.querySelector('.mute-button-container').addEventListener('click', () => {

    isMuted = !isMuted;
    console.log("isMuted = true");

    if (isMuted) {
        Object.keys(allAudioElements).forEach((key) => {
            const audioElement = allAudioElements[key];
            if (audioElement) {
                // Remove the element from the DOM
                audioElement.remove();
                console.log(`Removed element: ${key}`);
            }
            // Reset the reference to null
            allAudioElements[key] = null;
        });
        allAudioElements = [];
    } else {
        createAudioElements();
        getDOMAudioElement();
        if (MobileDeviceOrNot) {
            //mobile device can not use volume control
            handleAudio(BGM_inWild_s10, "playLoop");
            console.log("BGM for mobile start playing again");
        } else {
            const PC_BGMVolume = getPC_BGMVolume();
            handleAudio(BGM_inWild, "playLoop", PC_BGMVolume);
        }
    }

    // Toggle visibility of the icons
    muteIcon.style.display = isMuted ? 'block' : 'none';
    unmuteIcon.style.display = isMuted ? 'none' : 'block';
});


function getPC_BGMVolume() {
    if (currentFrame() >= 0 && currentFrame() < pathShow) {
        return 0.08;
    } else if (currentFrame() >= pathShow && currentFrame() < peopleShow) {
        return 0.04;
    } else if (currentFrame() >= peopleShow && currentFrame() < candleBlow) {
        return 0.15;
    } else if (currentFrame() >= candleBlow && currentFrame() <= totalFrame) {
        return 0.35;
    }
}

// Array of audio element configurations
const audioConfigs = [
    { id: "BGM_inWild", src: "audio/BGM_EATEOT.mp3" },
    { id: "SFX_candleLitUp", src: "audio/SFX_candleLitUp.mp3" },
    { id: "SFX_candleBurn", src: "audio/SFX_candleBurn.mp3" },
    { id: "SFX_grassWave", src: "audio/SFX_grassWave.mp3" },
    { id: "SFX_grassGrow", src: "audio/SFX_grassGrow.mp3" },
    { id: "SFX_candleHum", src: "audio/SFX_candleHumming.mp3" },
    { id: "SFX_candleBlow", src: "audio/SFX_candleBlow.mp3" },
    { id: "SFX_blowBreath", src: "audio/SFX_blowBreath.mp3" },
    { id: "SFX_grassWaveTurnAround", src: "audio/SFX_grassWaveTurnAround.mp3" },
    { id: "SFX_pathExtend", src: "audio/SFX_pathExtend.mp3" },
    { id: "SFX_stepCandleBlow", src: "audio/SFX_stepCandleBlow.mp3" },
    { id: "SFX_turnAround", src: "audio/SFX_turnAround.mp3" },
    { id: "SFX_turnAround2", src: "audio/SFX_turnAround2.mp3" },
    { id: "SFX_windPeopleDis", src: "audio/SFX_windPeopleDisappear.mp3" },
    { id: "BIRTH_Aunt", src: "audio/Birth_Aunt.mp3" },
    { id: "BIRTH_Dad", src: "audio/Birth_Dad.mp3" },
    { id: "BIRTH_Ella", src: "audio/Birth_Ella.mp3" },
    { id: "BIRTH_Mom", src: "audio/Birth_Mom.mp3" },
    { id: "BIRTH_Uncle", src: "audio/Birth_Uncle.mp3" },
    { id: "SFX_step1", src: "audio/SFX_step1.mp3" },
    { id: "SFX_step2", src: "audio/SFX_step2.mp3" },
    { id: "SFX_step3", src: "audio/SFX_step3.mp3" },
    { id: "SFX_step4", src: "audio/SFX_step4.mp3" },
    { id: "BGM_inWild_s10", src: "audio/forMobile/BGM_EATEOT_s10.mp3" },
    { id: "SFX_candleHum_s12", src: "audio/forMobile/SFX_candleHumming_s12.mp3" }
];

// Function to create audio elements dynamically
function createAudioElements() {
    audioConfigs.forEach(config => {
        const audio = document.createElement("audio"); // Create the audio element
        audio.id = config.id; // Set the ID
        audio.src = config.src; // Set the source
        audio.autoplay = true; // Set autoplay
        audio.muted = true; // Set muted
        audio.loop = true; // Set looping
        audio.preload = "auto"; // Preload the audio
        
        // Append the audio element to the body (or another container)
        document.body.appendChild(audio);
    });
}

// Call the function to add the audio elements to the DOM

