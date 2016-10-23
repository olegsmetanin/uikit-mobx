import * as React from 'react'
import {IOrderDetail} from './IOrderDetail'

export interface IOrderDetailListItemViewProps {
  index: any
  value: IOrderDetail
  onShowDetails: (index) => void
}

export class OrderDetailListItemView extends React.Component<IOrderDetailListItemViewProps, void> {

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

export default OrderDetailListItemView
