/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:disable:no-unused-variable */
import {IOrder} from './IOrder'

export const OrderView = ({
  value,
  onEdit,
  onDelete,
  isDeleting,
  OrderDetailList,
  pid
}: {
  value: IOrder,
  onEdit: () => void,
  onDelete: () => void,
  isDeleting: boolean,
  OrderDetailList: any,
  pid: string
}) => {
  return (
    <div>
      <div>
        <span>Id: </span><span>{value.id}</span>
      </div>
      <div>
        <span>Customer: </span><span>{value.customer.name}</span>
      </div>
      <div>
        <div>
          Detail:
        </div>
        <OrderDetailList
          pid={pid}
          filter={{order: {id: value.id}}}
        />
      </div>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>{isDeleting && '!'}Delete</button>
    </div>
  )
}

export default OrderView
