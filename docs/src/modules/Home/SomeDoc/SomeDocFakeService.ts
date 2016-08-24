import {ISomeDoc} from 'components'
import {ISomeDocFilter} from 'components'
import delay from '../../../utils/Promise/delay'
import {IGenericDocumentService} from 'components'

export class SomeDocFakeService implements IGenericDocumentService<ISomeDoc, ISomeDocFilter, ISomeDoc> {

  list: ISomeDoc[] = [
    {
      id: '0',
      text: 'qwe',
      num: 123,
      check: false
    },
    {
      id: '1',
      text: 'asd',
      num: 321,
      check: false
    }
  ]

  get = async (id: string) => {
    let res = await delay(this.list.find((el) => el.id === id), 1000)

    return res
  }

  update = async (value: ISomeDoc) => {
    const index = this.list.findIndex((el) => el.id === value.id)

    let res;
    if (index !== -1) {
      this.list[index] = value
      res = await delay(this.list[index], 1000)
    } else {
      throw new Error('not found')
    }

    return res
  }

  delete = async (id: string) => {
    await delay({}, 1000)
  }

}

export default SomeDocFakeService