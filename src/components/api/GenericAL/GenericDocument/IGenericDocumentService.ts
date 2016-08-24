export interface IGenericDocumentService<M, F, CR> {
  //  create: (createRequest: CR) => Promise<M>
  get: (id: string) => Promise<M>
  //  getAll: (filter: F) => Promise<M[]>
  update: (value: M) => Promise<M>
  delete: (id: string) => Promise<void>
}
