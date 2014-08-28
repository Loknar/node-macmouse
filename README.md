# macmouse

Enables you to create virtual mouse input on Mac OS X using Cocoa.

## Credits
Uses [NodObjC](https://github.com/TooTallNate/NodObjC) to hook into the Cocoa framework. The macmouse module is merely a wrapper around mouse control commands to the Cocoa framework via NodObjC.

## Installation

Install using `npm`,

``` bash
$ npm install macmouse
```

## Usage Example
```
mouse = require('macmouse');

mouse.init();

var ptX = 800;
var ptY = 600;

mouse.setPos(ptX, ptY);

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

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
