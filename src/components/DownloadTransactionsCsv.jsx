import React, { Component } from 'react'
import PropTypes from '../propTypes'
import moment from 'moment'

export default class DownloadTransactionsCsv extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    transactions: PropTypes.arrayOf(PropTypes.transaction).isRequired
  }

  render () {
    const {transactions} = this.props

    const prettyKeys = ['Reference number', 'Email address', 'Amount', 'Payment status', 'Date', 'Card type', 'Provider', 'Provider ID', 'GOV.UK Pay ID']
    const keys = ['reference', 'email', 'amount', 'status', 'startDate', 'card', 'provider', 'gatewayId', 'payId']
    const csv = (transactions.length)
      ? [prettyKeys.join(',')].concat(
        this.props.transactions.map((transaction) => {
          return keys.reduce((line, key) => {
            let field = transaction[key]
            if (key === 'amount') {
              field = `£${field}.00`
            }

            const subStatus = transaction['subStatus']
            if (key === 'status' && subStatus) {
              field = `${field} (${subStatus})`
            }

            if (key === 'startDate') {
              field = moment(transaction['startDate']).format('DD/MM/YY hh:mm:ss')
            }

            return (line + ((line.length) ? ',' : '') + field)
          }, '')
        })
      ).join('\n')
      : [].join('\n')

    return <a
      download='transactions.csv'
      href={'data:text/csv;charset=utf-8,' + encodeURIComponent(csv)}
      target='_blank'
    >
      {this.props.children}
    </a>
  }
}
