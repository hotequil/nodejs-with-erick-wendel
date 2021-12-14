const EventEmmiter = require('events');
const event = new EventEmmiter();
const EVENT_NAME = 'success-clicked';

event.emit(EVENT_NAME, 'clicked at table');

event.on(EVENT_NAME, console.log);

event.emit(EVENT_NAME, 'clicked at button');
event.emit(EVENT_NAME, 'clicked at input');
