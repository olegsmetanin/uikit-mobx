import * as _ from 'lodash'
import {delay} from 'generic'
import {IHomeService} from './IHomeService'

export class HomeService implements IHomeService {

  getList = async () => {
    let res = await delay(
      Array.from(
        {length: 50},
        (value, index) => (
          {id: index + '', name: 'qwe', email: 'email@domain.com'}
        )
      ), 1000)
    return res
  }

  saveItem = async (item) => {
    let res = await delay(item, 1000)
    return res
  }

  fetchComplexFormValue = async () => {
    let res = await delay({text: 'qwe'}, 1000)
    return res
  }

  saveComplexFormValue = async (value) => {
    let res = await delay(_.cloneDeep(value), 1000)
    return res
  }

}

export default HomeService