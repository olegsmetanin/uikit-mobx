import {ISomeDoc, ISomeDocFilter, IGenericDocumentActions} from 'components'

export interface ISomeDocActions extends IGenericDocumentActions<ISomeDoc, ISomeDocFilter, ISomeDoc> {
}

export default ISomeDocActions