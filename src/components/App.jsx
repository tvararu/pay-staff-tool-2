import React, { Component } from 'react'
import TransactionList from './TransactionList'

export default class App extends Component {
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

    return <div>
      <TransactionList
        transactions={transactions}
      />
    </div>
  }
}
