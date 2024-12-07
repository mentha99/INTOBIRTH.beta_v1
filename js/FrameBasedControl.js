let textEventTriggered = false; // A flag to track the event state


let lookedBackOrNot = false;
let tempTrigger1 = true;
let tempTrigger2 = true;
let tempTriggerSong = false;
let tempTrigger3 = true;

let lookArBackAngle;
if (MobileDeviceOrNot) {
    lookArBackAngle = 165;
} else {
    lookArBackAngle = 155;
}


// Get current video frame number
function currentFrame() {
    return Math.round(video2.currentTime * fps)
}


// This function checks the camera's rotation based on the left/right directions.
let cameraYaw;
function checkCameraRotation() {
    const currentCameraForward = new THREE.Vector3(0, 0, -1);
    camera.getWorldDirection(currentCameraForward);
    currentCameraForward.normalize();
    initialCameraForward.normalize();
    const angle = Math.acos(initialCameraForward.dot(currentCameraForward)); // Angle in radians
    let angleInDegrees = THREE.MathUtils.radToDeg(angle);

    const currentYawRotation = camera.rotation.y;
    let deltaYaw = currentYawRotation - initialYawRotation;
    if (deltaYaw < 0) { angleInDegrees = -angleInDegrees; }

    console.log("camera rotation checking, current yaw:", angleInDegrees);
    return angleInDegrees;
}


function InteractiveControl() {
    window.addEventListener("keydown", (e) => handleInteraction(e.code));

    if (MobileDeviceOrNot) {
        console.log("Area touching simulate");

        const bottomArea = document.querySelector('.bottom-area');
        const topArea = document.querySelector('.top-area');

        function handleTouch(event, action) {
            event.preventDefault(); // Prevent unintended scrolling or behavior
            handleInteraction(action);
        }

        bottomArea.addEventListener("touchstart", (event) => {
            handleTouch(event, "Enter");
            console.log("virtual Enter");
        });
        topArea.addEventListener("touchstart", (event) => {
            handleTouch(event, "ArrowUp");
            console.log("virtual ArrowUp");
        });
        renderer.domElement.addEventListener("touchend", (event) => {
            handleTouch(event, "ArrowLeft");
            //console.log("touch end");
        });
    }


    let ifInstructionScreenHide = true;

    function handleInteraction(action) {
        if (action === "ArrowDown") {
            console.log("camera z rotation:", checkCameraRotation());
        }
        //* * * * * * * * * * * * Section 1 | Path Show * * * * * * * * * * * *
        if (currentFrame() >= eyeOpen && currentFrame() < moveStart) {
            if (action === "Enter" && currentFrame() === eyeOpen) {
                if (ifInstructionScreenHide) {
                    instructionScreen.classList.add('hidden');
                    console.log("instruction hide");
                    ifInstructionScreenHide = false;
                }

                const textSequence = [{ text: "" }];
                displayTextSequence(textSequence);

                // BGM start play
                if (MobileDeviceOrNot) {
                    //mobile device can not use volume control
                    handleAudio(BGM_inWild_s10, "playLoop");
                    console.log("BGM for mobile start playing");
                } else {
                    handleAudio(BGM_inWild, "playLoop", 0);
                    handleAudio(BGM_inWild, "lerpVolume", 0, 0.08, lerpSpeed = 0.001);
                }

                playForwardToTarget(eyeOpen, wakeUp, () => {
                    textEndOrNot = false;
                    const textSequence = [
                        { text: "..." },
                        { text: "Where am I?" },
                        { text: "The light is so harsh that everything around me is melting into a blur." },
                        { text: "[Press LEFT/RIGHT on the keyboard<br>or DRAG on your screen<br>to look around]" },
                    ];
                    displayTextSequence(textSequence, 0, () => {
                        textEndOrNot = true;
                        controls.enabled = true;
                        if (!MobileDeviceOrNot) { rotateControl.enable() };
                        console.log("First text ended, control enabled, current frame:", currentFrame());
                    });
                });
            } else if (action === "ArrowLeft" || action === "ArrowRight" && currentFrame() >= wakeUp - 1 && currentFrame() <= wakeUp + 1 && textEndOrNot) {
                cameraYaw = checkCameraRotation();
                if (lookedBackOrNot === false) {
                    if (cameraYaw > lookArBackAngle || cameraYaw < -lookArBackAngle) {
                        controls.enabled = false;
                        if (!MobileDeviceOrNot) { rotateControl.disable() };
                        textEndOrNot = false;
                        const textSequence = [
                            { text: "I guess it's an old bus station." },
                            { text: "Seems being forgetten by time." },
                            { text: "Is bus still coming here? What am I waiting for?" },
                            { text: "Or did I already arrive?" },
                            { text: "[Press LEFT/RIGHT<br>or DRAG on your screen<br>to look around]" },
                        ];
                        if (tempTrigger1) {
                            tempTrigger1 = false;
                            displayTextSequence(textSequence, 0, () => {
                                textEndOrNot = true;
                                lookedBackOrNot = true;
                                controls.enabled = true;
                                if (!MobileDeviceOrNot) { rotateControl.enable() };
                                //console.log("lookedBack set to true");
                            });
                        }
                    }
                } else {
                    if (cameraYaw < 25 && cameraYaw > -25&&tempTrigger3) {
                        tempTrigger3 =false;
                        handleAudio(SFX_grassWave, "playLoop");
                        playForwardToTarget(wakeUp, pathShow, () => {
                            textEndOrNot = false;
                            const textSequence = [
                                { text: "Something sounds moving under the ground." },
                                { text: "[Press ENTER to check what's going on]" },
                            ];
                            if (tempTrigger2) {
                                tempTrigger2 = false;
                                displayTextSequence(textSequence, 0, () => {
                                    textEndOrNot = true;
                                    instructionScreenShow("bottom");
                                });
                            }
                        });
                    }
                }
            } else if (action === "Enter" && currentFrame() >= pathShow - 1 && currentFrame() <= pathShow + 1 && textEndOrNot) {
                instructionScreenShow("reset");
                handleAudio(SFX_grassWave, "pause");
                handleAudio(SFX_grassGrow, "play");

                if (!MobileDeviceOrNot) {
                    handleAudio(BGM_inWild, "lerpVolume", 0.08, 0.3);
                }

                playForwardToTarget(pathShow, moveStart, () => {
                    handleAudio(SFX_grassGrow, "pause");

                    textEndOrNot = false;
                    const textSequence = [
                        { text: "A path!" },
                        { text: "Where dose it lead? Is that where I'm meant to go?" },
                        { text: "There seems to be something standing at the far end,  just out of my focus…" },
                        { text: "Curious. Let's take a close look." },
                        { text: "[Press UP to move a step forward]" },
                    ];
                    displayTextSequence(textSequence, 0, () => {
                        instructionScreenShow("top");
                        textEndOrNot = true;
                        console.log("text before moving ends");
                        tempTrigger1 = true;
                        tempTrigger2 = true;
                    });
                });
            }
        }

        //* * * * * * * * * * * * Section 2 | Walk Close * * * * * * * * * * * *
        else if (currentFrame() >= moveStart && currentFrame() < candleLit) {
            if (action === "ArrowUp" && currentFrame() >= moveStart - 1 && currentFrame() <= moveStart + 1 && textEndOrNot) {
                instructionScreenShow("reset");
                handleAudio(SFX_step1, "play");
                playForwardToTarget(moveStart, moveSecond, () => {
                    handleAudio(SFX_step1, "pause");
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
                playForwardToTarget(moveSecond, moveSecond + stepLength, () => {
                    handleAudio(SFX_step1, "pause");
                });
            } else if (action === "ArrowUp" && currentFrame() >= moveSecond + stepLength - 1 && currentFrame() <= moveSecond + stepLength + 1) {
                handleAudio(SFX_step1, "play");
                playForwardToTarget(moveSecond + stepLength, moveSecond + stepLength * 2, () => {
                    handleAudio(SFX_step1, "pause");
                });
            } else if (action === "ArrowUp" && currentFrame() >= moveSecond + stepLength * 2 - 1 && currentFrame() <= moveSecond + stepLength * 2 + 1) {
                handleAudio(SFX_step1, "play");
                playForwardToTarget(moveSecond + stepLength * 2, moveOnGrass1, () => {
                    handleAudio(SFX_step1, "pause");
                    textEndOrNot = false;
                    const textSequence = [
                        { text: "Strange grass." },
                        { text: "[Press UP to move a step forward]" },
                    ];
                    displayTextSequence(textSequence, 0, () => {
                        textEndOrNot = true;
                    });
                });
            } else if (action === "ArrowUp" && currentFrame() >= moveOnGrass1 - 1 && currentFrame() <= moveOnGrass1 + 1 && textEndOrNot) {
                handleAudio(SFX_step2, "play");
                playForwardToTarget(moveOnGrass1, moveOnGrass1 + stepLength, () => {
                    handleAudio(SFX_step2, "pause");
                });
            } else if (action === "ArrowUp" && currentFrame() >= moveOnGrass1 + stepLength - 1 && currentFrame() <= moveOnGrass1 + stepLength + 1) {
                handleAudio(SFX_step2, "play");
                playForwardToTarget(moveOnGrass1 + stepLength, moveOnGrass2, () => {
                    handleAudio(SFX_step2, "pause");
                    textEndOrNot = false;
                    const textSequence = [
                        { text: "I feel like I'm being surrounded by an endless grassland..." },
                        { text: "Am I losing my mind?" },
                        { text: "[Press LEFT or RIGHT to look around]" },
                    ];
                    displayTextSequence(textSequence, 0, () => {
                        textEndOrNot = true;
                        lookedBackOrNot = false;
                        console.log("lookedBack set to false");
                    });
                });
            } else if (action === "ArrowLeft" || action === "ArrowRight" && currentFrame() >= moveOnGrass2 - 1 && currentFrame() <= moveOnGrass2 + 1 && textEndOrNot) {
                //console.log("in to camera checking");
                cameraYaw = checkCameraRotation();
                if (lookedBackOrNot === false) {
                    if (cameraYaw > lookArBackAngle || cameraYaw < -lookArBackAngle) {

                        console.log("look back text triggered.");
                        controls.enabled = false;
                        if (!MobileDeviceOrNot) { rotateControl.disable() };
                        textEndOrNot = false;
                        const textSequence = [
                            { text: "The bus station feels so lonely over there." },
                            { text: "Honestly, will a bus really arrive?" },
                            { text: "if not… how did I even get here?" },
                            { text: "[Press LEFT/RIGHT button<br>or DRAGGING on your screen<br>to look around]" },
                        ];
                        if (tempTrigger1) {
                            tempTrigger1 = false;
                            displayTextSequence(textSequence, 0, () => {
                                textEndOrNot = true;
                                lookedBackOrNot = true;
                                console.log("lookedBack set to true");
                                controls.enabled = true;
                                if (!MobileDeviceOrNot) { rotateControl.enable() };
                            });
                        }
                    }
                } else {
                    if (cameraYaw < 25 && cameraYaw > -25) {
                        textEndOrNot = false;
                        const textSequence = [
                            { text: "[Press UP to move a step forward]" },
                        ];
                        if (tempTrigger2) {
                            tempTrigger2 = false;
                            displayTextSequence(textSequence, 0, () => {
                                textEndOrNot = true;
                                console.log("lookedBack set to false");
                            });
                        }
                    }
                }
            } else if (action === "ArrowUp" && currentFrame() >= moveOnGrass2 - 1 && currentFrame() <= moveOnGrass2 + 1 && textEndOrNot) {
                handleAudio(SFX_step3, "play");
                playForwardToTarget(moveOnGrass2, moveOnGrass2 + stepLength, () => {
                    handleAudio(SFX_step3, "pause");
                });
            } else if (action === "ArrowUp" && currentFrame() >= moveOnGrass2 + stepLength - 1 && currentFrame() <= moveOnGrass2 + stepLength + 1) {
                handleAudio(SFX_step3, "play");
                playForwardToTarget(moveOnGrass2 + stepLength, moveSeeTable, () => {
                    handleAudio(SFX_step3, "pause");
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
                playForwardToTarget(moveSeeTable, moveSeeTable + stepLength, () => {
                    handleAudio(SFX_step4, "pause");
                });
            } else if (action === "ArrowUp" && currentFrame() >= moveSeeTable + stepLength - 1 && currentFrame() <= moveSeeTable + stepLength + 1) {
                handleAudio(SFX_step4, "play");
                playForwardToTarget(moveSeeTable + stepLength, moveSeeCake, () => {
                    handleAudio(SFX_step4, "pause");
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
                    handleAudio(SFX_step4, "pause");
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
                    handleAudio(SFX_step4, "pause");
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
            const birthSongVolumeR1 = 0.25;
            const birthSongVolumeR2 = 0.1;
            const birthSongSoloVolume = 1;
            function birthSongSolo(songAudio, angleRangeStart, angleRangeEnd) {
                if (cameraYaw >= angleRangeStart && cameraYaw < angleRangeEnd) {
                    console.log(songAudio, "Solotime");
                    handleAudio(songAudio, "lerpVolume", birthSongVolumeR2, birthSongSoloVolume, 0.25);
                    tempTriggerSong = true;
                } else {
                    if (tempTriggerSong) {
                        console.log(songAudio, "EndSolotime");
                        handleAudio(songAudio, "lerpVolume", birthSongSoloVolume, birthSongVolumeR2, 0.25);
                        tempTriggerSong = false;
                    }
                }
            }
            function birthSongSoloMobile(songAudio, angleRangeStart, angleRangeEnd) {
                if (cameraYaw >= angleRangeStart && cameraYaw < angleRangeEnd) {
                    console.log(songAudio, "Start mobile solo time");
                    handleAudio(songAudio, "playCurrent");
                    tempTriggerSong = true;
                } else {
                    if (tempTriggerSong) {
                        console.log(songAudio, "End mobile solo time");
                        handleAudio(songAudio, "muted");
                        tempTriggerSong = false;
                    }
                }
            }

            controls.enabled = true;
            if (!MobileDeviceOrNot) { rotateControl.enable() };

            if (action === "Enter" && currentFrame() >= candleLit - 1 && currentFrame() <= candleLit + 1 && textEndOrNot) {
                handleAudio(SFX_candleLitUp, "play");
                playForwardToTarget(candleLit, peopleShow, () => {
                    handleAudio(SFX_candleLitUp, "pause");
                    textEndOrNot = false;
                    const textSequence = [
                        { text: "Take a deep breath." },
                        { text: "Huff..." },
                        { text: "Okay, let's go." },
                    ];
                    displayTextSequence(textSequence, 0, () => {
                        textEndOrNot = true;
                        console.log("text ended, current frame:", currentFrame());

                        SFX_candleLitUp.currentTime = 0.625; //(peopleShow - candleLit)/fps
                        handleAudio(SFX_candleLitUp, "playCurrent");

                        handleAudio(SFX_candleBurn, "play");

                        if (MobileDeviceOrNot) {
                            handleAudio(SFX_candleHum_s12, "playLoop");
                        } else {
                            handleAudio(SFX_candleHum, "playLoop", 0.3);
                            handleAudio(BGM_inWild, "lerpVolume", 0.3, 0.04);
                        }

                        playForwardToTarget(peopleShow, songPlayR1, () => {
                            handleAudio(SFX_candleLitUp, "pause");
                            textEndOrNot = false;
                            const textSequence = [
                                { text: "It's such a strange feeling. I think I've seen her before," },
                                { text: "but I can't remember her name." },
                                { text: "… same for anyone else here." },
                                { text: "Are they real?" },
                                { text: "Or are they ghosts?" },
                                { text: "Also, where is this strange voice coming from?" },
                                { text: "[Press ENTER to listen]" },
                            ];
                            displayTextSequence(textSequence, 0, () => {
                                textEndOrNot = true;
                            });
                        });
                    })
                });
            } else if (action === "Enter" && currentFrame() >= songPlayR1 - 1 && currentFrame() <= songPlayR1 + 1 && textEndOrNot) {
                if (!MobileDeviceOrNot) {
                    handleAudio(SFX_candleHum, "lerpVolume", 0.3, 0.45);
                }

                handleAudio(BIRTH_Aunt, "play", birthSongVolumeR1);
                handleAudio(BIRTH_Dad, "play", birthSongVolumeR1);
                handleAudio(BIRTH_Ella, "play", birthSongVolumeR1);
                handleAudio(BIRTH_Mom, "play", birthSongVolumeR1);
                handleAudio(BIRTH_Uncle, "play", birthSongVolumeR1);

                playForwardToTarget(songPlayR1, songPlayR2, () => {
                    textEndOrNot = false;
                    handleAudio(BIRTH_Aunt, "pause");
                    handleAudio(BIRTH_Dad, "pause");
                    handleAudio(BIRTH_Ella, "pause");
                    handleAudio(BIRTH_Mom, "pause");
                    handleAudio(BIRTH_Uncle, "pause");

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
                if (MobileDeviceOrNot) {
                    handleAudio(BIRTH_Aunt, "init");
                    handleAudio(BIRTH_Dad, "init");
                    handleAudio(BIRTH_Ella, "init");
                    handleAudio(BIRTH_Mom, "init");
                    handleAudio(BIRTH_Uncle, "init");
                } else {
                    handleAudio(SFX_candleHum, "lerpVolume", 0.45, 0.3);
                    handleAudio(BIRTH_Aunt, "playLoop", birthSongVolumeR2);
                    handleAudio(BIRTH_Dad, "playLoop", birthSongVolumeR2);
                    handleAudio(BIRTH_Ella, "playLoop", birthSongVolumeR2);
                    handleAudio(BIRTH_Mom, "playLoop", birthSongVolumeR2);
                    handleAudio(BIRTH_Uncle, "playLoop", birthSongVolumeR2);
                }



                playForwardToTarget(songPlayR2, candleBlow, () => {
                    handleAudio(BIRTH_Aunt, "pause");
                    handleAudio(BIRTH_Dad, "pause");
                    handleAudio(BIRTH_Ella, "pause");
                    handleAudio(BIRTH_Mom, "pause");
                    handleAudio(BIRTH_Uncle, "pause");

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
            } else if (action === "ArrowLeft" || action === "ArrowRight" && currentFrame() >= songPlayR2 + 1 && currentFrame() < candleBlow - 1) {
                cameraYaw = checkCameraRotation();

                if (MobileDeviceOrNot) {
                    birthSongSoloMobile(BIRTH_Aunt, -30, -10);
                    birthSongSoloMobile(BIRTH_Dad, 10, 30);
                    birthSongSoloMobile(BIRTH_Ella, -50, -30);
                    birthSongSoloMobile(BIRTH_Mom, -10, 10);
                    birthSongSoloMobile(BIRTH_Uncle, 30, 50);
                } else {
                    birthSongSolo(BIRTH_Aunt, -30, -10);
                    birthSongSolo(BIRTH_Dad, 10, 30);
                    birthSongSolo(BIRTH_Ella, -50, -30);
                    birthSongSolo(BIRTH_Mom, -10, 10);
                    birthSongSolo(BIRTH_Uncle, 30, 50);
                }
            }
        }

        //* * * * * * * * * * * * Section 4 | Candle Blow * * * * * * * * * * * *
        else if (currentFrame() >= candleBlow && currentFrame() < walkAround) {
            controls.enabled = true;
            if (action === "Enter" && currentFrame() >= candleBlow - 1 && currentFrame() <= candleBlow + 1 && textEndOrNot) {
                handleAudio(SFX_stepCandleBlow, "play");
                if (MobileDeviceOrNot) {
                    handleAudio(SFX_candleHum, "pause");
                } else {
                    handleAudio(SFX_candleHum, "lerpVolume", 0.3, 0);
                    handleAudio(BGM_inWild, "lerpVolume", 0.04, 0.15);
                }

                handleAudio(SFX_windPeopleDis, "playLoop");

                playForwardToTarget(candleBlow, peopleFade, () => {
                    handleAudio(SFX_stepCandleBlow, "pause");
                    textEndOrNot = false;
                    const textSequence = [
                        { text: "Hold your wish in your heart." },
                        { text: "Three— Two— One—" },
                        { text: " " },
                    ];
                    displayTextSequence(textSequence, 0, () => {
                        SFX_stepCandleBlow.currentTime = 1.875;//(peopleFade - candleBlow) / fps;
                        handleAudio(SFX_stepCandleBlow, "playCurrent");
                        handleAudio(SFX_blowBreath, "play");
                        if (!MobileDeviceOrNot) {
                            handleAudio(SFX_candleHum, "pause");
                        }

                        textEndOrNot = true;
                        playForwardToTarget(peopleFade, skyLit, () => {
                            handleAudio(SFX_blowBreath, "pause");
                            handleAudio(SFX_stepCandleBlow, "pause");
                            textEndOrNot = false;
                            const textSequence = [
                                { text: "..." },
                                { text: "Disappeared." },
                                { text: "If this is a dream, it could be the weirdest one." },
                                { text: "But it was nice to have them here." },
                                { text: "Maybe it's time to leave." },
                                { text: "" },
                            ];
                            displayTextSequence(textSequence, 0, () => {
                                textEndOrNot = true;
                                SFX_stepCandleBlow.currentTime = 8.5;
                                handleAudio(SFX_stepCandleBlow, "playCurrent");

                                playForwardToTarget(skyLit, viewToHouse, () => {
                                    handleAudio(SFX_stepCandleBlow, "pause");
                                    textEndOrNot = false;
                                    const textSequence = [
                                        { text: "Still the table..." },
                                        { text: "in this you-know-where wildness, shrouded in blinding fog." },
                                        { text: "Just want to find my way back." },
                                        { text: "" },
                                    ];
                                    displayTextSequence(textSequence, 0, () => {
                                        textEndOrNot = true;
                                        handleAudio(SFX_grassWaveTurnAround, "play");
                                        playForwardToTarget(viewToHouse, pathFade, () => {

                                            textEndOrNot = false;
                                            const textSequence = [
                                                { text: "That is the way I came here," },
                                                { text: "but the bus stop is no longer being there. Where is this path leading now?" },
                                                { text: "It seems like it wants to guide me somewhere else." },
                                                { text: "[Press ENTER to continue]" },
                                            ];
                                            displayTextSequence(textSequence, 0, () => {
                                                textEndOrNot = true;
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            } else if (action === "Enter" && currentFrame() >= pathFade - 1 && currentFrame() <= pathFade + 1 && textEndOrNot) {
                handleAudio(SFX_grassWaveTurnAround, "pause");
                handleAudio(SFX_pathExtend, "play");
                if (MobileDeviceOrNot) {
                    handleAudio(SFX_windPeopleDis, "pause");
                } else {
                    handleAudio(SFX_windPeopleDis, "lerpVolume", 1, 0);
                }
                playForwardToTarget(pathFade, viewToTable, () => {
                    textEndOrNot = false;
                    handleAudio(SFX_pathExtend, "pause");
                    const textSequence = [
                        { text: "A house." },
                        { text: "Or," },
                        { text: "A home?" },
                        { text: "Is that where I came from? Or where i'm heading to?" },
                        { text: "Wait, I just realised," },
                        { text: "I have been through all of this before." },
                        { text: "Even the table feels like déjà vu." },
                        { text: "" },
                    ];
                    displayTextSequence(textSequence, 0, () => {
                        textEndOrNot = true;
                        playForwardToTarget(viewToTable, walkAround, () => {
                            console.log("get to walkAround");
                            textEndOrNot = false;
                            if (!MobileDeviceOrNot) {
                                handleAudio(SFX_windPeopleDis, "pause");
                            }
                            const textSequence = [
                                { text: "Humm, I'm right." },
                                { text: "It is there, standing firmly in my mind palace," },
                                { text: "just as if it's standing right in front of my eyes." },
                                { text: "[Press ENTER to continue]" },
                            ];
                            displayTextSequence(textSequence, 0, () => {
                                textEndOrNot = true;
                                console.log("frame:", currentFrame());
                            });
                        });
                    });
                });
            }
        }



        //* * * * * * * * * * * * Section 5 | Back Home * * * * * * * * * * * *
        else if (currentFrame() >= walkAround && currentFrame() < totalFrame) {
            if (action === "Enter" && currentFrame() >= walkAround - 1 && currentFrame() <= walkAround + 1 && textEndOrNot) {
                textEndOrNot = false;
                if (MobileDeviceOrNot) {
                    handleAudio(BGM_inWild, "lerpVolume", 0.15, 0.35, 0.003);
                }

                playForwardToTarget(walkAround, backHome, () => {
                    // Need audio element
                    const textSequence = [
                        { text: "And..." },
                        { text: "Yes, I have been through all of this before." },
                        { text: "Not in a dream." },
                        { text: "Not in a dream..." },
                        { text: "" },
                    ];
                    displayTextSequence(textSequence, 0, () => {
                        textEndOrNot = true;
                        playForwardToTarget(backHome, readyLeave, () => {
                            // Need audio element
                            textEndOrNot = false;
                            const textSequence = [
                                { text: "My house." },
                                { text: "My home." },
                                { text: "My living room." },
                                { text: "My family." },
                                { text: "The place and people I shared my birthday with." },
                                { text: "[press LEFT/RIGHT to look around]<br>[press ENTER to leave the room]" },
                            ];
                            displayTextSequence(textSequence, 0, () => {
                                textEndOrNot = true;
                            });
                        });
                    });
                });
            }
            else if (action === "Enter" && currentFrame() >= readyLeave - 1 && currentFrame() <= readyLeave + 1 && textEndOrNot) {
                playForwardToTarget(readyLeave, eyeClose, () => {
                    textEndOrNot = false;
                    const textSequence = [
                        { text: "Or I mean," },
                        { text: "to leave the dream..." },
                        { text: "" },
                    ];
                    displayTextSequence(textSequence, 0, () => {
                        textEndOrNot = true;
                        if (MobileDeviceOrNot) {
                            handleAudio(BGM_inWild, "lerpVolume", 0.35, 0.5, 0.003);
                        }

                        playForwardToTarget(eyeClose, totalFrame, () => {
                            console.log("get to totalFrame");
                            showCredits();
                        });
                    });
                });
            }
        }
    }
}









