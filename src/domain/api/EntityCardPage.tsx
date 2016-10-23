import * as React from 'react'

export interface IEntityCardPageProps {
  params: {id: string}
  Card: any
}

export abstract class EntityCardPage extends React.Component<IEntityCardPageProps, void> {


  constructor(props, context) {
    super(props, context)
  }

  render() {
    const {Card} = this.props
    return (
      <Card
        oid={this.props.params.id}
      />
    )
  }

}