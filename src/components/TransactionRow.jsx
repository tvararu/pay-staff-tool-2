import React, { Component } from 'react'
import PropTypes from '../propTypes'

export default class TransactionRow extends Component {
  static propTypes = {
    transaction: PropTypes.shape({
      reference: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
      card: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      subStatus: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired
    }).isRequired
  }

  render () {
    const {reference, email, amount, card, status, subStatus, startDate} = this.props.transaction

    return <tr className='clickable-row'>
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
      <td>{ startDate }</td>
    </tr>
  }
}
