import * as React from 'react'
import {IOrder} from '../IOrder'

export interface IOrderListItemViewProps {
  value: IOrder
  onShowDetails: () => void
}

export class OrderListItemView extends React.Component<IOrderListItemViewProps, void> {

  render() {
    let value = this.props.value
    return (
      <td>
        {JSON.stringify(value)}
        <button onClick={this.props.onShowDetails}>Show</button>
      </td>
    )
  }
}

export default OrderListItemView