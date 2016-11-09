/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:disable:no-unused-variable */
import {IOrderDetail} from './IOrderDetail.gen'

export const OrderDetailView = ({
  value,
  onEdit,
  onDelete,
  isDeleting
}: {
  value: IOrderDetail,
  onEdit: () => void,
  onDelete: () => void,
  isDeleting: boolean
}) => {
  return (
    <div>
      <div>{JSON.stringify(value)}</div>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>{isDeleting && '!'}Delete</button>
    </div>
  )
}

export default OrderDetailView
