import {ISort} from './ISort';
import {IPage} from './IPage';

export interface IListQuery<F> {
  filter?: F,
  sort?: ISort,
  page?: IPage
}