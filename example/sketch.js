var total = 10;
var showPanels = true;
var x, y, t;
var r = 250;
var palette = ["ECD078", "D95B43", "C02942", "542437", "53777A"];

function setup() {
    createCanvas(windowWidth, windowWidth * 9 / 16);
    createInterface(0, 1000, 0);
    configureInterface();
    // createInfoDiv();
    // setupInfoDiv();
    // buttons.adjuster.button.mousePressed(function() {
    //     console.log("This is working!");
    // });
    background(255, 125, 0);
    background(0);
    fill(255);
    noStroke();
    noLoop();
}

function configureInterface() {
    folders.test = new Folder("Joli test", false);
    folders.test2 = new Folder("Un autre test", false);
    folders.test3 = new Folder("Un autre test", false);
    sliders.s = new Slider("Dot size", 0, 40, 2.5, 0.1, folders.test.div);
    menus.tester = new Menu("Testing", folders.test.div);
    sliders.b = new Slider("Acceleration", 0, 40, 2.5, 0.1, folders.test.div);
    sliders.x = new Slider("Dot size", 0, 40, 2.5, 0.1, folders.test2.div);
    sliders.y = new Slider("Acceleration", 0, 40, 2.5, 0.1, folders.test2.div);
    sliders.xx = new Slider("Dot size", 0, 40, 2.5, 0.1, folders.test2.div);
    sliders.yy = new Slider("Acceleration", 0, 40, 2.5, 0.1, folders.test2.div);
    sliders.xxx = new Slider("Dot size", 0, 40, 2.5, 0.1, folders.test2.div);
    sliders.yyy = new Slider("Acceleration", 0, 40, 2.5, 0.1, folders.test2.div);
    sliders.xxxx = new Slider("Dot size", 0, 40, 2.5, 0.1, folders.test3.div);
    buttons.adjuster = new Button("Adjustments", folders.test3.div, function() {
        console.log("This is working!");
    });
    sliders.yyyy = new Slider("Acceleration", 0, 40, 2.5, 0.1, folders.test3.div);
    buttons.adjuster2 = new Button("Adjustments", folders.test3.div, function() {
        console.log("This is working!");
    });
    folders.cols = new Folder("Color adjustments", true);
    sliders.dark = new Slider("Dark", -100, 100, 0, 1, folders.cols.div);
    sliders.mid = new Slider("Mid", -100, 100, 0, 1, folders.cols.div);
    sliders.light = new Slider("Light", -100, 100, 0, 1, folders.cols.div);
    sliders.hue = new Slider("Hue", -180, 180, 0, 1, folders.cols.div);
    sliders.sat = new Slider("Saturation", -100, 100, 0, 1, folders.cols.div);
    sliders.brightness = new Slider("Brightness", -100, 100, 0, 1, folders.cols.div);
}

function draw() {
    translate(width / 2, height / 2);
    // background(0);
    var increment = TWO_PI / total;
    var colIndex = 0;
    for (var i = 0; i < TWO_PI; i += increment) {
        var color = hexToRgb(palette[colIndex]);
        color.step = "10";
        var colorArray = [{
            offset: 0,
            r: 155,
            g: 150,
            b: 55
        }, {
            offset: 0.15,
            r: 155,
            g: 0,
            b: 0
        }, {
            offset: 0.8,
            r: 0,
            g: 0,
            b: 0
        }];
        // console.log(colorArray);
        // noLoop();
        // return;
        color = colorArray[2];
        color = adjustLevels(sliders.dark.value, sliders.mid.value, sliders.light.value, color);
        color = adjustHsv(sliders.hue.value, sliders.sat.value, sliders.brightness.value, color);
        // console.log(color);
        fill(color.r, color.g, color.b);
        // console.log(color.step)
        x = cos(i) * r;
        y = sin(i) * r;
        ellipse(x, y, 300);
        colIndex++;
        if (colIndex > 4) {
            colIndex = 0;
        }
        // r += 1;
    }
}

function keyPressed() {
    if (keyCode === 32) {
        if (looping) {
            noLoop();
            looping = false;
            // song.pause();
        } else {
            loop();
            looping = true;
            // song.play();
        }
    }
    if (key == 'y' || key == 'Y') {
        showYellow = (showYellow) ? false : true;
    }
    if (key == 'r' || key == 'R') {
        // userControlledSpiral.privateValues.paletteIndex += 2;
        // userControlledParticle.privateValues.paletteIndex += 2;
        autumnSpiral10.privateValues.paletteIndex += 2;
    }
    if (key == 'e' || key == 'E') {
        // userControlledSpiral.privateValues.paletteIndex += 2;
        // userControlledParticle.privateValues.paletteIndex += 2;
        // userControlledSpiral.privateValues.paletteIndex += 2;
    }
    if (key == 't' || key == 'T') {
        change_erase_color();
    }
    if (key == 'n' || key == 'N') {
        nb = (nb) ? false : true;
    }

    if (key == 'g' || key == 'G') {
        if (showPanels) {
            showPanels = false;
            interface.style("display", "none");
            timeline.style("display", "none");
        } else {
            showPanels = true;
            interface.style("display", "block");
            timeline.style("display", "block");
        }
    }
}
