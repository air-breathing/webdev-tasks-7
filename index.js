window.onload = function () {
    var svgPicture = Snap('.svg-layer_picture');
    var mouth = svgPicture.select('.mouth');
    mouth.animate({
        d: 'M215.37897964858962,236.0228187595313 Q204.26875874480135,' +
        '251.3131916976098 195.55334596400087,255.84845244412017 '
    }, 1000);
    matrix = new Snap.Matrix();
    console.log(matrix);

    var box = mouth.getBBox();
    console.log(box);
    matrix.translate(-67.78171355766466, -78.3249976466017);
    //matrix.translate(box.cx, box.cy);
    mouth.transform(matrix.toTransformString());
}