import * as React from 'react'

export interface IEntityListPageProps {
  List: any
}

export abstract class EntityListPage extends React.Component<IEntityListPageProps, void> {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const {List} = this.props
    return (
      <div>
        <List/>
      </div>
    )
  }

}
