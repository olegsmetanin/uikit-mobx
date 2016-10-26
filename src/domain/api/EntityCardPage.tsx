import * as React from 'react'

export interface IEntityCardPageProps {
  params: {id: string}
  Card: any
  cid: string
  pid: string
}

export abstract class EntityCardPage extends React.Component<IEntityCardPageProps, void> {


  constructor(props, context) {
    super(props, context)
  }

  render() {
    const {Card} = this.props
    const pid = `${this.props.pid}.${this.props.cid}`
    return (
      <Card
        pid={pid}
        oid={this.props.params.id}
      />
    )
  }

}