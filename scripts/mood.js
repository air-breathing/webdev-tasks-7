
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
        clearInterval(idInterval);
        action = actions.nothing;
        $('.piggy').on('click', getHandler(recognizer));
        $('.speech__text').text(event.results[0][0].transcript);
    };

    return function handler() {
        $('.piggy').off('click');
        if (action != actions.nothing) {
            return
        }
        action = actions.communicate;
        if (idInterval != undefined) {
            return
        }
        idInterval = setInterval(function () {
            mood = (mood < 100)? mood + 1: mood;
        }, 1000);
        recognizer.start();
    }
}