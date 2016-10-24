import * as React from 'react'
import {IOrderDetail} from './IOrderDetail'

export interface IOrderDetailListItemViewProps {
  index: any
  value: IOrderDetail
  onShowDetails: (index) => void
  isOpen: boolean
}

export class OrderDetailListItemView extends React.Component<IOrderDetailListItemViewProps, void> {

  onShowDetails = () => {
    this.props.onShowDetails(this.props.index)
  }

  render() {
    let {value, isOpen} = this.props
    return (
      <tr>
        <td>
          {value.id}
        </td>
        <td>
          {value.product.name}
        </td>
        <td>
          {value.quantity}
        </td>
        <td>
          {value.price}
        </td>
        <td>
          <button onClick={this.onShowDetails}>{isOpen ? 'Hide' : 'Show'}</button>
        </td>
      </tr>
    )
  }
}

export default OrderDetailListItemView
