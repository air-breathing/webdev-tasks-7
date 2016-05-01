
function batteryHandler (battery) {
    $(battery).on('levelchange', function () {
        console.log('levelchange');
    })
}

function eat() {

}

function setButton() {
    var eattingButton = $('<button class="button-restart" id="battery">Накормить</button>');
    $(eattingButton).on('click', function () {
        if (satiety < 100 && !chargingEnergy) {
            idInterval3 = setInterval(
                function () {
                    if (chargingEnergy) {
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
    });
    eattingButton.appendTo($('.speech'));

}

(function (){
    global.setEating = function () {
        setButton();
        /*if (navigator.getBattery) {
            navigator.getBattery().then(batteryHandler)
        } else {
            setButton();
        }*/
    }
})();