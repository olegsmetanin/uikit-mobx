import {IEventBus, IEvent} from 'generic';
let EventEmitter = require('eventemitter3')
// import * as EventEmitter from 'eventemitter3';

export class EventBus implements IEventBus {

  on: <T extends IEvent>(type: string, fn: (T) => void) => this
  off: <T extends IEvent>(type: string, fn: (T) => void) => this
  emit: <T extends IEvent>(type: string, value: T) => boolean

  constructor() {
    var eventBus = new EventEmitter()

    this.on = function (type: string, fn: Function) {
      return eventBus.on(type, fn)
    }

    this.off = function (type: string, fn: (T) => void) {
      return eventBus.off(type, fn)
    }

    this.emit =  function (type: string, value: any) {
      return eventBus.emit(type, value)
    }
  }

}