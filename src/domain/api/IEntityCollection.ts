import {ILookup} from 'generic';

export interface IEntityCollection<T> {

  prefill: () => Promise<T>

  create: (value: T) => Promise<T>

  getSync: (id: string) => T

  get: (id: string) => Promise<T>

  update: (value: T) => Promise<T>

  delete: (id: string) => Promise<void>

  list: (filter: any, page?: number) => Promise<{value: T[], count: number, page: number}>

  listSync: (filter: any, page?: number) => {value: T[], count: number, page: number}

  lookup: (filter: any, page?: number) => Promise<{value: ILookup[], count: number, page: number}>

}