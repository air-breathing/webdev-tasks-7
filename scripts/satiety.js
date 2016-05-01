
function batteryHandler (battery) {
    if (battery.charging) {
        eat(undefined, battery)
    }
    battery.onchargingchange = function () {
        if (battery.charging) {
            eat(undefined, battery)
        }
    }
};

function eat(event, battery) {
    if (satiety < 100 && !chargingEnergy) {
        idInterval3 = setInterval(
            function () {
                if (chargingEnergy || (battery != undefined && battery.charging === false)) {
                    clearInterval(idInterval3);
                    return;
                }
                satiety = (satiety < 100)? satiety + 1: satiety;
                chargingSatiety = true;
                if (satiety === 100) {
                    chargingSatiety = false;
                    clearInterval(idInterval3);
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
    global.setEating = function () {
        if (navigator.getBattery) {
            navigator.getBattery().then(batteryHandler)
        } else {
            setButton();
        }
    }
})();