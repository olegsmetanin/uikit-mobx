/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:disable:no-unused-variable */
import {IOrder} from './IOrder.gen'

export const OrderListTableHeader = ({
  filter
}: {
  filter: any
}) => {
  return (
    <tr>
      <th>
        #
      </th>
      <th>
        Name
      </th>
      <th>
        Customer
      </th>
      <th>
        Price
      </th>
      <th>
      </th>
    </tr>
  )
}

export default OrderListTableHeader
