
import {loadI18n} from '../../../utils/i18n/loadI18n'
import {IHomeActions} from './IHomeActions'
import {IHomeState} from './IHomeState'
import {IHomeService} from './IHomeService'
import {I18n} from 'components'

export class HomeActions implements IHomeActions {
  state: IHomeState
  service: IHomeService

  constructor({state, service}: {state: IHomeState, service: IHomeService}) {
    this.state = state
    this.service = service
  }

  loadLang = async (_lang: string, next: () => I18n) => {
    const lang = ['en', 'de'].indexOf(_lang) !== -1 ? _lang : 'en'
    let moduleI18n = await loadI18n(require(`bundle?lazy!./../i18n/i18n.${lang}.json`))
    this.state.i18n = function() {
      return moduleI18n.apply(this, arguments) || next().apply(this, arguments)
    }
  }

  incrementCounter = async () => {
    let store = this.state
    store.counterChanging = true
    const delta = await Promise.resolve(1)
    store.counter += delta
    store.counterChanging = false
  };

  decrementCounter = async () => {
    let store = this.state
    store.counterChanging = true
    const delta = await Promise.resolve(-1)
    store.counter += delta
    store.counterChanging = false
  };

  loadList = async () => {
    let store = this.state
    let service = this.service
    store.listIsLoading = true
    let list = await service.getList()
    store.list = list
    store.listIsLoading = false
  };

  saveItem = async (item) => {
    let store = this.state
    let service = this.service
    let newItem = await service.saveItem(item)
    const index = store.list.findIndex(item => item.id === newItem.id)
    store.list[index] = newItem
  };

  loadComplexFormValue = async () => {
    let store = this.state
    let service = this.service
    store.complexFormValueIsLoading = true
    let complexValue = await service.fetchComplexFormValue()
    store.complexFormValue = complexValue
    store.complexFormValueIsLoading = false
  };

  saveComplexFormValue = async (value) => {
    let store = this.state
    let service = this.service
    store.complexFormValueIsSaving = true
    let complexValue = await service.saveComplexFormValue(value)
    store.complexFormValue = complexValue
    store.complexFormValueIsSaving = false
  }
}

export default HomeActions