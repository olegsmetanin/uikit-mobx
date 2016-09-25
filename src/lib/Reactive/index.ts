import {inject, observer} from 'mobx-react'
import {withProps} from 'generic'

export function connect(component, stateSelector, mapToProps, decorator) {
  if (decorator) {
    return inject(stateSelector)(decorator(observer(withProps(mapToProps)(component))))
  }
}

export const injectAll = inject((statesAndActions) => statesAndActions)

export * from 'mobx'
export * from 'mobx-react'
