//The user-interface will work this way :
//You create an interface with createInterface()
//It creates a timeline with adjustable width.
//It also creates a div called "panels"
//Inside the panels div, you can create many collapsible panels, with "createPanel() function".
//Then, when you create sliders, you can pass to your slider constructor a reference to which
//panel you want to associate your slider.

var interface;
var timeline;

//I have a sliders array and a global object called "sliders" to which I can add sliders as needed
// with this code: sliders.zoom = new Slider("Canvas scale", 0, 20, 1, 0.01);
//This was done this way so that all the sliders values can be accessed easily (in the global namespace)
//yet they are still sorted (they are contained inside the sliders objects, not just all freely named).
//In the following code, this is made very clear :
//this.localValues.zoom = sliders.zoom.value;


//slidersArray doesn't seem to be doing anything. Needs more investigating.
// var slidersArray = [];
var sliders = {};

Slider = function(name, min, max, start, step, parent) {
    this.name = name;
    this.min = min;
    this.max = max;
    this.start = start;
    this.value = start;
    this.step = step;

    this.paragraph = createP(this.name + " : " + this.start);
    this.paragraph.parent(parent);
    this.paragraph.style("line-height", "0.5em");
    this.paragraph.style("margin-bottom", "0.5em");

    this.slider = createSlider(min, max, start, step);
    this.slider.parent(parent);
    this.slider.style('width', '100%');
    this.slider.style('margin-top', '-15px');
    // this.slider.style('margin-bottom', '-25px');

    var that = this;
    this.slider.input(function() {
        that.value = that.slider.value();
        that.connection = that.value;
        that.paragraph.html(that.name + " : " + that.value);
    });
    // slidersArray.push(this);
}

Slider.prototype.set = function(val) {
    this.slider.value(val);
    this.value = val;
    this.paragraph.html(this.name + " : " + this.value);
};

var folders = {};

Folder = function(name, open) {
    this.name = name;
    this.open = open;
    this.container = createDiv('');
    this.container.parent(interface);
    this.container.style("border", "solid 2px #5B5B5B");
    this.container.style("margin-bottom", "0.75em");

    this.titleDiv = createDiv(name);
    this.titleDiv.parent(this.container);
    this.titleDiv.style("background", "#5B5B5B");
    this.titleDiv.style("color", "#fff");
    this.titleDiv.style("padding", "0.25em 0.5em");
    this.div = createDiv('');
    this.div.parent(this.container);
    this.div.style("padding", "0em 0.75em 1.25em 0.65em");

    var that = this;
    this.titleDiv.mouseClicked(function() {
        that.toggleHide();
    });
    if (this.open === true) {
        this.div.style("display", "block");
    } else {
        this.div.style("display", "none");
    }
};

Folder.prototype.toggleHide = function() {
    if (this.open === true) {
        this.open = false
        this.div.style("display", "none");
    } else {
        this.open = true;
        this.div.style("display", "block");
    }
};

var buttons = {};

Button = function(name, parent, func) {
    this.button = createButton(name);
    this.button.parent(parent);
    this.button.style("margin", "1em 0 0em 0");
    if (func) {
        this.button.mousePressed(func);
    }
};

var menus = {};

Menu = function(name, parent) {
    this.div = createDiv('');
    this.div.parent(parent);
    this.nameDiv = createDiv(name + ' : ');
    this.nameDiv.parent(this.div);
    this.nameDiv.style('float', 'left');
    this.nameDiv.style('padding-right', '0.5em');
    this.containerDiv = createDiv('');
    this.containerDiv.parent(this.div);
    this.containerDiv.style('float', 'left');
    // this.containerDiv.style('margin-top', '-0.4em');

    this.menu = createSelect();
    this.menu.parent(this.containerDiv);
    this.menu.style('float', 'left');
    this.div.style("padding", "10px 0 15px 0");
};

function createTimeline() {
    timeline = createDiv('');
    timeline.style('position', 'absolute');
    timeline.style('box-sizing', 'border-box');
    timeline.style('width', '100%');
    timeline.style('height', '4.5em');
    timeline.style('bottom', '0');
    timeline.style('padding', '10px 40px');
    timeline.style('opacity', '0.55');
    timeline.style('background', '#222222');
    timeline.style('font-family', 'Inconsolata', 'Helvetica', 'Arial');
    timeline.style('line-height', '0.05em');
    timeline.style('color', '#cecece');
    sliders.timeline = new Slider("DrawCount", -200, 100, 0, 1, timeline);
    sliders.timeline.slider.style("margin", "0 auto");
}

function createInterface() {
    createTimeline();
    interface = createDiv('');
    interface.style('position', 'absolute');
    interface.style('width', '300px');
    interface.style('bottom', '4.5em');
    interface.style('padding', '10px 10px 0px 10px');
    interface.style('opacity', '0.55');
    interface.style('background', '#222222');
    interface.style('font-family', 'Inconsolata', 'Helvetica', 'Arial');
    // interface.style('line-height', '0.75em');
    var calculateHeight = windowHeight - 90;
    interface.style("max-height", calculateHeight + "px");
    interface.style("overflow", "auto");
    interface.style('color', '#cecece');
}
