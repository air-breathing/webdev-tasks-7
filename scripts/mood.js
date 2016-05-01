
(function () {
    global.setSpeechRecognizer = function () {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
    if (SpeechRecognition === null) {
        console.error('Речь не распознается');
        return;
    }
    var recognizer = new SpeechRecognition();
    recognizer.lang = 'ru-RU';
    $('.piggy').on('click',getHandler(recognizer));
}})();

function getHandler(recognizer) {
    idInterval = undefined;
    recognizer.onresult = function (event) {
        recognizer.stop();
        if (idInterval != undefined) {
            clearInterval(idInterval);
            //текст выводим, если настроение не было прервано другим процессом
            $('.speech__text').text(event.results[0][0].transcript);
        }
        $('.piggy').on('click', getHandler(recognizer));

    };

    return function handler() {
        $('.piggy').off('click');
        if (chargingEnergy || chargingSatiety) {
            return
        }
        if (idInterval != undefined) {
            return
        }
        idInterval = setInterval(function () {
            if (chargingEnergy || chargingSatiety) {
                clearInterval(idInterval);
                idInterval = undefined;
                chargingMood = false;
                return;
            }
            mood = (mood < 100)? mood + 1: mood;

            chargingMood = !(mood === 100);
                //idInterval отключиться во время распознавания текста
        }, 1000);
        recognizer.start();
    }
}