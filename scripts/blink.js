
(function () {
    global.setBlink = function (eye) {
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

    setInterval(function () {
        $(eye[0]).trigger('closeEye');
        $(eye[1]).trigger('closeEye');
    }, 10000);
}})();