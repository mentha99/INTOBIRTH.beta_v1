// Utility function for mobile detection
function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
}

// Get current video frame number
function currentFrame() {
    return Math.round(video2.currentTime * fps)
}

let textEventTriggered = false; // A flag to track the event state
let textEndOrNot = false;


function InteractiveControl() {
    window.addEventListener("keydown", (e) => handleInteraction(e.code));

    // Touch event listeners for mobile interaction
    if (isMobileDevice()) {
        console.log("Area touching simulate");
        document.querySelector('.bottom-area').addEventListener("click", () => handleInteraction("Enter"));
        document.querySelector('.top-area').addEventListener("click", () => handleInteraction("ArrowUp"));
    }

    function handleInteraction(action) {
        //* * * * * * * * * * * * Section 1 | Path Show * * * * * * * * * * * *
        if (currentFrame() >= eyeOpen && currentFrame() < moveStart) {
            if (action === "Enter" && currentFrame() === eyeOpen) {
                const textSequence = [{ text: "" }];
                displayTextSequence(textSequence);
                handleAudio(BGM_inWild, "playLoop", 0);
                handleAudio(BGM_inWild, "lerpVolume", 0, 0.08, lerpSpeed = 0.001);
                playForwardToTarget(eyeOpen, wakeUp, () => {
                    textEndOrNot = false;
                    const textSequence = [
                        { text: "..." },
                        { text: "Where am I?" },
                        { text: "The light is so harsh that everything around me is melting into a blur." },
                        { text: "[Press LEFT/RIGHT on your keyboard<br>or DRAGGING on your screen<br>to look around]" },
                    ];
                    displayTextSequence(textSequence, 0, () => {
                        textEndOrNot = true;
                    });
                });
            } else if (action === "Enter" && currentFrame() >= wakeUp - 1 && currentFrame() <= wakeUp + 1 && textEndOrNot) {
                handleAudio(SFX_grassWave, "playLoop", 0);
                handleAudio(SFX_grassWave, "lerpVolume", 0, 0.25);
                playForwardToTarget(wakeUp, pathShow, () => {
                    textEndOrNot = false;
                    const textSequence = [
                        { text: "Something sounds moving under the ground." },
                        { text: "[Press ENTER to check what's going on]" },
                    ];
                    displayTextSequence(textSequence, 0, () => {
                        textEndOrNot = true;
                    });
                });
            } else if (action === "Enter" && currentFrame() >= pathShow - 1 && textEndOrNot) {
                handleAudio(SFX_grassWave, "stop");
                handleAudio(SFX_grassGrow, "play");
                handleAudio(BGM_inWild, "lerpVolume", 0.08, 0.3);
                playForwardToTarget(pathShow, moveStart, () => {
                    textEndOrNot = false;
                    const textSequence = [
                        { text: "A path!" },
                        { text: "Where dose it lead? Is that where I'm meant to go?" },
                        { text: "There seems to be something standing at the far end,  just out of my focus…" },
                        { text: "Curious. Let's take a close look." },
                        { text: "[Press UP to move a step forward]" },
                    ];
                    displayTextSequence(textSequence, 0, () => {
                        textEndOrNot = true;
                        console.log("text before moving ends");
                    });
                });
            }
        }

        //* * * * * * * * * * * * Section 2 | Walk Close * * * * * * * * * * * *
        else if (currentFrame() >= moveStart && currentFrame() < candleLit) {
            if (action === "ArrowUp" && currentFrame() >= moveStart - 1 && currentFrame() <= moveStart + 1 && textEndOrNot) {
                handleAudio(SFX_step1, "play");
                playForwardToTarget(moveStart, moveSecond, () => {
                    textEndOrNot = false;
                    const textSequence = [
                        { text: "[Press UP to move another step forward]" },
                    ];
                    displayTextSequence(textSequence, 0, () => {
                        textEndOrNot = true;
                    });
                });
            } else if (action === "ArrowUp" && currentFrame() >= moveSecond - 1 && currentFrame() <= moveSecond + 1 && textEndOrNot) {
                handleAudio(SFX_step1, "play");
                playForwardToTarget(moveSecond, moveSecond + stepLength)
            } else if (action === "ArrowUp" && currentFrame() >= moveSecond + stepLength - 1 && currentFrame() <= moveSecond + stepLength + 1) {
                handleAudio(SFX_step1, "play");
                playForwardToTarget(moveSecond + stepLength, moveSecond + stepLength * 2);
            } else if (action === "ArrowUp" && currentFrame() >= moveSecond + stepLength * 2 - 1 && currentFrame() <= moveSecond + stepLength * 2 + 1) {
                handleAudio(SFX_step1, "play");
                playForwardToTarget(moveSecond + stepLength * 2, moveOnGrass1, () => {
                    textEndOrNot = false;
                    const textSequence = [
                        { text: "Strange… It seems that grass is starting to grow on the ground." },
                        { text: "[Press UP to move a step forward]" },
                    ];
                    displayTextSequence(textSequence, 0, () => {
                        textEndOrNot = true;
                    });
                });
            } else if (action === "ArrowUp" && currentFrame() >= moveOnGrass1 - 1 && currentFrame() <= moveOnGrass1 + 1 && textEndOrNot) {
                handleAudio(SFX_step2, "play");
                playForwardToTarget(moveOnGrass1, moveOnGrass1 + stepLength);
            } else if (action === "ArrowUp" && currentFrame() >= moveOnGrass1 + stepLength - 1 && currentFrame() <= moveOnGrass1 + stepLength + 1) {
                handleAudio(SFX_step2, "play");
                playForwardToTarget(moveOnGrass1 + stepLength, moveOnGrass2, () => {
                    textEndOrNot = false;
                    const textSequence = [
                        { text: "I feel like I'm being surrounded by an endless grassland..." },
                        { text: "Am I losing my mind?" },
                        { text: "[Press LEFT or RIGHT to look around]" },
                    ];
                    displayTextSequence(textSequence, 0, () => {
                        textEndOrNot = true;
                    });
                });
            } else if (action === "ArrowUp" && currentFrame() >= moveOnGrass2 - 1 && currentFrame() <= moveOnGrass2 + 1 && textEndOrNot) {
                handleAudio(SFX_step3, "play");
                playForwardToTarget(moveOnGrass2, moveOnGrass2 + stepLength);
            } else if (action === "ArrowUp" && currentFrame() >= moveOnGrass2 + stepLength - 1 && currentFrame() <= moveOnGrass2 + stepLength + 1) {
                handleAudio(SFX_step3, "play");
                playForwardToTarget(moveOnGrass2 + stepLength, moveSeeTable, () => {
                    textEndOrNot = false;
                    const textSequence = [
                        { text: "It's getting crazier!" },
                        { text: "Look at these blooming flowers and towering tress." },
                        { text: "I've definitely lost my mind —and my way." },
                        { text: "Wait… is that a table the path is leading to? Who could have set it up?" },
                        { text: "[Press UP to move a step forward]" },
                    ];
                    displayTextSequence(textSequence, 0, () => {
                        textEndOrNot = true;
                    });
                });
            } else if (action === "ArrowUp" && currentFrame() >= moveSeeTable - 1 && currentFrame() <= moveSeeTable + 1 && textEndOrNot) {
                handleAudio(SFX_step4, "play");
                playForwardToTarget(moveSeeTable, moveSeeTable + stepLength);
            } else if (action === "ArrowUp" && currentFrame() >= moveSeeTable + stepLength - 1 && currentFrame() <= moveSeeTable + stepLength + 1) {
                handleAudio(SFX_step4, "play");
                playForwardToTarget(moveSeeTable + stepLength, moveSeeCake, () => {
                    textEndOrNot = false;
                    const textSequence = [
                        { text: "Now I can see it more clearly. It's a table with a cake on it…" },
                        { text: "… And a red candle on the cake?" },
                        { text: "It must be prepared for someone," },
                        { text: "or else there's no reason to show up in this strange wilderness." },
                        { text: "H-E—Y—! Is anyone H-E—R—E—?" },
                        { text: "Okay, silence." },
                        { text: "[Press UP to move a step forward]" },
                    ];
                    displayTextSequence(textSequence, 0, () => {
                        textEndOrNot = true;
                    });
                });
            } else if (action === "ArrowUp" && currentFrame() >= moveSeeCake - 1 && currentFrame() <= moveSeeCake + 1 && textEndOrNot) {
                handleAudio(SFX_step4, "play");
                playForwardToTarget(moveSeeCake, moveSeeMatch, () => {
                    textEndOrNot = false;
                    const textSequence = [
                        { text: "Hmm... is that a matchbox on the table?" },
                        { text: "It's definitely meant for someone." },
                        { text: "But who would come to celebrate here..." },
                        { text: "Deep in the bushes and forests?" },
                        { text: "I guess it's just me. Nevermind." },
                        { text: "[Press UP to move a step forward]" },
                    ];
                    displayTextSequence(textSequence, 0, () => {
                        textEndOrNot = true;
                    });
                });
            } else if (action === "ArrowUp" && currentFrame() >= moveSeeMatch - 1 && currentFrame() <= moveSeeMatch + 1 && textEndOrNot) {
                handleAudio(SFX_step4, "play");
                playForwardToTarget(moveSeeMatch, candleLit, () => {
                    textEndOrNot = false;
                    const textSequence = [
                        { text: "Yep, a cake, a match, an unlit candle…" },
                        { text: "and even these empty plates." },
                        { text: "I-S— A—N—Y—B—O—D—Y—<br>H——E——R——E——?" },
                        { text: "you know what, i'll give it a try." },
                        { text: "it would be too obvious to be a trap." },
                        { text: "[Press ENTER to light the match]" },
                    ];
                    displayTextSequence(textSequence, 0, () => {
                        textEndOrNot = true;
                        console.log("text before candleLit ends");
                    });
                });
            }
        }


        //* * * * * * * * * * * * Section 3 | Birth Song * * * * * * * * * * * *
        else if (currentFrame() >= candleLit && currentFrame() < candleBlow) {
            if (action === "Enter" && currentFrame() >= candleLit - 1 && currentFrame() <= candleLit + 1 && textEndOrNot) {
                handleAudio(SFX_candleLitUp, "play");
                playForwardToTarget(candleLit, peopleShow, () => {
                    textEndOrNot = false;
                    const textSequence = [
                        { text: "Take a deep breath." },
                        { text: "Huff..." },
                        { text: "Okay, let's go." },
                        { text: "[Press ENTER to light the candle]" },
                    ];
                    displayTextSequence(textSequence, 0, () => {
                        textEndOrNot = true;
                    });
                });
            } else if (currentFrame() >= peopleShow - 1 && currentFrame() <= peopleShow + 1 && textEndOrNot) {
                handleAudio(SFX_candleBurn, "play");
                handleAudio(SFX_candleHum, "playLoop", 0.3);
                handleAudio(BGM_inWild, "lerpVolume", 0.3, 0.04);
                playForwardToTarget(peopleShow, songPlayR1, () => {
                    textEndOrNot = false;
                    const textSequence = [
                        { text: "It's such a strange feeling. I think I've seen her before," },
                        { text: "but I can't remember her name." },
                        { text: "… same for anyone else here." },
                        { text: "Are they real?" },
                        { text: "Or are they ghosts?" },
                        { text: "Also, where is this strange voice coming from?" },
                        { text: "[Press ENTER to focus on the voice]" },
                    ];
                    displayTextSequence(textSequence, 0, () => {
                        textEndOrNot = true;
                    });
                });
            } else if (currentFrame() >= songPlayR1 - 1 && currentFrame() <= songPlayR1 + 1 && textEndOrNot) {
                handleAudio(SFX_candleHum, "lerpVolume", 0.3, 0.2);
                playForwardToTarget(songPlayR1, songPlayR2, () => {
                    textEndOrNot = false;
                    const textSequence = [
                        { text: "Their voices are so so familiar." },
                        { text: "I feel a little bit sad for not being able to recognize them." },
                        { text: "But Shh... Listen," },
                        { text: "I can hear each of their voices now." },
                        { text: "[Press LEFT or RIGHT to move your head around the table]" },
                    ];
                    displayTextSequence(textSequence, 0, () => {
                        textEndOrNot = true;
                    });
                });
            } else if (currentFrame() >= songPlayR2 - 1 && currentFrame() <= songPlayR2 + 1 && textEndOrNot) {
                handleAudio(SFX_candleHum, "lerpVolume", 0.2, 0.35);
                playForwardToTarget(songPlayR2, candleBlow, () => {
                    textEndOrNot = false;
                    const textSequence = [
                        { text: "It stopped. Such a sweet song." },
                        { text: "Wait, if this is for a birthday, does that mean…" },
                        { text: "it's time to blow out the candle and make a wish?" },
                        { text: "[Press ENTER to blow the candle]" },
                    ];
                    displayTextSequence(textSequence, 0, () => {
                        textEndOrNot = true;
                        console.log("text before candleBlow ends");
                    });
                });
            }

            const birthSongVolumeR1 = 0.3;
            const birthSongVolumeR2 = 0.4;
            const birthSongVolumeR3 = 0.5;
            handleAudio(SFX_candleHum, "lerpVolume", 0.3, 0.2);
            birthSongControl(BIRTH_Aunt);
            birthSongControl(BIRTH_Dad);
            birthSongControl(BIRTH_Ella);
            birthSongControl(BIRTH_Mom);
            birthSongControl(BIRTH_Uncle);

            // birth song volume change in different loop
            function birthSongControl(songAudio) {
                if (action === "Enter" && currentFrame() >= songPlayR1 - 1 && currentFrame() <= songPlayR1 + 1) {
                    handleAudio(songAudio, "play", birthSongVolumeR1);
                    playForwardToTarget(songPlayR1, songPlayR2);
                } else if (action === "Enter" && currentFrame() >= songPlayR2 - 1 && currentFrame() <= songPlayR2 + 1) {
                    handleAudio(songAudio, "play", birthSongVolumeR1);
                    handleAudio(songAudio, "lerpVolume", birthSongVolumeR1, birthSongVolumeR2);
                    playForwardToTarget(songPlayR2, songPlayR3);
                } else if (action === "Enter" && currentFrame() >= songPlayR3 - 1 && currentFrame() <= songPlayR3 + 1) {
                    handleAudio(songAudio, "play", birthSongVolumeR2);
                    handleAudio(songAudio, "lerpVolume", birthSongVolumeR2, birthSongVolumeR3);
                    playForwardToTarget(songPlayR3, candleBlow);
                }
            }
        }

        //* * * * * * * * * * * * Section 4 | Candle Blow * * * * * * * * * * * *
        else if (currentFrame() >= candleBlow && currentFrame() < backHome) {
            if (action === "Enter" && currentFrame() >= candleBlow - 1 && currentFrame() <= candleBlow + 1 && textEndOrNot) {
                handleAudio(SFX_candleBlow, "play", 1);
                handleAudio(SFX_candleHum, "lerpVolume", 0.12, 0);
                handleAudio(BGM_inWild, "lerpVolume", 0.04, 0.15);
                playForwardToTarget(candleBlow, peopleFade, () => {
                    handleAudio(SFX_candleBlow, "pause");
                    textEndOrNot = false;
                    const textSequence = [
                        { text: "Hold your wish in your heart." },
                        { text: "Three— Two— One—" },
                    ];
                    displayTextSequence(textSequence, 0, () => {
                        textEndOrNot = true;
                    });
                });
            } else if (currentFrame() >= peopleFade - 1 && currentFrame() <= peopleFade + 1 && textEndOrNot) {
                handleAudio(SFX_candleBlow, "play");
                handleAudio(SFX_candleHum, "pause");
                playForwardToTarget(peopleFade, skyLit, () => {
                    handleAudio(SFX_candleBlow, "pause");
                    textEndOrNot = false;
                    const textSequence = [
                        { text: "..." },
                        { text: "Disappeared." },
                        { text: "If this is a dream, it could be the weirdest one." },
                        { text: "But it was nice to have them here." },
                        { text: "Maybe it's time to leave." },
                        { text: "[Press ENTER to leave the table]" },
                    ];
                    displayTextSequence(textSequence, 0, () => {
                        textEndOrNot = true;
                    });
                });
            } else if (currentFrame() >= skyLit - 1 && currentFrame() <= skyLit + 1 && textEndOrNot) {
                handleAudio(SFX_candleBlow, "play");
                playForwardToTarget(skyLit, viewToHouse, () => {
                    handleAudio(SFX_candleBlow, "pause");
                    textEndOrNot = false;
                    const textSequence = [
                        { text: "Still the table..." },
                        { text: "in this you-know-where wildness, shrouded in blinding fog." },
                        { text: "Maybe it's time to find my way back." },
                        { text: "[Press ENTER to get back to the bus stop]" },
                    ];
                    displayTextSequence(textSequence, 0, () => {
                        textEndOrNot = true;
                    });
                });
            } else if (action === "Enter" && currentFrame() >= viewToHouse - 1 && currentFrame() <= viewToHouse + 1 && textEndOrNot) {
                handleAudio(SFX_candleBlow, "play");
                playForwardToTarget(viewToHouse, pathFade, () => {
                    handleAudio(SFX_candleBlow, "pause");
                    textEndOrNot = false;
                    const textSequence = [
                        { text: "That is the way I came here," },
                        { text: "but the bus stop is no longer being there. Where is this path leading now?" },
                        { text: "It seems like it wants to guide me somewhere else." },
                    ];
                    displayTextSequence(textSequence, 0, () => {
                        textEndOrNot = true;
                    });
                });
            } else if (currentFrame() >= pathFade - 1 && currentFrame() <= pathFade + 1 && textEndOrNot) {
                handleAudio(SFX_candleBlow, "play");
                playForwardToTarget(pathFade, viewToTable, () => {
                    handleAudio(SFX_candleBlow, "pause");
                    textEndOrNot = false;
                    const textSequence = [
                        { text: "A house." },
                        { text: "Or," },
                        { text: "A home?" },
                        { text: "Is that where I came from? Or where i'm heading to?" },
                        { text: "Wait, I just realised," },
                        { text: "I have been through all of this before." },
                        { text: "Even the table feels like déjà vu." },
                    ];
                    displayTextSequence(textSequence, 0, () => {
                        textEndOrNot = true;
                    });
                });
            } else if (currentFrame() >= viewToTable - 1 && currentFrame() <= viewToTable + 1 && textEndOrNot) {

                playForwardToTarget(viewToTable, walkAround, () => {
                    // Need audio element
                    textEndOrNot = false;
                    const textSequence = [
                        { text: "Humm, I'm right." },
                        { text: "It is there, standing firmly in my mind palace," },
                        { text: "just as if it's standing right in front of my eyes." },
                        { text: "[Press ENTER to continue]" },
                    ];
                    displayTextSequence(textSequence, 0, () => {
                        textEndOrNot = true;
                    });
                });
            } else if (currentFrame() >= walkAround - 1 && currentFrame() <= walkAround + 1 && textEndOrNot) {
                handleAudio(BGM_inWild, "lerpVolume", 0.15, 0.35, 0.003);
                playForwardToTarget(walkAround, backHome, () => {
                    // Need audio element
                    textEndOrNot = false;
                    const textSequence = [
                        { text: "And..." },
                        { text: "Yes, I have been through all of this before." },
                        { text: "Not in a dream." },
                        { text: "Not in a dream..." },
                    ];
                    displayTextSequence(textSequence, 0, () => {
                        textEndOrNot = true;
                    });
                });
            }
        }

        //* * * * * * * * * * * * Section 5 | Back Home * * * * * * * * * * * *
        else if (currentFrame() >= backHome && currentFrame() < totalFrame) {
            if (currentFrame() >= backHome - 1 && currentFrame() <= backHome + 1 && textEndOrNot) {
                playForwardToTarget(backHome, readyLeave, () => {
                    // Need audio element
                    textEndOrNot = false;
                    const textSequence = [
                        { text: "My house." },
                        { text: "My home." },
                        { text: "My living room." },
                        { text: "My family." },
                        { text: "The place and people I shared my birthday with." },
                        { text: "[press LEFT and RIGHT to look around]<br>[press ENTER to leave the room]" },
                    ];
                    displayTextSequence(textSequence, 0, () => {
                        textEndOrNot = true;
                    });
                });
            } else if (action === "Enter" && currentFrame() >= readyLeave - 1 && currentFrame() <= readyLeave + 1 && textEndOrNot) {
                playForwardToTarget(readyLeave, eyeClose, () => {
                    // Need audio element
                    textEndOrNot = false;
                    const textSequence = [
                        { text: "Or I mean," },
                        { text: "to leave the dream..." },
                    ];
                    displayTextSequence(textSequence, 0, () => {
                        textEndOrNot = true;
                    });
                });
            } else if (currentFrame() >= eyeClose - 1 && currentFrame() <= eyeClose + 1 && textEndOrNot) {
                handleAudio(BGM_inWild, "lerpVolume", 0.35, 0.5, 0.003);
                playForwardToTarget(eyeClose, totalFrame);
            }
        }
    }
}


/*
else if (action === "Space" && Math.floor(video2.currentTime * fps) === candleLit) {
    handleAudio(SFX_candleLitUp, "play");
    handleAudio(SFX_candleHum, "playLoop", 0.3);
    handleAudio(BGM_inWild, "lerpVolume", 0.3, 0.04);
    playForwardToTarget(candleLit, songPlay);
} else if (action === "Space" && Math.floor(video2.currentTime * fps) === songPlayR1) {
    handleAudio(SFX_candleHum, "lerpVolume", 0.3, 0.12);
    playForwardToTarget(songPlay, candleBlow);
} else if (Math.floor(video2.currentTime * fps) === candleBlow) {
    if (action === "Backspace") { // to blow the candle
        handleAudio(SFX_candleBlow, "play", 0.75);
        handleAudio(SFX_candleHum, "lerpVolume", 0.12, 0);
        handleAudio(BGM_inWild, "lerpVolume", 0.04, 0.15);
        playForwardToTarget(candleBlow, backRoom);
    } else if (action === "Space") { // to hear the song again
        playForwardToTarget(songPlay + songLength, candleBlow);
    }
} else if (action === "Backspace" && Math.floor(video2.currentTime * fps) === backHome) {
    handleAudio(BGM_inWild, "lerpVolume", 0.15, 0.35);
    handleAudio(SFX_candleHum, "stop");
    playForwardToTarget(backRoom, totalFrames - 5);
} else if (action === "Space" && Math.floor(video2.currentTime * fps) === totalFrames - 5) {
    handleAudio(BGM_inWild, "lerpVolume", 0.35, 0.5);
    playForwardToTarget(totalFrames - 5, totalFrames);
}
    */










