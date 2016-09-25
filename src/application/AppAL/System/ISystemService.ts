import {ISystem} from './ISystem'
export interface ISystemService {
  getSystem: () => Promise<ISystem>
}

export default ISystemService