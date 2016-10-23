/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:disable:no-unused-variable */
import {IOrder} from './IOrder'

export const OrderView = ({
  value,
  onEdit,
  onDelete,
  isDeleting,
  OrderDetailList
}: {
  value: IOrder,
  onEdit: () => void,
  onDelete: () => void,
  isDeleting: boolean,
  OrderDetailList: any
}) => {
  return (
    <div>
      <div>value: {JSON.stringify(value)}</div>
      {value && (
        <OrderDetailList
          filter={{order: value.id}}
        />
      )}
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>{isDeleting && '!'}Delete</button>
    </div>
  )
}

export default OrderView
