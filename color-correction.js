// console.log("From color-correction.js");
//I need to be able to adjust the levels and HSB of a whole palette at the same time, 
// but also of individual colors.

//Levels.

// About levels : output white means to turn anything above it to 255, 
//anything under output black becomes 0, easy enough. input is harder, 
//and you don't mention a mid tone balancer. 
//with input, you scale 0-255 to inpWhite - inpBlack. 
// then for each pixel, if under 128, multiply the pixel level by the scale. 
// if over 128, multiply by 1/scale. finally, min(255,p) and max(0, p) for safety.

//My first version : 
// colorValues.r = constrain(map(colorValues.r, 0, 255, lev, 255), 0, 255);

//colorValues.r = map(colorValues.r, 0, 255, lev, 255);
//colorValues.r = constrain(colorValues.r, 0, 255);

//  V              V                V
//  0-------------128-------------255
//  dark = 0,     mid = 0;        light = 0;

//midPoint at zero means that the middle is the middle between dark and light.
//midPoint at another number means the middle is shifted up or down by midPoint.
//What does it mean to shift the middle of the range??

// Input : r, g, b


// if mid = 50...
// if (r < )

//  V              V                V
//  0-------------128-------------255

// mid = 50;

//  V                    V          V
//  0--------------------178------255




// Finding the middle between two numbers.
// ( x1 + x2 ) / 2
// (-50 + 150) / 2 = 50

// r = constrain(colorValues.r, 0, 255);

//If the color is below midPoint, map it from dark to midPoint.
//Else, if the color is greater or equal to midPoint, map it from midPoint to light.

// var colorValues = hexToRgb(this.privateValues.palette[currentColor]);
// colorValues = adjustLevels(-50, 0, 0, adjustLevels);


function adjustLevels(dark, mid, light, values) {
    var originalMid = 255 / 2;
    var stretchedMid = map(originalMid, 0, 255, 0 + dark, 255 + light);
    var vals = [values.r, values.g, values.b];
    for (var i = 0; i < vals.length; i++) {

        vals[i] = map(vals[i], 0, 255, 0 + dark, 255 + light);

        // midPoint Shifting Algorithm : what is between 0 and 128 must be mapped between 0 and 178,
        // what is between 129 and 255 must be mapped between 179 and 255.

        // Adjusted for dark and light : 
        // what is between dark and originalMid must mapped between dark and (originalMid + mid),
        // what is between originalMid and light must be mapped between (originalMid + mid) and light;
        // console.log(vals[i]);
        if (vals[i] >= 0 + dark && vals[i] <= stretchedMid) {
            // console.log("Darker! : " + vals[i]);
            vals[i] = map(vals[i], dark, stretchedMid, dark, stretchedMid + mid);
            // console.log("Darker after ! : " + vals[i]);
        } else if (vals[i] > originalMid && vals[i] <= 255 + light) {
            // console.log("Lighter! : " + vals[i]);
            vals[i] = map(vals[i], stretchedMid, light, stretchedMid + mid, light);
            // console.log("Lighter after! : " + vals[i]);
        }

        //Then we constrain the value to proper rgb values.
        vals[i] = constrain(vals[i], 0, 255);
        //We round the value.
        vals[i] = Math.round(vals[i]);

    }
    values.r = vals[0];
    values.g = vals[1];
    values.b = vals[2];
    return values;
    //For every argument starting at arguments[3], do this...
    // for (var i = 3; i < arguments.length; i++) {

    // }

}




//Hue, Saturation, Brightness

function adjustHsv(hue, sat, brightness, values) {
    var hsv = rgbToHsv(values.r, values.g, values.b);

    hsv.h += hue;
    hsv.s += sat;
    hsv.v += brightness;
    var newValues = hsvToRgb(hsv.h, hsv.s, hsv.v);
    // console.log(newValues);
    values.r = newValues.r;
    // console.log(values.r);
    values.g = newValues.g;
    values.b = newValues.b;
    // console.log(values);
    return values;
}


function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}



//-----------------------------HSL to RGB, RGB to HSL----------------------//

//This is taken from :
// http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
function hslToRgb(h, s, l) {
    var r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}



/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   {number}  r       The red color value
 * @param   {number}  g       The green color value
 * @param   {number}  b       The blue color value
 * @return  {Array}           The HSL representation
 */
function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return {
        h: h,
        s: s,
        l: l
    };
}


//This is taken from :
// http://stackoverflow.com/questions/8022885/rgb-to-hsv-color-in-javascript

function rgbToHsv(r, g, b) {
    var rr, gg, bb,
        r = arguments[0] / 255,
        g = arguments[1] / 255,
        b = arguments[2] / 255,
        h, s,
        v = Math.max(r, g, b),
        diff = v - Math.min(r, g, b),
        diffc = function(c) {
            return (v - c) / 6 / diff + 1 / 2;
        };

    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(r);
        gg = diffc(g);
        bb = diffc(b);

        if (r === v) {
            h = bb - gg;
        } else if (g === v) {
            h = (1 / 3) + rr - bb;
        } else if (b === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        } else if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        v: Math.round(v * 100)
    };
}

function hsvToRgb(h, s, v) {
    var r, g, b;
    var i;
    var f, p, q, t;

    // Make sure our arguments stay in-range
    h = Math.max(0, Math.min(360, h));
    s = Math.max(0, Math.min(100, s));
    v = Math.max(0, Math.min(100, v));

    // We accept saturation and value arguments from 0 to 100 because that's
    // how Photoshop represents those values. Internally, however, the
    // saturation and value are calculated from a range of 0 to 1. We make
    // That conversion here.
    s /= 100;
    v /= 100;

    if (s == 0) {
        // Achromatic (grey)
        r = g = b = v;
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    }

    h /= 60; // sector 0 to 5
    i = Math.floor(h);
    f = h - i; // factorial part of h
    p = v * (1 - s);
    q = v * (1 - s * f);
    t = v * (1 - s * (1 - f));

    switch (i) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;

        case 1:
            r = q;
            g = v;
            b = p;
            break;

        case 2:
            r = p;
            g = v;
            b = t;
            break;

        case 3:
            r = p;
            g = q;
            b = v;
            break;

        case 4:
            r = t;
            g = p;
            b = v;
            break;

        default: // case 5:
            r = v;
            g = p;
            b = q;
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}
