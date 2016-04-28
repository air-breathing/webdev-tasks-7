
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

        //setGradient(1000);
        if ('ondevicelight' in window) {
            $(window).on('devicelight', function (event) {
                var value = event.value || 10000;
                if (value < 10000 && energy < 100) {
                    fallAsleep();
                } else {
                    wakeUp();
                }
                //setGradient(value)})
            })
        } else {
            console.log('распознавание света не поддерживатся браузером')
        }
    }
})();

function setGradient(value) {
    var bottom;
    var high;
    if (value < 50) {
        bottom = 'rgb(12, 14, 39)';//#0c0e27
        high = 'rgb(7, 87, 100)';//#075764
    } else {
        if (value < 2000){
            bottom = 'rgb(20, 24, 67)';//#141843
            high = 'rgb(11, 140, 161)';//#0b8ca1
        } else {
            if (value < 10000) {
                high = 'rgb(136, 211, 240)';//#88d3f0
                bottom = 'rgb(35, 41, 116)';//#232974
            } else {
                high = 'rgb(136, 211, 240)';//#88d3f0
                bottom = 'rgb(42, 193, 240)';//#2ac1f0
            }
        }
    }

    svgPicture.select('#sky-high').animate({
        style: 'stop-color:' +  high
    }, 100);

    svgPicture.select('#sky-bottom').animate({
        style: 'stop-color:' +  bottom
    }, 100)
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
    setTimeout(function () {
        $(eyes[0]).trigger('openEye');
        $(eyes[1]).trigger('openEye');
    }, 90000);
    idIntervalBlink = setInterval(blinkFunciton, 10000);
    console.log('wake up');
}