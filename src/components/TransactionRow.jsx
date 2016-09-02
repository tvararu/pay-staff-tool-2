import React, { Component } from 'react'
import shallowCompare from 'react-addons-shallow-compare'
import PropTypes from '../propTypes'
import FormattedTime from './FormattedTime'

export default class TransactionRow extends Component {
  static propTypes = {
    handleClick: PropTypes.func.isRequired,
    transaction: PropTypes.transaction.isRequired
  }

  shouldComponentUpdate (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState)
  }

  render () {
    const {reference, email, amount, card, status, subStatus, startDate} = this.props.transaction

    return <tr
      onClick={this.props.handleClick}
      className='clickable-row'
    >
      <td>{ reference }</td>
      <td>{ email.slice(0, 20) }</td>
      <td>£{ amount }.00</td>
      <td>{ card }</td>
      <td>
        { status }
        {(status === 'Failed')
          ? <span className='error-code'>{ subStatus }</span>
          : null
        }
      </td>
      <td><FormattedTime time={startDate} /></td>
    </tr>
  }
}
