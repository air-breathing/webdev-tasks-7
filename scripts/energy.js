
(function () {
    global.setDreaming = function (){
        console.log('asdsdsd');
        setGradient(1000);
        if ('ondevicelight' in window) {
            $(window).on('devicelight', function (event) {
                console.log('wwwwwww');
                if (event.value == undefined) {
                    value = 10000
                }
                setGradient(event.value)})
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