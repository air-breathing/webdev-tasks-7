var eatEventEnable;
var eatEventDisable;
var eatSong;

function batteryHandler (battery) {
    if (battery.charging) {
        eat(undefined, battery)
    }
    battery.onchargingchange = function () {
        if (battery.charging) {
            eat(undefined, battery)
        } else {
            chargingSatiety = false;
        }
    }
}

function eat(event, battery) {
    if (satiety < 100) {
        //eatSong.dispatchEvent(eatEventEnable);
        idInterval3 = setInterval(
            function () {
                if (chargingEnergy) {
                    eatSong.dispatchEvent(eatEventDisable);
                    //clearInterval(idInterval3);
                    return;
                }
                if ((battery != undefined && battery.charging === false)) {
                    eatSong.dispatchEvent(eatEventDisable);
                    clearInterval(idInterval3);
                    return;
                }
                satiety = (satiety < 100)? satiety + 1: satiety;
                chargingSatiety = true;
                //чтобы не было заедания песни
                if (satiety < 95) {
                    eatSong.dispatchEvent(eatEventEnable);
                }
                if (satiety === 100) {
                    eatSong.dispatchEvent(eatEventDisable);
                    chargingSatiety = false;
                    //clearInterval(idInterval3);
                }
            }, 1000);
    }
}

function setButton() {
    var eattingButton = $('<button class="button-restart" id="battery">Накормить</button>');
    $(eattingButton).on('click', eat);
    eattingButton.appendTo($('.speech'));
}

(function (){
    eatEventEnable = new Event('enableSong', {bubbles : true, cancelable : true});
    eatEventDisable = new Event('disableSong', {bubbles : true, cancelable : true});
    eatSong = document.querySelector('.eat-song');
    global.setEating = function () {
        if (navigator.getBattery) {
            navigator.getBattery().then(batteryHandler)
        } else {
            setButton();
        }
    }
})();

