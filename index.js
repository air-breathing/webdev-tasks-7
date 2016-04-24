
var mood;
var satiety;
var energy;

var chargingMood = false;
var chargingSatiety = false;
var chargingEnergy = false;

var moodMask;
var satietyMask;
var energyMask;

var dataAboutPast = getPiggyState();
var svgPicture;


function getPiggyState() {
    var dataAboutPast = localStorage.getItem('piggyState');
    if (dataAboutPast === null) {
        dataAboutPast = {
            mood: 100,
            satiety: 100,
            energy: 100
        };
        localStorage.setItem('piggyState', JSON.stringify(dataAboutPast));
    } else {
        dataAboutPast = JSON.parse(dataAboutPast);
    }
    return dataAboutPast;
}

function repaint(rect, number) {
    console.log(number);
    rect.attr({
        width: number*2.6
    });
}

function repaintMouth(mouth, number) {
    var result = (number - number % 10) / 10;
    switch (result) {
        case 10:
            mouth.animate({
                d: 'M215.37897964858968,236.0228187595312 Q220.09936862111095,' +
                '268.12146377267516 195.5533459640008,255.8484524441201 '
            }, 5);
            return;
        case 9:
            mouth.animate({
               d: 'M215.37897964858962,236.0228187595313 Q215.28000194997497,261.09817911418577' +
               ' 195.55334596400087,255.84845244412017 '
            }, 10);
            return;
        case 8:
            mouth.animate({
                d: 'M215.37897964858962,236.0228187595313 Q209.83027111517853,258.4553438979681' +
                ' 195.55334596400087,255.84845244412017 '
            }, 10);
            return;
        case 7:
            mouth.animate({
                d: 'M215.37897964858962,236.0228187595313 Q206.15124209386002,253.9694617995502 ' +
                '195.55334596400087,255.84845244412017 '
            }, 10);
            return;
        case 6:
            mouth.animate({
                d: 'M215.37897964858962,236.0228187595313 Q204.26875874480135,251.3131916976098 ' +
                '195.55334596400087,255.84845244412017 '
            }, 10);
            return;
        case 5:
            mouth.animate({
                d: 'M215.37897964858962,236.0228187595313 Q199.89631164975177,244.20737768772364' +
                ' 195.55334596400087,255.84845244412017 '
            }, 10);
            return;
        case 4:
            mouth.animate({
                d: 'M215.37897964858962,236.0228187595313 Q197.7404568430413,242.77014114991636' +
                ' 195.55334596400087,255.84845244412017 '
            }, 10);
            return;
        case 3:
            mouth.animate({
                d: 'M215.37897964858962,236.0228187595313 Q195.94391117078203,239.89566807430185' +
                ' 195.55334596400087,255.84845244412017 '
            }, 10);
            return;
        case 2:
            mouth.animate({
                d: 'M215.37897964858962,236.0228187595313 Q191.27289242290823,234.865340191979 ' +
                '195.55334596400087,255.84845244412017 '
            }, 10);
            return;
        case 1:
            mouth.animate({
                d: 'M215.37897964858962,236.0228187595313 Q191.27289242290823,234.865340191979 ' +
                '195.55334596400087,255.84845244412017 '
            }, 10);
            return;
        default:
            mouth.animate({
                d: 'M215.37897964858962,236.0228187595313 Q191.27289242290823,234.865340191979 ' +
                '195.55334596400087,255.84845244412017 '
            }, 10);
            return;
    }
}

function setBlink(eye) {
    $(eye[0]).on('closeEye', function () {
        this.animate({
            opacity: 1
        }, 100, function () {
            $(this).trigger('openEye');
        });
    });

    $(eye[1]).on('closeEye', function () {
        this.animate({
            opacity: 1
        }, 100, function () {
            $(this).trigger('openEye');
        });
    });

    $(eye[0]).on('openEye', function () {
        this.animate({
            opacity: 0
        }, 100);
    });

    $(eye[1]).on('openEye', function () {
        this.animate({
            opacity: 0
        }, 100);
    });

    $(eye[0]).trigger('closeEye');
    $(eye[1]).trigger('closeEye');

    setInterval(function () {
        $(eye[0]).trigger('closeEye');
        $(eye[1]).trigger('closeEye');
    }, 10000);
}

function setSpeechRecognizer() {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
    if (SpeechRecognition === null) {
        console.error('Речь не распознается');
        return;
    }
    var recognizer = new SpeechRecognition();
    recognizer.lang = 'ru-RU';
    recognizer.onresult = function (event) {
        recognizer.stop();
        console.log(event.results[0][0].transcript);
    };

    $('.piggy').on('click', function () {
        recognizer.start();
    });
}

function setButtonRestart() {
    $('#restart').on('click', function (event) {
        dataAboutPast = {
            mood: 100,
            satiety: 100,
            energy: 100
        };

        mood = dataAboutPast.mood;
        satiety = dataAboutPast.satiety;
        energy = dataAboutPast.energy;

        localStorage.setItem('piggyState', JSON.stringify(dataAboutPast));

        moodMask.trigger('increaseMood', [mood]);
        satietyMask.trigger('increaseSatiety', [satiety]);
        energyMask.trigger('increaseEnergy', [energy]);


    });
}

function setPiggy() {
    mood = dataAboutPast.mood;
    satiety = dataAboutPast.satiety;
    energy = dataAboutPast.energy;

    svgPicture = Snap('.svg-layer_picture');

    moodMask = $(svgPicture.select('.mood'));
    satietyMask = $(svgPicture.select('.satiety'));
    energyMask = $(svgPicture.select('.energy'));

    var mouth = svgPicture.select('.mouth');
    moodMask.on('increaseMood', function (event, some) {
        repaint(this, some);
        repaintMouth(mouth, some);
    });
    satietyMask.on('increaseSatiety', function (event, some) {
        repaint(this, some);
    });
    energyMask.on('increaseEnergy', function (event, some) {
        repaint(this, some);
    });

    moodMask.trigger('increaseMood', [mood]);
    satietyMask.trigger('increaseSatiety', [satiety]);
    energyMask.trigger('increaseEnergy', [energy]);

    setInterval(function () {
        mood = ((!chargingMood) && (mood > 0))? mood - 1 : 0;
        satiety = (!chargingSatiety && satiety > 0)? satiety - 1 : 0;
        energy = (!chargingEnergy && energy > 0)? energy - 1 : 0;

        dataAboutPast = {
            mood: mood,
            satiety: satiety,
            energy: energy
        };

        localStorage.setItem('piggyState', JSON.stringify(dataAboutPast));

        moodMask.trigger('increaseMood', [mood]);
        satietyMask.trigger('increaseSatiety', [satiety]);
        energyMask.trigger('increaseEnergy', [energy]);

        if ((mood == 0 && satiety == 0) || (energy == 0 && satiety == 0) || (mood == 0 && energy == 0)) {
            console.log('die');
        }

    }, 10000);
};


//получаем состоянии свинюшки

$(document).ready(function () {
    setPiggy();

    var eyes = svgPicture.selectAll('.eyelide');
    setBlink(eyes);

    setSpeechRecognizer();

    setButtonRestart();
});