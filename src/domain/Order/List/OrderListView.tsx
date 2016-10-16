/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:disable:no-unused-variable */
import {IOrder} from '../IOrder'
import {observable, observer} from 'lib/Reactive';
import {OrderListItemView} from './OrderListItemView'
import {OrderListItemQuickView} from './OrderListItemQuickView'

export enum mode {
  List = 1,
  Create
}

export interface IOrderListViewProps {
  value: IOrder[]
  OrderCreate: any,
  CustomerLookup: any
  onDirtyChange: (isDirty) => void
  onReload: () => void
}

@observer
export class OrderListView extends React.Component<IOrderListViewProps, void> {

  @observable
  index: number = null

  @observable
  mode: mode = mode.List

  constructor(props, context) {
    super(props, context)
  }

  onCreated = () => {
    this.mode = mode.List
    this.props.onReload()
  }

  onCancel = () => {
    this.mode = mode.List
  }

  onCreate = () => {
    this.mode = mode.Create
  }

  onShowDetails = (i) => {
    this.index = this.index === i ? null : i
  }

  render() {
    let {value, OrderCreate} = this.props
    return (
      <div>
        {this.mode === mode.List && (
          <div>
            <div>
              <button onClick={this.onCreate}>Add</button>
            </div>
            <div>
              <table>
                <tbody>
                {value.map((val, i) => ([
                  <tr key={i + '_0'}>
                    <OrderListItemView
                      value={val}
                      onShowDetails={this.onShowDetails.bind(this, i)}
                    />
                  </tr>,
                  this.index === i
                    ? (
                    <tr key={i + '_1'}>
                      <td>
                        <OrderListItemQuickView value={val}/>
                    </td>
                    </tr>
                  )
                    : null
                ]))}
                </tbody>
              </table>

            </div>
          </div>
        )}
        {this.mode === mode.Create && (
          <OrderCreate
            onCreated={this.onCreated}
            onCancel={this.onCancel}
            CustomerLookup={this.props.CustomerLookup}
            onDirtyChange={this.props.onDirtyChange}
          />
        )}
      </div>
    )
  }
}

export default OrderListView