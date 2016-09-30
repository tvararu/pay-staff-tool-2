import React, { Component } from 'react'
import PropTypes from '../propTypes'
import DownloadTransactionsCsv from './DownloadTransactionsCsv'
import TransactionRow from './TransactionRow'

export default class TransactionList extends Component {
  static propTypes = {
    handleTransactionClick: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    transactions: PropTypes.arrayOf(PropTypes.transaction).isRequired
  }

  render () {
    const {transactions, loading} = this.props
    const noTransactions = transactions.length === 0

    return <div>
      <div className='column-three-quarters filter-fields'>
        <h2 className='heading-small'>
          <DownloadTransactionsCsv
            transactions={transactions}
          >
            Download a spreadsheet of these transactions
          </DownloadTransactionsCsv>
        </h2>
      </div>
      <div className='table-list'>
        <table className='table table-layout-fixed'>
          <thead>
            <tr>
              <th scope='col'>Reference number</th>
              <th scope='col'>Email address</th>
              <th scope='col'>Amount</th>
              <th scope='col'>Card type</th>
              <th scope='col' className='status-column'>Payment status</th>
              <th scope='col'>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tr, idx) => {
              const handleClick = () => this.props.handleTransactionClick(idx)
              return <TransactionRow
                handleClick={handleClick}
                key={idx}
                transaction={tr}
              />
            })}
          </tbody>
        </table>
        {(loading)
          ? <div className='pre-load-marker'>
            <img src='/public/images/ring.gif' alt='Loading spinner' />
            <p>Fetching data from Google Sheets</p>
          </div>
          : null
        }
        {(noTransactions && !loading)
          ? <p>There are no transactions that match your current filters.</p>
          : null
        }
      </div>
    </div>
  }
}
