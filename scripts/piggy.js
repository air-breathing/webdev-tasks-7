
require('./blink.js');
require('./mood.js');
require('./energy.js');
require('./satiety.js');
require('./die.js');
//mood;
//satiety;
//energy;

// ожидается, что данные флаги лежат в глобальном объекте, это важно!
chargingMood = false;
chargingSatiety = false;
chargingEnergy = false;

moodMask = null;
satietyMask = null;
energyMask = null;

svgPicture = null;

var dataAboutPast = getPiggyState();


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

        moodMask.trigger('changeMood', [mood]);
        satietyMask.trigger('changeSatiety', [satiety]);
        energyMask.trigger('changeEnergy', [energy]);
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
    moodMask.on('changeMood', function (event, number) {
        if (chargingEnergy) {
            repaintMouth(mouth, 60);
        } else {
            repaintMouth(mouth, number);
            repaint(this, number);
        }


    });
    satietyMask.on('changeSatiety', function (event, some) {
        repaint(this, some);
    });
    energyMask.on('changeEnergy', function (event, some) {
        repaint(this, some);
    });

    moodMask.trigger('changeMood', [mood]);
    satietyMask.trigger('changeSatiety', [satiety]);
    energyMask.trigger('changeEnergy', [energy]);

    setInterval(function () {
        if ((mood == 0 && satiety == 0) || (energy == 0 && satiety == 0) || (mood == 0 && energy == 0)) {
            console.log('die');
            return;
        }

        console.log(mood, satiety, energy);
        mood = ((!chargingMood) && (mood > 0))? mood - 1 : mood;
        satiety = (!chargingSatiety && satiety > 0)? satiety - 1 : satiety;
        energy = (!chargingEnergy && energy > 0)? energy - 1 : energy;

        dataAboutPast = {
            mood: mood,
            satiety: satiety,
            energy: energy
        };

        localStorage.setItem('piggyState', JSON.stringify(dataAboutPast));
    }, 9000);

    setInterval(function () {
        moodMask.trigger('changeMood', [mood]);
        satietyMask.trigger('changeSatiety', [satiety]);
        energyMask.trigger('changeEnergy', [energy]);
    }, 2000)
}


//получаем состоянии свинюшки

$(document).ready(function () {
    setPiggy();

    setBlink();

    setDreaming();

    setEating();

    setSpeechRecognizer();

    setButtonRestart();
});