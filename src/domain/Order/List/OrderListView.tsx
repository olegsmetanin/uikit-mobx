/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:disable:no-unused-variable */
import {IOrder} from '../IOrder'
import {observable, observer} from 'lib/Reactive';
import {OrderListItemView} from './OrderListItemView'
import {OrderListItemQuickView} from './OrderListItemQuickView'
// import * as Pure from 'generic'

export enum mode {
  List = 1,
  Create
}

export interface IOrderListViewProps {
  value: IOrder[]
  count: number
  page: number
  onCreate: () => void

  OrderCard: any
}

@observer
export class OrderListView extends React.Component<IOrderListViewProps, void> {

  @observable
  index: number = null

  constructor(props, context) {
    super(props, context)
  }

  onCreate = () => {
    this.props.onCreate()
  }

  onShowDetails = (i) => {
    console.log('onShowDetails i', i)
    this.index = this.index === i ? null : i
  }


  render() {
    console.log('OrderListView render props', this.props)

    let {value, page, count, OrderCard} = this.props
    // let OrderCard = /*Pure*/(OrderCard)
    return (
      <div>
        <button onClick={this.onCreate}>New</button>
        <table>
          <tbody>
          {value.map((val, i) => ([
            <tr key={i + '_0'}>
              <OrderListItemView
                index={i}
                value={val}
                onShowDetails={this.onShowDetails}
              />
            </tr>,
            this.index === i
              ? (
              <tr key={i + '_1'}>
                <td>
                  <OrderCard
                    oid={val.id}
                  />
                </td>
              </tr>
            )
              : null
          ]))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default OrderListView
