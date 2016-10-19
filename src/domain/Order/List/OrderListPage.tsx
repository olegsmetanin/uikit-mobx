import * as React from 'react'

export interface IOrderListPageProps {
  OrderList: any
}

export class OrderListPage extends React.Component<IOrderListPageProps, void> {
  constructor(props, context) {
    super(props, context)
    console.log('OrderListPage create')
  }

  render() {
    console.log('OrderListPage render props', this.props)
    const {OrderList} = this.props
    return (
      <div>
        <OrderList/>
      </div>
    )
  }

}

export default OrderListPage