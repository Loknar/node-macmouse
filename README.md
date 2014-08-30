# macmouse

A node.js module that enables you to create virtual mouse input on Mac OS X.

## Credits
Uses [NodObjC](https://github.com/TooTallNate/NodObjC) to hook into the Cocoa framework. The macmouse module is merely a wrapper around mouse control commands to the Cocoa framework via NodObjC.

## Installation

Install using `npm`,

``` bash
$ npm install macmouse
```

## Usage Example
``` javascript
var mouse = require('macmouse');

mouse.init();

var ptX = 800;
var ptY = 600;

var doThings = function() {
    mouse.Place(ptX, ptY);
    setTimeout(pressAndHold, 250);
}

var pressAndHold = function() {
    mouse.LeftButtonPress();
    setTimeout(doDragStuff, 250);
}

var doDragStuff = function() {
    ptX += 2;
    ptY += 2;
    mouse.DragPlace(ptX, ptY);
    setTimeout(doDragStuff, 250);
}


doThings();

mouse.quit();

```

## License
(MIT License)
