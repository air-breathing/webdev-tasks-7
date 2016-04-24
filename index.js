
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

//получаем состоянии свинюшки

$(document).ready(function () {
    var mood;
    var satiety;
    var energy;

    var chargingMood = false;
    var chargingSatiety = false;
    var chargingEnergy = false;

    var dataAboutPast = getPiggyState();
    mood = dataAboutPast.mood;
    satiety = dataAboutPast.satiety;
    energy = dataAboutPast.energy;

    var svgPicture = Snap('.svg-layer_picture');

    var lines = $('#line-mask');
    var moodMask = $(svgPicture.select('.mood'));
    var satietyMask = $(svgPicture.select('.satiety'));
    var energyMask = $(svgPicture.select('.energy'));

    moodMask.on('repaint', function (event, some) {
        repaint(this, some);
    });
    satietyMask.on('repaint', function (event, some) {
        repaint(this, some);
    });
    energyMask.on('repaint', function (event, some) {
        repaint(this, some);
    });

    moodMask.trigger('repaint', [mood]);
    satietyMask.trigger('repaint', [satiety]);
    energyMask.trigger('repaint', [energy]);

    setInterval(function () {
        mood = ((!chargingMood) && (mood > 0))? mood - 1 : 0;
        satiety = (!chargingSatiety && satiety > 0)? satiety - 1 : 0;
        energy = (!chargingEnergy && energy > 0)? energy - 1 : 0;

        moodMask.trigger('repaint', [mood]);
        satietyMask.trigger('repaint', [satiety]);
        energyMask.trigger('repaint', [energy]);

        if ((mood == 0 && satiety == 0) || (energy == 0 && satiety == 0) || (mood == 0 && energy == 0)) {
            console.log('die');
        }

    }, 10000);



    var mouth = svgPicture.select('.mouth');
    $(mouth).on('closeMouth', function () {
        this.animate({
            d: 'M215.37897964858962,236.0228187595313 Q204.26875874480135,' +
            '251.3131916976098 195.55334596400087,255.84845244412017 '
        }, 1000);
    });

    $(mouth).trigger('closeMouth');
});