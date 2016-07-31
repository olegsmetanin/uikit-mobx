import {IForm} from '../../../src';

export interface IService {
  getList(): Promise<IForm[]>;
  saveItem(item): Promise<IForm>;
}

const delay = <T>(res: T, timeout: number): Promise<T> => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(res);
  }, timeout)
});

export class Service implements IService {

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

}

export default Service;