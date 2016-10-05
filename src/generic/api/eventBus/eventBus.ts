export interface IEvent {
}

export interface IItemChanged extends IEvent {
  id: string
}

export interface IListChanged extends IEvent {
}

export interface IEventBus {
  on: <T extends IEvent>(type: string, fn: (T) => void) => this
  off: <T extends IEvent>(type: string, fn: (T) => void) => this
  emit: <T extends IEvent>(type: string, value: T) => boolean
}
