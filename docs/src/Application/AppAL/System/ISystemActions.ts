export interface ISystemActions {
  getSystem: () => Promise<void>;
  loadLang: (lang) => Promise<void>;
  setLang: (lang) => Promise<void>;
  goto: (location: any) => Promise<void>;
}

export default ISystemActions;