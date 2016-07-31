import {IForm} from '../../../src';

export interface IService {
  getForm(criteria: any): Promise<IForm>;
  // saveForm(): Promise<IForm>;
}

export class Service implements IService {

  getForm = (criteria) => new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({name: 'name', email: 'email@domain.com'});
    })
  })

}

export default Service;