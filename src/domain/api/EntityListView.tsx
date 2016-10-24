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

  ListTableHeader: any
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

    let {value, /*page, count,*/ Card, ListItemView, ListTableHeader} = this.props
    let PureCard = Pure(Card)
    return (
      <div>
        <button onClick={this.onCreate}>New</button>
        <table className="table">
          <thead>
            {ListTableHeader && (
              <ListTableHeader/>
            )}
          </thead>
          <tbody>
          {value.map((val, i) => ([
            <ListItemView
              key={i + '_0'}
              index={i}
              value={val}
              isOpen={this.index === i}
              onShowDetails={this.onShowDetails}
            />
            ,
            this.index === i && (
              <tr>
                <td colSpan="42">
                  <PureCard
                    key={i + '_1'}
                    oid={val.id}
                  />
                </td>
              </tr>
            )
          ]))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default EntityListView
