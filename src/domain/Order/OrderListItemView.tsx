import * as React from 'react'
import {IOrder} from './IOrder'
import {observer} from 'lib/Reactive'

export interface IOrderListItemViewProps {
  index: any
  value: IOrder
  onShowDetails: (index) => void
  isOpen: boolean
}

@observer
export class OrderListItemView extends React.Component<IOrderListItemViewProps, void> {

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
          {value.name}
        </td>
        <td>
          {value.customer.name}
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

export default OrderListItemView
