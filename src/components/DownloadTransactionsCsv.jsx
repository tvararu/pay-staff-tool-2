import React, { Component } from 'react'
import PropTypes from '../propTypes'

export default class DownloadTransactionsCsv extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    transactions: PropTypes.arrayOf(PropTypes.transaction).isRequired
  }

  render () {
    const {transactions} = this.props

    const keys = ['reference', 'email', 'amount', 'card', 'status', 'subStatus', 'startDate']
    const csv = (transactions.length)
      ? [keys.join(',')].concat(
        this.props.transactions.map((transaction) =>
          keys.reduce((line, key) => (line + ((line.length) ? ',' : '') + transaction[key]), '')
        )
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
