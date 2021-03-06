var sleepEventEnable;
var sleepEventDisable;
var eatEventDisable;
var sleepSong;
var eatSong;

(function () {
    sleepEventEnable = new Event('enableSong', {bubbles : true, cancelable : true});
    sleepEventDisable = new Event('disableSong', {bubbles : true, cancelable : true});
    eatEventDisable = new Event('disableSong', {bubbles : true, cancelable : true});
    eatSong = document.querySelector('.eat-song');
    sleepSong = document.querySelector('.sleep-song');

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
                console.log('ondevicelight', value);
                setGradient(value)
            })
        } else {
            console.log('распознавание света не поддерживатся браузером')
        }
    }
})();

function setGradient(value) {
    if (value < 2000 && energy < 100) {
        fallAsleep();
    } else {
        wakeUp();
    }
    var gradient = svgPicture.select('#sky-gradient');
    if (value < 50) {
        gradient.animate({
            x1: 0,
            y1: 450,
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
    sleepSong.dispatchEvent(sleepEventEnable);
    eatSong.dispatchEvent(eatEventDisable);
    chargingEnergy = true;
    blinkFlag = false;
    moodMask.trigger('changeMood', 60);
    var eye = svgPicture.selectAll('.eyelide');
    $(eye[0]).trigger('closeEye', function () {});
    $(eye[1]).trigger('closeEye', function () {});
    idInterval2 = setInterval(function () {
        energy = (energy < 100)? energy + 1: energy;
        if (energy === 100) {
            wakeUp()
        }
    }, 1000);

}

function wakeUp() {
    sleepSong.dispatchEvent(sleepEventDisable);
    chargingEnergy = false;
    clearInterval(idInterval2);
    blinkFlag = true;
}