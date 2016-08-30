import React, { Component } from 'react'
import TransactionRow from './TransactionRow'

export default class TransactionList extends Component {
  render () {
    const transactions = [
      {
        row: 83,
        reference: 'SRV517376',
        firstName: 'Diana',
        lastName: 'Welch',
        email: 'd_welch79@aol.com',
        amount: '40',
        status: 'Successful',
        subStatus: '',
        card: 'American Express',
        provider: 'Worldpay',
        gatewayId: 'ugyjxa7o-abmt-f9as-ql6k-a6xht6m8cghl',
        payId: '1j2wszbyouasj5zutv63vimx',
        startDate: '8 Jan 2016 - 18:50',
        startEnter: '8 Jan 2016 - 18:50',
        authSubmit: '8 Jan 2016 - 18:51',
        authSucceed: '8 Jan 2016 - 18:51',
        paySubmit: '8 Jan 2016 - 18:52',
        paySucceed: '8 Jan 2016 - 18:52',
        failed: 'NaN undefined NaN - aN:aN'
      }
    ]

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
