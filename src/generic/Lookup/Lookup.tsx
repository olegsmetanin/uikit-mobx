import * as React from 'react'
import {ILookup} from './ILookup';

export interface ILookupProps {
  value: ILookup
  onChange: (value: ILookup) => void

  isLoading: boolean
  count: number
  data: ILookup[]
  onSearch: (filter: any, page?: number) => void
}

export interface ILookupState {
  text: string
  searchOpened: boolean
  page: number
}

export class Lookup extends React.Component<ILookupProps, ILookupState> {

  constructor(props, context) {
    super(props, context)
    this.state = {
      text: '',
      searchOpened: false,
      page: 0
    }
  }

  toggleSearch = () => {
    let searchOpened = !this.state.searchOpened
    this.setState({searchOpened: searchOpened} as ILookupState)
    if (searchOpened) {
      this.props.onSearch({text: ''})
    }
  }

  onChangeText = (e) => {
    const text = e.target.value
    this.setState({text: text} as ILookupState)
    this.props.onSearch({filter: {text: text}})
  }

  onMore = () => {
//    this.props.onSearch({filter: {text: this.text}, page: this.page + 1, add: true})
  }

  onChange = (value: ILookup) => {
    this.props.onChange(value)
    this.setState({searchOpened: false} as ILookupState)
  }

  render () {
    let data = this.props.data
    return (
      <div>
        <div onClick={this.toggleSearch}>
          {this.props.value.name}
        </div>
        {this.state.searchOpened && (
          <div>
            <input value={this.state.text} onChange={this.onChangeText}/>
            {data
                ? (
                  <ul>
                    {data.map((val, i) => (
                      <li key={i} onClick={() => this.onChange(val)}>
                        {JSON.stringify(val)}
                      </li>
                    ))}
                    {(data.length < this.props.count) && (
                      <li>
                        <div onClick={this.onMore}>
                          More
                        </div>
                      </li>
                    )}

                  </ul>
                )
                : (
                  <div>
                    Loading
                  </div>
                )
            }
          </div>
        )}
        <div>
          Props: {/*JSON.stringify(this.props)*/}
        </div>
      </div>
    )
  }

}

export default Lookup
