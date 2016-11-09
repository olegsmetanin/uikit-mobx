import * as React from 'react'
import {observable} from 'lib/Reactive'
import {Pure} from 'generic'
import {IEntity} from './IEntity'
import {IPage} from './IPage'
import {ISort} from './ISort'

export interface IEntityListViewV2Props<T, F> {
  value: T[]

  onCreate: () => void
  ListItemView: any
  ListTableHeader: any
  Card: any
  Filter: any

  filter: F
  onFilterChange: (filter: F) => void
  sort: ISort
  onSortChange: (sort: any) => void
  page: IPage
  onPageChange: (page: any) => void

  pid: string
}

export abstract class EntityListViewV2<T extends IEntity, F> extends React.Component<IEntityListViewV2Props<T, F>, void> {

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

    let {value, /*page, count,*/ Card, ListItemView, ListTableHeader, Filter} = this.props
    console.log('EntityListViewV2 render', this.props.filter)
    let PureCard = Pure(Card)
    return (
      <div>
        <button onClick={this.onCreate}>New</button>
        <Filter value={this.props.filter} onFilterChange={this.props.onFilterChange}/>
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
                    pid={this.props.pid}
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

