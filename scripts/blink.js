
(function () {
    global.blinkFlag = true;
    global.setBlink = function () {

        var eye = svgPicture.selectAll('.eyelide');

        $(eye[0]).on('closeEye', function (event, callback) {
            this.animate({
                opacity: 1
            },100, callback);
        });

        $(eye[1]).on('closeEye', function (event, callback) {
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
        setInterval(function () {
            console.log('blinkFunction');
            $(eye[0]).trigger('closeEye', function () {
                if (blinkFlag) {
                    $(eye[0]).trigger('openEye');
                }
            });
            $(eye[1]).trigger('closeEye', function () {
                if (blinkFlag) {
                    $(eye[1]).trigger('openEye');
                }
            });
        }, 10000);
}})();