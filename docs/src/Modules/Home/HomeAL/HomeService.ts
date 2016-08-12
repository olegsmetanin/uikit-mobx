import delay from '../../../utils/Promise/delay'
import {IHomeService} from './interfaces'

export class HomeService implements IHomeService {

  getList = async () => {
    let res = await delay(
      Array.from(
        {length: 50},
        (value, index) => (
          {id: index + '', name: 'qwe', email: 'email@domain.com'}
        )
      ), 1000);
    return res;
  };

  saveItem = async (item) => {
    let res = await delay(item, 1000);
    return res;
  }

  fetchComplexFormData = async () => {
    let res = await delay({text: 'qwe'}, 1000);
    return res;
  }

}

export default HomeService;