var total = 10;
var x, y, t;
var r = 250;
var palette = ["ECD078", "D95B43", "C02942", "542437", "53777A"];

function setup() {
    createCanvas(windowWidth, windowHeight);
    createInterface();
    // createInfoDiv();
    // setupInfoDiv();
    background(0);
    fill(255);
    noStroke();
    noLoop();
}

function draw() {
    translate(width / 2, height / 2);
    background(0);
    var increment = TWO_PI / total;
    var colIndex = 0;
    for (var i = 0; i < TWO_PI; i += increment) {
        var color = hexToRgb(palette[colIndex]);
        fill(color.r, color.g, color.b);

        x = cos(i) * r;
        y = sin(i) * r;
        ellipse(x, y, 100);
        colIndex++;
        if (colIndex > 4) {
            colIndex = 0;
        }
        // r += 1;
    }
}
