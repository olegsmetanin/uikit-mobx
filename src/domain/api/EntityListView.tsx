import * as React from 'react'
import {observable} from 'lib/Reactive'
import {Pure} from 'generic'
import {IEntity} from './IEntity'

export interface IEntityListViewProps<T> {
  value: T[]
  count: number
  page: number
  onCreate: () => void
  ListItemView: any
  Card: any
}

export abstract class EntityListView<T extends IEntity> extends React.Component<IEntityListViewProps<T>, void> {

  @observable
  index: number = null

  constructor(props, context) {
    super(props, context)
  }

  onCreate = () => {
    this.props.onCreate()
  }

  onShowDetails = (i) => {
    // console.log('onShowDetails i', i)
    this.index = this.index === i ? null : i
  }


  render() {

    let {value, /*page, count,*/ Card, ListItemView} = this.props
    let PureCard = Pure(Card)
    return (
      <div>
        <button onClick={this.onCreate}>New</button>
        <table>
          <tbody>
          {value.map((val, i) => ([
            <tr key={i + '_0'}>
              <ListItemView
                index={i}
                value={val}
                isOpen={this.index === i}
                onShowDetails={this.onShowDetails}
              />
            </tr>,
            this.index === i
              ? (
              <tr key={i + '_1'}>
                <td>
                  <PureCard
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

export default EntityListView
