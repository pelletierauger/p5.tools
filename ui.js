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
var slidersArray = [];
var sliders = {};


function createPanel() {

}

function createPanels() {

}

function createTimeline() {

}

function createInterface() {
    createPanels();
    createTimeline();
    // interface = createDiv('');
    // interface.style('position', 'absolute');
    // interface.style('bottom', '0');
    // interface.style('padding', '20px');
    // interface.style('opacity', '0.55');
    // interface.style('background', '#222222');
    // interface.style('font-family', 'Inconsolata', 'Helvetica', 'Arial');
    // interface.style('line-height', '0.4em');
    // interface.style('color', '#cecece');
    // interface.html('yeah');
}


function setTimelineWidth(input) {

}
