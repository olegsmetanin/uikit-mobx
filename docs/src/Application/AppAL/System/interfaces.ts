export interface ISystem {
  rootPath:   string;
}

export interface ISystemState {
  system: ISystem;
}

export interface ISystemActions {
  getSystem: () => Promise<void>;
}

export interface ISystemService {
  getSystem: () => Promise<ISystem>;
}

export default ISystemState;