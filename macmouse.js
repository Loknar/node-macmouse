'use strict'

var $ = require('NodObjC');
$.framework('Cocoa');

var pool;

var ptX = 0;
var ptY = 0;


var init = function() {
    pool = $.NSAutoreleasePool('alloc')('init');
}

var getPos = function() {
    return { x: ptX, y: ptY };
}

var setPos = function(x, y) {
    ptX = x;
    ptY = y;
}

var Place = function(x, y) {
    var moveEvent = $.CGEventCreateMouseEvent(null, $.kCGEventMouseMoved, $.CGPointMake(x, y), $.kCGMouseButtonLeft);
    $.CGEventPost($.kCGHIDEventTap, moveEvent);
}

var DragPlace = function(x, y) {
    var moveEvent = $.CGEventCreateMouseEvent(null, $.kCGEventLeftMouseDragged, $.CGPointMake(x, y), $.kCGMouseButtonLeft);
    $.CGEventPost($.kCGHIDEventTap, moveEvent);
}

var Move = function(x, y) {
    ptX += x;
    ptY += y;
    var moveEvent = $.CGEventCreateMouseEvent(null, $.kCGEventMouseMoved, $.CGPointMake(ptX, ptY), $.kCGMouseButtonLeft);
    $.CGEventPost($.kCGHIDEventTap, moveEvent);
}

var DragMove = function(x, y) {
    ptX += x;
    ptY += y;
    var moveEvent = $.CGEventCreateMouseEvent(null, $.kCGEventLeftMouseDragged, $.CGPointMake(ptX, ptY), $.kCGMouseButtonLeft);
    $.CGEventPost($.kCGHIDEventTap, moveEvent);
}

var LeftButtonPress = function() {
    var clickDown = $.CGEventCreateMouseEvent(null, $.kCGEventLeftMouseDown, $.CGPointMake(ptX, ptY), $.kCGMouseButtonLeft);
    $.CGEventPost($.kCGHIDEventTap, clickDown);
}

var LeftButtonRelease = function() {
    var clickUp = $.CGEventCreateMouseEvent(null, $.kCGEventLeftMouseUp, $.CGPointMake(ptX, ptY), $.kCGMouseButtonLeft);
    $.CGEventPost($.kCGHIDEventTap, clickUp);
}

var RightButtonPress = function() {
    var clickDown = $.CGEventCreateMouseEvent(null, $.kCGEventRightMouseDown, $.CGPointMake(ptX, ptY), $.kCGEventRightMouseDown);
    $.CGEventPost($.kCGHIDEventTap, clickDown);
}

var RightButtonRelease = function() {
    var clickUp = $.CGEventCreateMouseEvent(null, $.kCGEventRightMouseUp, $.CGPointMake(ptX, ptY), $.kCGEventRightMouseDown);
    $.CGEventPost($.kCGHIDEventTap, clickUp);
}

var quit = function() {
    pool('drain');
}

module.exports = {
    init: init,
    getPos: getPos,
    setPos: setPos,
    Place: Place,
    DragPlace: DragPlace,
    Move: Move,
    DragMove: DragMove,
    LeftButtonPress: LeftButtonPress,
    LeftButtonRelease: LeftButtonRelease,
    RightButtonPress: RightButtonPress,
    RightButtonRelease: RightButtonRelease,
    quit: quit
}
