import React, { Component } from 'react'
import GoogleSheetsApi from './GoogleSheetsApi'
import TransactionDetail from './TransactionDetail'
import TransactionFilters from './TransactionFilters'
import TransactionList from './TransactionList'
import TransactionCategories from './TransactionCategories'
import moment from 'moment'

const SPREADSHEET_ID = '1KThLEWTiXyl4j7AueDXq3FOKr_rkoZ57Db6kKChe0LA'

function parseSpreadsheetDate (d) {
  if (!d) { return '' }
  const [dd, MM, yyyy, hh, mm, ss] = d.trim().split(/\D/)
  return `${MM}/${dd}/${yyyy} ${hh}:${mm}:${ss}`
}

function rowToTransaction (row) {
  return {
    reference: row[0],
    firstName: row[1],
    lastName: row[2],
    email: row[3],
    amount: row[4],
    status: row[5],
    subStatus: row[6],
    card: row[7],
    provider: row[8],
    gatewayId: row[9],
    payId: row[10],
    startDate: new Date(parseSpreadsheetDate(row[11])),
    startEnter: new Date(parseSpreadsheetDate(row[12])),
    authSubmit: new Date(parseSpreadsheetDate(row[13])),
    authSucceed: new Date(parseSpreadsheetDate(row[14])),
    paySubmit: new Date(parseSpreadsheetDate(row[15])),
    paySucceed: new Date(parseSpreadsheetDate(row[16])),
    failed: new Date(parseSpreadsheetDate(row[17])),
    failReason: row[18]
  }
}

function getFromDate (ddmmyyyy, hhmmss) {
  let [yyyy, MM, dd, hh, mm, ss] = '100-01-01 00:00:00'.split(/-|:|\s/)
  if (ddmmyyyy.length) {
    [dd, MM, yyyy] = ddmmyyyy.trim().split('/')
    if (hhmmss.length) {
      [hh, mm, ss] = hhmmss.trim().split(':')
    }
  }
  return new Date(`${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`)
}

function getToDate (ddmmyyyy, hhmmss) {
  let [yyyy, MM, dd, hh, mm, ss] = '9999-12-31 23:59:59'.split(/-|:|\s/)
  if (ddmmyyyy.length) {
    [dd, MM, yyyy] = ddmmyyyy.trim().split('/')
    if (hhmmss.length) {
      [hh, mm, ss] = hhmmss.trim().split(':')
    }
  }
  return new Date(`${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`)
}

function isBetweenDates (d, before, after) {
  return +before < +d && +d < +after
}

export default class App extends Component {
  state = {
    applyFilter: false,
    filteredTransactions: [],
    filterCardType: 'All types',
    filterPaymentStatus: 'All transactions',
    filterReferenceNumberOrEmail: '',
    filterMinDate: moment(),
    filterMaxDate: moment(),
    filterFromDate: moment(),
    filterFromTime: '00:00:00',
    filterToDate: moment(),
    filterToTime: '23:59:59',
    gapi: false,
    loading: true,
    selectedTransaction: null,
    transactions: []
  }

  constructor (props) {
    super(props)

    this.handleTransactionSelect = this.handleTransactionSelect.bind(this)
    this.handleTransactionUnselect = this.handleTransactionUnselect.bind(this)
    this.handleApplyFilters = this.handleApplyFilters.bind(this)
    this.handleCardTypeChange = this.handleCardTypeChange.bind(this)
    this.handlePaymentStatusChange = this.handlePaymentStatusChange.bind(this)
    this.handleReferenceNumberOrEmailChange = this.handleReferenceNumberOrEmailChange.bind(this)
    this.handleGoogleSheetsApiReady = this.handleGoogleSheetsApiReady.bind(this)
    this.handleResetFilters = this.handleResetFilters.bind(this)
    this.handleFromDateChange = this.handleFromDateChange.bind(this)
    this.handleFromTimeChange = this.handleFromTimeChange.bind(this)
    this.handleToDateChange = this.handleToDateChange.bind(this)
    this.handleToTimeChange = this.handleToTimeChange.bind(this)
  }

  handleGoogleSheetsApiReady (gapi) {
    this.setState({
      gapi,
      loading: false
    })
    this.loadSpreadsheet()
  }

  loadSpreadsheet () {
    this.setState({ loading: true })
    this.state.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Dataset0.1!A' + 2 + ':S' + 500
    }).then((response) => {
      const transactions = response.result.values.map(rowToTransaction)
      let keyDates = transactions.reduce((kd, curr) => {
        if (curr.startDate < kd.min) { kd.min = curr.startDate }
        if (curr.startDate > kd.max) { kd.max = curr.startDate }
        return kd
      }, {
        min: transactions[0].startDate,
        max: transactions[0].startDate
      })
      keyDates.min = moment(keyDates.min)
      keyDates.max = moment(keyDates.max)
      this.setState({
        loading: false,
        transactions,
        filterMinDate: keyDates.min,
        filterMaxDate: keyDates.max,
        filterFromDate: keyDates.min,
        filterToDate: keyDates.max
      })
    }, (response) => {
      console.log('Error: ' + response.result.error.message)
    })
  }

  getTransactions () {
    return (this.state.applyFilter)
      ? this.state.filteredTransactions
      : this.state.transactions
  }

  scrollToTop () {
    window.scrollTo(0, 0)
  }

  handleTransactionSelect (idx) {
    this.scrollToTop()
    this.setState({ selectedTransaction: idx })
  }

  handleTransactionUnselect () {
    this.scrollToTop()
    this.setState({ selectedTransaction: null })
  }

  handleCardTypeChange (evt) {
    this.setState({ filterCardType: evt.target.value })
  }

  handlePaymentStatusChange (evt) {
    this.setState({ filterPaymentStatus: evt.target.value })
  }

  handleReferenceNumberOrEmailChange (value) {
    this.setState({ filterReferenceNumberOrEmail: value })
  }

  handleFromDateChange (m) {
    this.setState({ filterFromDate: m })
  }

  handleFromTimeChange (value) {
    this.setState({ filterFromTime: value })
  }

  handleToDateChange (value) {
    this.setState({ filterToDate: value })
  }

  handleToTimeChange (value) {
    this.setState({ filterToTime: value })
  }

  handleApplyFilters () {
    const filterCardType = (tr) => {
      if (this.state.filterCardType === 'All types') { return true }
      return tr.card === this.state.filterCardType
    }

    const filterPaymentStatus = (tr) => {
      // TODO: Handle refunds.
      if (this.state.filterPaymentStatus === 'All transactions') { return true }
      return tr.status === this.state.filterPaymentStatus
    }

    const filterByReferenceNumberOrEmail = (tr) => {
      const referenceNumberOrEmail = this.state.filterReferenceNumberOrEmail.trim().toLowerCase()
      if (!referenceNumberOrEmail) { return true }
      const data = (tr.reference + tr.email).toLowerCase()
      const hasPartialMatch = data.indexOf(referenceNumberOrEmail) !== -1
      return hasPartialMatch
    }

    const filterByDate = (tr) => {
      const fromDate = getFromDate(this.state.filterFromDate.format('DD/MM/YYYY'), this.state.filterFromTime)
      const toDate = getToDate(this.state.filterToDate.format('DD/MM/YYYY'), this.state.filterToTime)
      const isBetween = isBetweenDates(tr.startDate, fromDate, toDate)
      return isBetween
    }

    const filteredTransactions = this.state.transactions
      .filter(filterCardType)
      .filter(filterPaymentStatus)
      .filter(filterByReferenceNumberOrEmail)
      .filter(filterByDate)

    this.setState({
      applyFilter: true,
      filteredTransactions
    })
  }

  handleResetFilters (evt) {
    evt.preventDefault()
    this.setState({
      applyFilter: false,
      filteredTransactions: [],
      filterCardType: 'All types',
      filterPaymentStatus: 'All transactions',
      filterReferenceNumberOrEmail: '',
      filterFromDate: moment(),
      filterFromTime: '00:00:00',
      filterToDate: moment(),
      filterToTime: '23:59:59'
    })
  }

  render () {
    const transactions = this.getTransactions()
    const {selectedTransaction, loading, applyFilter} = this.state
    const hasSelectedTransaction = selectedTransaction !== null

    return <div>
      <GoogleSheetsApi
        onReady={this.handleGoogleSheetsApiReady}
      />
      <h1 className='heading-large underline'>Transactions</h1>
      {(hasSelectedTransaction)
        ? <div>
          <TransactionDetail
            handleBackClick={this.handleTransactionUnselect}
            transaction={transactions[selectedTransaction]}
          />
        </div>
        : <div>
          <TransactionFilters
            applyFilter={applyFilter}
            handleFilterButtonClick={this.handleApplyFilters}
            handleCardTypeChange={this.handleCardTypeChange}
            handlePaymentStatusChange={this.handlePaymentStatusChange}
            handleReferenceNumberOrEmailChange={this.handleReferenceNumberOrEmailChange}
            handleFromDateChange={this.handleFromDateChange}
            handleFromTimeChange={this.handleFromTimeChange}
            handleToDateChange={this.handleToDateChange}
            handleToTimeChange={this.handleToTimeChange}
            handleResetFilters={this.handleResetFilters}
            cardType={this.state.filterCardType}
            minDate={this.state.filterMinDate}
            maxDate={this.state.filterMaxDate}
            fromDate={this.state.filterFromDate}
            fromTime={this.state.filterFromTime}
            toDate={this.state.filterToDate}
            toTime={this.state.filterToTime}
            paymentStatus={this.state.filterPaymentStatus}
            referenceNumberOrEmail={this.state.filterReferenceNumberOrEmail}
          />
          <TransactionCategories
            transactions={transactions}
          />
          <TransactionList
            handleTransactionClick={this.handleTransactionSelect}
            loading={loading}
            transactions={transactions}
          />
        </div>
      }
    </div>
  }
}
