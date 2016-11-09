/* tslint:disable:no-unused-variable */
import * as React from 'react'
/* tslint:disable:no-unused-variable */
import {IOrderDetailListFilter} from './IOrderDetailListFilter'

export const OrderDetailListFilter = ({
  value,
  onFilterChange,
  onClear
}: {
  value: IOrderDetailListFilter,
  onFilterChange: (value: IOrderDetailListFilter) => void,
  onClear: () => void
}) => {
  const handleFilterChange = () => {
    onFilterChange({quantity: 1})
  }

  return (
    <div>
      <div>
        Filter
      </div>
      <div>{JSON.stringify(value)}</div>
      <button onClick={handleFilterChange}>Apply</button>
      <button onClick={onClear}>Clear</button>
    </div>
  )
}

