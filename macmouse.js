'use strict'

var $ = require('NodObjC');
$.framework('Cocoa');

var pool;

var ptX = 0;
var ptY = 0;


/**
 * Usage:  mouse.init();
 * Desc:   Initializes the macmouse module
 * Before: mouse is an uninitialized macmouse
 * After:  mouse is an initialized macmouse
 */
var init = function() {
    pool = $.NSAutoreleasePool('alloc')('init');
    var pos = getRealPos();
    setPos(pos.x, pos.y);
}

/**
 * Usage:  var pos = mouse.getRealPos();
 * Desc:   Sends request for real mouse position, more expensive than getPos
 * Before: mouse is an initialized macmouse
 * After:  pos holds x and y numbers representing the system mouse position
 */
var getRealPos = function() {
    var pos = $.NSEvent("mouseLocation");
    return { x: pos.x, y: pos.y };
}

/**
 * Usage:  var pos = mouse.getPos();
 * Desc:   Returns mouse position currently stored in the mouse module
 * Before: mouse is an initialized macmouse
 * After:  pos holds x and y numbers representing the system mouse position currently stored in the
 *         mouse module
 */
var getPos = function() {
    return { x: ptX, y: ptY };
}

// simple private helper function
var setPos = function(x, y) {
    ptX = x;
    ptY = y;
}

/**
 * Usage:  mouse.Place();
 * Desc:   Sends mouse event message to place the system mouse at a specific position
 * Before: mouse is an initialized macmouse, x and y are numbers representing a specific position
 * After:  mouse event has been sent to move the system mouse to position defined by x and y
 */
var Place = function(x, y) {
    setPos(x, y);
    var moveEvent = $.CGEventCreateMouseEvent(null, $.kCGEventMouseMoved, $.CGPointMake(x, y), $.kCGMouseButtonLeft);
    $.CGEventPost($.kCGHIDEventTap, moveEvent);
}

/**
 * Usage:  mouse.DragPlace(x, y);
 * Desc:   Sends mouse event message to place the system mouse at a specific position while in a 
 *         dragging state
 * Before: mouse is an initialized macmouse, x and y are numbers representing a specific position, the 
 *         system mouse currently has (or thinks it has) the left mouse button pressed
 * After:  mouse event has been sent to move the system mouse to position defined by x and y with left 
 *         mouse button pressed
 */
var DragPlace = function(x, y) {
    setPos(x, y);
    var moveEvent = $.CGEventCreateMouseEvent(null, $.kCGEventLeftMouseDragged, $.CGPointMake(x, y), $.kCGMouseButtonLeft);
    $.CGEventPost($.kCGHIDEventTap, moveEvent);
}

/**
 * Usage:  mouse.Move(dx, dy);
 * Desc:   Sends mouse event message to move the system mouse (from current stored position in the mouse 
 *         module) by a vector defined by dx and dy
 * Before: mouse is an initialized macmouse, dx and dy are numbers representing our moving vector 
 * After:  mouse event has been sent to move the system mouse by a vector defined by the numbers dx and dy
 */
var Move = function(dx, dy) {
    ptX += dx;
    ptY += dy;
    var moveEvent = $.CGEventCreateMouseEvent(null, $.kCGEventMouseMoved, $.CGPointMake(ptX, ptY), $.kCGMouseButtonLeft);
    $.CGEventPost($.kCGHIDEventTap, moveEvent);
}

/**
 * Usage:  mouse.DragMove(dx, dy);
 * Desc:   Sends mouse event message to move the system mouse (from current stored position in the mouse 
 *         module) by a vector defined by dx and dy while in a dragging state
 * Before: mouse is an initialized macmouse, dx and dy are numbers representing our moving vector, the 
 *         system mouse currently has (or thinks it has) the left mouse button pressed
 * After:  mouse event has been sent to move the system mouse by a vector defined by the numbers dx and dy 
 *         with left mouse button pressed
 */
var DragMove = function(dx, dy) {
    ptX += dx;
    ptY += dy;
    var moveEvent = $.CGEventCreateMouseEvent(null, $.kCGEventLeftMouseDragged, $.CGPointMake(ptX, ptY), $.kCGMouseButtonLeft);
    $.CGEventPost($.kCGHIDEventTap, moveEvent);
}

/**
 * Usage:  mouse.LeftButtonPress();
 * Desc:   Sends mouse event message to press and hold down the left button of the system mouse
 * Before: mouse is an initialized macmouse
 * After:  mouse event has been sent to press and hold the left button on the system mouse
 */
var LeftButtonPress = function() {
    var clickDown = $.CGEventCreateMouseEvent(null, $.kCGEventLeftMouseDown, $.CGPointMake(ptX, ptY), $.kCGMouseButtonLeft);
    $.CGEventPost($.kCGHIDEventTap, clickDown);
}

/**
 * Usage:  mouse.LeftButtonRelease();
 * Desc:   Sends mouse event message to release a pressed left button of the system mouse
 * Before: mouse is an initialized macmouse
 * After:  mouse event has been sent to release a pressed left button on the system mouse
 */
var LeftButtonRelease = function() {
    var clickUp = $.CGEventCreateMouseEvent(null, $.kCGEventLeftMouseUp, $.CGPointMake(ptX, ptY), $.kCGMouseButtonLeft);
    $.CGEventPost($.kCGHIDEventTap, clickUp);
}

/**
 * Usage:  mouse.Click();
 * Desc:   Sends mouse event message to press and release left button of the system mouse
 * Before: mouse is an initialized macmouse
 * After:  mouse event has been sent to press and release left button on the system mouse
 */
var Click = function() {
    LeftButtonPress();
    LeftButtonRelease();
}

/**
 * Usage:  mouse.RightButtonPress();
 * Desc:   Sends mouse event message to press and hold down the right button of the system mouse
 * Before: mouse is an initialized macmouse
 * After:  mouse event has been sent to press and hold the right button on the system mouse
 */
var RightButtonPress = function() {
    var clickDown = $.CGEventCreateMouseEvent(null, $.kCGEventRightMouseDown, $.CGPointMake(ptX, ptY), $.kCGEventRightMouseDown);
    $.CGEventPost($.kCGHIDEventTap, clickDown);
}

/**
 * Usage:  mouse.RightButtonRelease();
 * Desc:   Sends mouse event message to release a pressed right button of the system mouse
 * Before: mouse is an initialized macmouse
 * After:  mouse event has been sent to release a pressed right button on the system mouse
 */
var RightButtonRelease = function() {
    var clickUp = $.CGEventCreateMouseEvent(null, $.kCGEventRightMouseUp, $.CGPointMake(ptX, ptY), $.kCGEventRightMouseDown);
    $.CGEventPost($.kCGHIDEventTap, clickUp);
}

/**
 * Usage:  mouse.RightClick();
 * Desc:   Sends mouse event message to press and release right button of the system mouse
 * Before: mouse is an initialized macmouse
 * After:  mouse event has been sent to press and release right button on the system mouse
 */
var RightClick = function() {
    RightButtonPress();
    RightButtonRelease();
}

/**
 * Usage:  mouse.doubleClick();
 * Desc:   Sends mouse event message to double click the system mouse
 * Before: mouse is an initialized macmouse
 * After:  mouse event has been sent to double click the system mouse
 */
var doubleClick = function() {
    var evt = $.CGEventCreateMouseEvent(null, $.kCGEventLeftMouseDown, $.CGPointMake(ptX, ptY), $.kCGMouseButtonLeft);
    $.CGEventSetIntegerValueField(evt, $.kCGMouseEventClickState, 2);
    $.CGEventPost($.kCGHIDEventTap, evt);
    $.CGEventSetType(evt, $.kCGEventLeftMouseUp);
    $.CGEventPost($.kCGHIDEventTap, evt);
    $.CGEventSetType(evt, $.kCGEventLeftMouseDown);
    $.CGEventPost($.kCGHIDEventTap, evt);
    $.CGEventSetType(evt, $.kCGEventLeftMouseUp);
    $.CGEventPost($.kCGHIDEventTap, evt);
}

/**
 * Usage:  mouse.ScrollUp();
 * Desc:   Sends event message to scroll up the system mouse
 * Before: mouse is an initialized macmouse, s is an integer from 1 to
 * 10 that defines the scroll speed, s defaults to 5 if not provided
 * After:  scroll event has been sent to scroll up with speed s
 */
var ScrollUp = function(s) {
    if (typeof s === 'undefined') s = 5;
    var scrollEvent = $.CGEventCreateScrollWheelEvent(null, $.kCGScrollEventUnitLine, 1, s);
    $.CGEventPost($.kCGHIDEventTap, scrollEvent);
}

/**
 * Usage:  mouse.ScrollDown();
 * Desc:   Sends event message to scroll down the system mouse
 * Before: mouse is an initialized macmouse, s is an integer from 1 to
 * 10 that defines the scroll speed, s defaults to 5 if not provided
 * After:  scroll event has been sent to scroll down with speed s
 */
var ScrollDown = function(s) {
    if (typeof s === 'undefined') s = 5;
    ScrollUp(-s);
}

/**
 * Usage:  mouse.quit();
 * Desc:   Does garbage collection some on objective c stuff, be a good lad and call this when 
 *         you're done using the macmouse module
 * Before: mouse is an initialized macmouse
 * After:  mouse is an uninitialized macmouse
 */
var quit = function() {
    pool('drain');
}

module.exports = {
    init: init,
    getRealPos: getRealPos,
    getPos: getPos,
    Place: Place,
    DragPlace: DragPlace,
    Move: Move,
    DragMove: DragMove,
    LeftButtonPress: LeftButtonPress,
    LeftButtonRelease: LeftButtonRelease,
    Click: Click,
    RightButtonPress: RightButtonPress,
    RightButtonRelease: RightButtonRelease,
    RightClick: RightClick,
    doubleClick: doubleClick,
    ScrollUp: ScrollUp,
    ScrollDown: ScrollDown,
    quit: quit
}
