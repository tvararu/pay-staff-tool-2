import React, { Component } from 'react'
import PropTypes from '../propTypes'
import TransactionRow from './TransactionRow'

export default class TransactionList extends Component {
  static propTypes = {
    transactions: PropTypes.arrayOf(PropTypes.transaction).isRequired
  }

  render () {
    const {transactions} = this.props

    return <div className='table-list'>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>Reference number</th>
            <th scope='col'>Email address</th>
            <th scope='col'>Amount</th>
            <th scope='col'>Card type</th>
            <th scope='col' className='status-column'>Payment status</th>
            <th scope='col'>Date created</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tr, idx) =>
            <TransactionRow
              key={idx}
              transaction={tr}
            />
          )}
        </tbody>
      </table>
    </div>
  }
}
