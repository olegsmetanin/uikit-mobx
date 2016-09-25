/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:disable:no-unused-variable */
import {IOrder} from '../Model/IOrder'

export const OrderView = ({
  value,
  onEdit,
  onSign,
  onDelete
}: {
  value: IOrder,
  onEdit: () => void,
  onSign: () => void,
  onDelete: () => void
}) => (
  <div>
    <div>{JSON.stringify(value)}</div>
    <button onClick={onEdit}>Edit</button>
    <button onClick={onSign}>Sign</button>
    <button onClick={onDelete}>Delete</button>
  </div>
)

export default OrderView
