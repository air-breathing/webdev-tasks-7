
(function () {
    global.setBlink = function () {
        var eye = svgPicture.selectAll('.eyelide');
        $(eye[0]).on('closeEye', function () {
            this.animate({
                opacity: 1
            }, 100, function () {
                $(this).trigger('openEye');
            });
        });

        $(eye[1]).on('closeEye', function () {
            this.animate({
                opacity: 1
            }, 100, function () {
                $(this).trigger('openEye');
            });
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

        $(eye[0]).trigger('closeEye');
        $(eye[1]).trigger('closeEye');

        blinkFunciton = function () {
            $(eye[0]).trigger('closeEye');
            $(eye[1]).trigger('closeEye');
        };
        idIntervalBlink = setInterval(blinkFunciton, 10000);
}})();