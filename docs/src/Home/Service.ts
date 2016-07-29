import IForm from './Form';

export interface IService {
  getForm(criteria: any): Promise<IForm>;
  // saveForm(): Promise<IForm>;
}

export default class Service implements IService {

  getForm = (criteria) => new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({name: 'name', email: 'email@domain.com'});
    })
  })

}
