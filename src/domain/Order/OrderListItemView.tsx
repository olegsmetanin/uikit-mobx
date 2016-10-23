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
      <td>
        {JSON.stringify(value)}
        <button onClick={this.onShowDetails}>{isOpen ? 'Hide' : 'Show'}</button>
      </td>
    )
  }
}

export default OrderListItemView
