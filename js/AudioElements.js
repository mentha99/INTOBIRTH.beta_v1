let BGM_inWild;
let SFX_candleLitUp, SFX_candleBurn, SFX_grassWave, SFX_grassGrow, SFX_candleHum, SFX_candleBlow;
let SFX_blowBreath, SFX_grassWaveTurnAround, SFX_pathExtend, SFX_stepCandleBlow, SFX_turnAround, SFX_turnAround2, SFX_windPeopleDis;
let BIRTH_Aunt, BIRTH_Dad, BIRTH_Ella, BIRTH_Mom, BIRTH_Uncle;
let SFX_step1, SFX_step2, SFX_step3, SFX_step4;
// audio for mobile
let BGM_inWild_s10, SFX_candleHum_s12;

// array for all audio
let allAudioElements;

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM audio already loaded.")
    getDOMAudioElement();
});

function getDOMAudioElement() {
    BGM_inWild = document.getElementById("BGM_inWild");

    SFX_candleLitUp = document.getElementById("SFX_candleLitUp");
    SFX_candleBurn = document.getElementById("SFX_candleBurn");
    SFX_grassWave = document.getElementById("SFX_grassWave");
    SFX_grassGrow = document.getElementById("SFX_grassGrow");
    SFX_candleHum = document.getElementById("SFX_candleHum");
    SFX_candleBlow = document.getElementById("SFX_candleBlow");

    SFX_blowBreath = document.getElementById("SFX_blowBreath");
    SFX_grassWaveTurnAround = document.getElementById("SFX_grassWaveTurnAround");
    SFX_pathExtend = document.getElementById("SFX_pathExtend");
    SFX_stepCandleBlow = document.getElementById("SFX_stepCandleBlow");
    SFX_turnAround = document.getElementById("SFX_turnAround");
    SFX_turnAround2 = document.getElementById("SFX_turnAround2");
    SFX_windPeopleDis = document.getElementById("SFX_windPeopleDis");

    BIRTH_Aunt = document.getElementById("BIRTH_Aunt");
    BIRTH_Dad = document.getElementById("BIRTH_Dad");
    BIRTH_Ella = document.getElementById("BIRTH_Ella");
    BIRTH_Mom = document.getElementById("BIRTH_Mom");
    BIRTH_Uncle = document.getElementById("BIRTH_Uncle");

    SFX_step1 = document.getElementById("SFX_step1");
    SFX_step2 = document.getElementById("SFX_step2");
    SFX_step3 = document.getElementById("SFX_step3");
    SFX_step4 = document.getElementById("SFX_step4");

    BGM_inWild_s10 = document.getElementById("BGM_inWild_s10");
    SFX_candleHum_s12 = document.getElementById("SFX_candleHum_s12");

    allAudioElements = [
        BGM_inWild,
        SFX_candleLitUp,
        SFX_candleBurn,
        SFX_grassWave,
        SFX_grassGrow,
        SFX_candleHum,
        SFX_candleBlow,
        SFX_blowBreath,
        SFX_grassWaveTurnAround,
        SFX_pathExtend,
        SFX_stepCandleBlow,
        SFX_turnAround,
        SFX_turnAround2,
        SFX_windPeopleDis,
        BIRTH_Aunt,
        BIRTH_Dad,
        BIRTH_Ella,
        BIRTH_Mom,
        BIRTH_Uncle,
        SFX_step1,
        SFX_step2,
        SFX_step3,
        SFX_step4,

        BGM_inWild_s10,
        SFX_candleHum_s12,
    ];
}