import * as React from 'react'

export interface IEntityListPageProps {
  List: any
  cid: string
  pid: string
}

export abstract class EntityListPage extends React.Component<IEntityListPageProps, void> {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const {List} = this.props
    const pid = `${this.props.pid}.${this.props.cid}`
    return (
      <div>
        <List pid={pid}/>
      </div>
    )
  }

}
