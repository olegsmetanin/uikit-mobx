import {IEvent} from './IEvent'

export interface IEventBus {
  on: <T extends IEvent>(type: string, fn: (T) => void) => this
  off: <T extends IEvent>(type: string, fn: (T) => void) => this
  emit: <T extends IEvent>(type: string, value: T) => boolean
}
