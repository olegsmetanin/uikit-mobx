/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:disable:no-unused-variable */
import {IOrder} from '../IOrder'

export const OrderView = ({
  value,
  onEdit,
  onDelete,
  isDeleting
}: {
  value: IOrder,
  onEdit: () => void,
  onDelete: () => void,
  isDeleting: boolean
}) => (
  <div>
    <div>{JSON.stringify(value)}</div>
    <button onClick={onEdit}>Edit</button>
    <button onClick={onDelete}>{isDeleting && '!'}Delete</button>
  </div>
)

export default OrderView
