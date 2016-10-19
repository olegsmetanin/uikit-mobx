import * as React from 'react'
import {IOrder} from '../IOrder'

export interface IOrderListItemViewProps {
  index: any
  value: IOrder
  onShowDetails: (index) => void
}

export class OrderListItemView extends React.Component<IOrderListItemViewProps, void> {

  onShowDetails = () => {
    this.props.onShowDetails(this.props.index)
  }

  render() {
    let value = this.props.value
    return (
      <td>
        {JSON.stringify(value)}
        <button onClick={this.onShowDetails}>Show</button>
      </td>
    )
  }
}

export default OrderListItemView
