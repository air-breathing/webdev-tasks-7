
(function () {
    global.setDreaming = function (){
        var hidden           = null;
        var visibilityState  = null;
        var visibilityChange = null;
        if ('hidden' in document) {
            hidden           = 'hidden';
            visibilityState  = 'visibilityState';
            visibilityChange = 'visibilitychange';
        } else if ('mozHidden' in document) {
            hidden           = 'mozHidden';
            visibilityState  = 'mozVisibilityState';
            visibilityChange = 'mozvisibilitychange';
        } else if ('webkitHidden' in document) {
            hidden           = 'webkitHidden';
            visibilityState  = 'webkitVisibilityState';
            visibilityChange = 'webkitvisibilitychange';
        } else {
            console.log('Не поддерживается Page Visibility');
            return;
        }
        //var normalGradient = 'l(0, 0, 1, 1)#88d3f0-#232974';


        idInterval2 = undefined;
        $(document).on(visibilityChange, function () {
            if (document[hidden]) {
                //анимированное засыпание
                fallAsleep();
            } else {
                //анимированное пробуждение
                wakeUp();
            }
        });

        $('#darkness').on('click', function () {
            setGradient(40);
        });

        $('#dark').on('click', function () {
            setGradient(1500);
        });

        $('#normal').on('click', function () {
            setGradient(9000);
        });

        $('#light').on('click', function () {
            setGradient(10000);
        });

        //setGradient(1000);
        if ('ondevicelight' in window) {
            $(window).on('devicelight', function (event) {
                var value = event.value || 10000;
                setGradient(value)
            })
        } else {
            console.log('распознавание света не поддерживатся браузером')
        }
    }
})();

function setGradient(value) {
    if (value < 10000 && energy < 100) {
        fallAsleep();
    } else {
        wakeUp();
    }
    var gradient = svgPicture.select('#sky-gradient');
    var darknessGradient = 'l(0, 0, 0, 1)#0c0e27-#075764';

    var darkGradient = 'l(0, 0, 0, 1)#141843-#0b8ca1';

    var normalGradient = 'l(0, 0, 0, 1)#232974-#88d3f0';

    var lightGradient = 'l(0, 0, 0, 1)#88d3f0-#2ac1f0';

    if (value < 50) {
        gradient.animate({
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1000
        }, 10000)
    }

    if (value >= 50 && value < 2000) {
        gradient.animate({
            x1: 0,
            y1: -100,
            x2: 0,
            y2: 600
        }, 10000)
    }

    if (value >= 2000 && value < 10000) {
        gradient.animate({
            x1: 0,
            y1: -300,
            x2: 0,
            y2: 450
        }, 10000)
    }

    if (value >= 10000) {
        gradient.animate({
            x1: 0,
            y1: -450,
            x2: 0,
            y2: 0
        }, 10000)
    }
}

function fallAsleep() {
    chargingEnergy = true;
    clearInterval(idIntervalBlink);
    idInterval2 = setInterval(function () {
        energy = (energy < 100)? energy + 1: energy;
    }, 1000);
    var eyes = svgPicture.selectAll('.eyelide');
    console.log('sleep');
    $(eyes[0]).trigger('closeEye');
    $(eyes[1]).trigger('closeEye');
}

function wakeUp() {
    clearInterval(idInterval2);
    chargingEnergy = false;
    var eyes = svgPicture.selectAll('.eyelide');
    idIntervalBlink = setInterval(blinkFunciton, 10000);
    setTimeout(function () {
        $(eyes[0]).trigger('openEye');
        $(eyes[1]).trigger('openEye');
    }, 90000);
    console.log('wake up');
}