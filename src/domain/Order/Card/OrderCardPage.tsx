import * as React from 'react'

export interface IOrderCardPageProps {
  params: {id: string}
  OrderCard: any
}

export class OrderCardPage extends React.Component<IOrderCardPageProps, void> {


  constructor(props, context) {
    super(props, context)
  }

  render() {
    const {OrderCard} = this.props
    return (
      <OrderCard
        oid={this.props.params.id}
      />
    )
  }

}