import React, { Component } from 'react'
import PropTypes from '../propTypes'

export default class InputText extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
    value: PropTypes.string.isRequired
  }

  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  handleChange (evt) {
    this.props.onChange(evt.target.value)
  }

  handleKeyUp (evt) {
    const isEnter = evt.keyCode === 13
    if (isEnter && this.props.onSubmit) {
      this.props.onSubmit()
    }
  }

  render () {
    const {id, value} = this.props

    return <input
      className='form-control'
      id={id}
      onChange={this.handleChange}
      onKeyUp={this.handleKeyUp}
      type='text'
      value={value}
    />
  }
}
