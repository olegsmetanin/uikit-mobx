import {ILookup} from 'generic';
import {IPage} from './IPage'
import {IListQuery} from './IListQuery'

export interface IEntityBaseCollection<T> {

  prefill: () => Promise<T>

  create: (value: T) => Promise<T>

  getSync: (id: string) => T

  get: (id: string) => Promise<T>

  update: (value: T) => Promise<T>

  delete: (id: string) => Promise<void>

}

export interface IEntityCollection<T, F> extends IEntityBaseCollection<T> {

  list: (query: IListQuery<F>) => Promise<{value: T[], page: IPage}>

  listSync: (query: IListQuery<F>) => {value: T[], page: IPage}

  lookup: (query: IListQuery<F>) => Promise<{value: ILookup[], count: number, page: number}>

}