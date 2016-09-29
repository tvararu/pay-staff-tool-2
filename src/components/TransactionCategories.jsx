import React, { Component } from 'react'

export default class TransactionCategories extends Component {  
  render () {
    var transactions = this.props.transactions
    var txSuccessful = transactions.filter(function(tx){return tx.status==='Successful'})
    var txSuccessfulAmount = txSuccessful.reduce(function(acc, tr){return acc + parseInt(tr.amount, 10)}, 0)

    var txFailed = transactions.filter(function(tx){return tx.status==='Failed'})
    var txFailedAmount = txFailed.reduce(function(acc, tr){return acc + parseInt(tr.amount, 10)}, 0)

    var txRefunds = transactions.filter(function(tx){return tx.status==='Refunds'})
    var txRefundsAmount = txRefunds.reduce(function(acc, tr){return acc + parseInt(tr.amount, 10)}, 0)

    var netIncomeAmount = txSuccessfulAmount - txRefundsAmount
    return (
      <div>
        <span>
          {transactions.length} {(transactions.length === 1) ? 'transaction' : 'transactions'}
        </span>
        <div className="transaction-categories">
          <div className="category category--successful">
            <p>Successful</p>
            <div className="category__amount">{txSuccessful.length} — <span className="category__sum">£{txSuccessfulAmount}.00</span></div>
          </div>
          <div className="category category--failed">
            <p>Failed</p>
            <div className="category__amount">{txFailed.length} — <span className="category__sum">£{txFailedAmount}.00</span></div>
          </div>
          <div className="category category--refunds">
            <p>Refunds</p>
            <div className="category__amount">{txRefunds.length} — <span className="category__sum">£{txRefundsAmount}.00</span></div>
          </div>
          <img className="arrow" src="/public/images/category-arrow.png" alt="" />
          <div className="category category--net-income">
            <p>Net income</p>
            <div className="category__amount"><span className="category__sum">£{netIncomeAmount}.00</span></div>
          </div>
        </div>
      </div>
    )
  }
}
