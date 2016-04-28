
(function () {
    global.setBlink = function () {
        var eye = svgPicture.selectAll('.eyelide');
        $(eye[0]).on('closeEye', function (event, callback) {
            alert(callback);
            this.animate({
                opacity: 1
            },100, callback);
        });

        $(eye[1]).on('closeEye', function (event, callback) {
            console.log(callback, 'qwq');
            this.animate({
                opacity: 1
            }, 100, callback);
        });

        $(eye[0]).on('openEye', function () {
            this.animate({
                opacity: 0
            }, 100);
        });

        $(eye[1]).on('openEye', function () {
            this.animate({
                opacity: 0
            }, 100);
        });

        $(eye[0]).trigger('closeEye', function () {
            $(eye[0]).trigger('openEye');
        });
        $(eye[1]).trigger('closeEye', function () {
            $(eye[1]).trigger('openEye');
        });

        blinkFunciton = function () {
            $(eye[0]).trigger('closeEye', function () {
                $(eye[0]).trigger('openEye');
            });
            $(eye[1]).trigger('closeEye', function () {
                $(eye[1]).trigger('openEye');
            });
        };
        idIntervalBlink = setInterval(blinkFunciton, 10000);
}})();