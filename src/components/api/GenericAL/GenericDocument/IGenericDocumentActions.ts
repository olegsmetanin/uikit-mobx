export interface IGenericDocumentActions<M, F, CR> {

  // create: (createRequest: CR) => Promise<void>

  get: (id: string) => Promise<void>

  update: (value: M) => Promise<void>

  delete: (id: string) => Promise<void>

  // getAll: (filter: F) => Promise<void>

}
