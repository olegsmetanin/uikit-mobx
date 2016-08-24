
export interface IHomeActions {
  incrementCounter: () => Promise<void>
  decrementCounter: () => Promise<void>
  loadList: () => Promise<void>
  saveItem: (item) => Promise<void>
  loadComplexFormValue: () => Promise<void>
  saveComplexFormValue: (value) => Promise<void>
}

export default IHomeActions