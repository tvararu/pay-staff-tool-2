import React, { Component } from 'react'

export default class TransactionRow extends Component {
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
