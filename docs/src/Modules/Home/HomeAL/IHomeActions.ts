export interface IHomeActions {
  incrementCounter: () => Promise<void>;
  decrementCounter: () => Promise<void>;
  loadList: () => Promise<void>;
  saveItem: (item) => Promise<void>;
  loadComplexFormData: () => Promise<void>;
}

export default IHomeActions;