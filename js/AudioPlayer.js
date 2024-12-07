/**
 * Function to manage audio playback, volume, and looping
 * @param {string} action - Action to perform: "play", "pause", "stop", "volume", "loop"
 * @param {number} volume - (Optional) Volume level between 0 and 1
 * @param {boolean} loop - (Optional) Whether to loop the audio (default: false)
 */


function handleAudio(audioFile, action, volume = 1.0, targetVolume = 1.0, lerpSpeed = 0.01) {
    let lerpInterval;
    // .volume is not working on Mobile Device
    if (!audioFile) {
        //console.warn("Audio file not found. Skipping action:", action);
        console.log("no audio founded");
        return; // Exit the function if the audio file is not defined
    }
    switch (action) {
        case "play":
            audioFile.currentTime = 0;
            audioFile.volume = volume; // not working with Mobile device
            audioFile.muted = false;
            break;
        case "playLoop":
            audioFile.currentTime = 0;
            audioFile.volume = volume; // not working with Mobile device
            audioFile.muted = false;
            console.log("play in loop");
            break;
        case "playCurrent":
            audioFile.volume = volume;
            audioFile.muted = false;
            break;
        case "init":
            audioFile.currentTime = 0;
            audioFile.muted = true;
            break;
        case "pause":
            audioFile.muted = true;
            break;

        case "lerpVolume": // not working with mobile
            if (lerpInterval) {
                clearInterval(lerpInterval); // Clear any existing lerp interval
            }
            lerpInterval = setInterval(() => {
                const currentVolume = audioFile.volume;
                const delta = targetVolume - currentVolume;
                if (Math.abs(delta) < lerpSpeed) { // Close enough to target
                    audioFile.volume = targetVolume; // Set to exact target volume
                    clearInterval(lerpInterval); // Stop lerping
                } else {
                    audioFile.volume = currentVolume + delta * lerpSpeed; // Lerp toward target
                }
            }, intervalTime); // Frequency of updates
            break;

        default:
            console.warn("Invalid audio action");
    }
}
