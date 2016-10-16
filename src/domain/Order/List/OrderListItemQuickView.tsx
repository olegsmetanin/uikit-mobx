import * as React from 'react'
import {IOrder} from '../IOrder'

export interface IOrderListItemQuickViewProps {
  value: IOrder
  // OrderListView: any
}

export class OrderListItemQuickView extends React.Component<IOrderListItemQuickViewProps, void> {

  render() {
    let value = this.props.value
    return (
      <div>
        <div>
          {JSON.stringify(value)}
        </div>
        <div>
          Order List:
          <div>

          </div>
        </div>

      </div>
    )
  }
}

export default OrderListItemQuickView