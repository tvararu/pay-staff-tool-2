import React, { Component } from 'react'
import TransactionDetail from './TransactionDetail'
import TransactionFilters from './TransactionFilters'
import TransactionList from './TransactionList'
import PropTypes from '../propTypes'
let gapi = window.gapi

const POLL_INTERVAL = 50
const CLIENT_ID = '346594036666-onvig8chsunlgds9bcrc33fifa80p7d9.apps.googleusercontent.com'
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
const DISCOVERY_URL = 'https://sheets.googleapis.com/$discovery/rest?version=v4'
const SPREADSHEET_ID = '1KThLEWTiXyl4j7AueDXq3FOKr_rkoZ57Db6kKChe0LA'

function formatDate (date) {
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const day = date.getDate()
  const month = MONTHS[date.getMonth()]
  const year = date.getFullYear()
  const hh = ('0' + date.getHours()).slice(-2)
  const mm = ('0' + date.getMinutes()).slice(-2)
  // 2 Jul 2016 – 12:45
  return `${day} ${month} ${year} - ${hh}:${mm}`
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
    startDate: formatDate(new Date(Date.parse(row[11]))),
    startEnter: formatDate(new Date(Date.parse(row[12]))),
    authSubmit: formatDate(new Date(Date.parse(row[13]))),
    authSucceed: formatDate(new Date(Date.parse(row[14]))),
    paySubmit: formatDate(new Date(Date.parse(row[15]))),
    paySucceed: formatDate(new Date(Date.parse(row[16]))),
    failed: formatDate(new Date(Date.parse(row[17])))
  }
}

class GoogleSheetsApi extends Component {
  static propTypes = {
    onReady: PropTypes.func.isRequired
  }

  state = {
    googleAuthError: false
  }

  constructor (props) {
    super(props)

    this._checkGoogle = true
    this.pollGoogle()

    this.loadSheetsApi = this.loadSheetsApi.bind(this)
  }

  componentWillUnmount () {
    this._checkGoogle = false
  }

  pollGoogle () {
    gapi = window.gapi
    const isGapiReady = gapi && gapi.auth && gapi.auth.authorize
    if (isGapiReady) {
      this.loadSheetsApi()
    } else if (this._checkGoogle) {
      setTimeout(() => this.pollGoogle(), POLL_INTERVAL)
    }
  }

  loadSheetsApi () {
    this.setState({ googleAuthError: false })
    gapi.auth.authorize({
      'client_id': CLIENT_ID,
      'scope': SCOPES,
      'immediate': true
    }, (authResult) => {
      if (authResult.error) {
        this.setState({ googleAuthError: authResult })
        return
      }

      gapi.client.load(DISCOVERY_URL).then(() => {
        this.props.onReady(gapi)
      })
    })
  }

  render () {
    const {googleAuthError} = this.state

    return <div>
      {(googleAuthError)
        ? <div>
          <p>
            Google Auth error: {googleAuthError.error} {googleAuthError.error_subtype}<br />
            Authorize access to Google Sheets API <button onClick={this.loadSheetsApi}>Authorize</button>
          </p>
        </div>
        : null
      }
    </div>
  }
}

export default class App extends Component {
  state = {
    applyFilter: false,
    filteredTransactions: [],
    filterCardType: 'All types',
    filterPaymentStatus: 'All transactions',
    filterReferenceNumberOrEmail: '',
    gapi: false,
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
  }

  handleGoogleSheetsApiReady (gapi) {
    this.setState({ gapi })
    this.loadSpreadsheet()
  }

  loadSpreadsheet () {
    this.state.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Dataset0.1!A' + 2 + ':R' + 101
    }).then((response) => {
      this.setState({
        transactions: response.result.values.map(rowToTransaction)
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

  handleTransactionSelect (idx) {
    this.setState({ selectedTransaction: idx })
  }

  handleTransactionUnselect () {
    this.setState({ selectedTransaction: null })
  }

  handleCardTypeChange (evt) {
    this.setState({ filterCardType: evt.target.value })
  }

  handlePaymentStatusChange (evt) {
    this.setState({ filterPaymentStatus: evt.target.value })
  }

  handleReferenceNumberOrEmailChange (evt) {
    this.setState({ filterReferenceNumberOrEmail: evt.target.value })
  }

  handleApplyFilters () {
    const filterCardType = (tr) => {
      // TODO: Handle 'Debit card only' and 'Credit card only'.
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

    const filteredTransactions = this.state.transactions
      .filter(filterCardType)
      .filter(filterPaymentStatus)
      .filter(filterByReferenceNumberOrEmail)

    this.setState({
      applyFilter: true,
      filteredTransactions
    })
  }

  render () {
    const transactions = this.getTransactions()
    const {selectedTransaction, gapi} = this.state
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
            handleFilterButtonClick={this.handleApplyFilters}
            handleCardTypeChange={this.handleCardTypeChange}
            handlePaymentStatusChange={this.handlePaymentStatusChange}
            handleReferenceNumberOrEmailChange={this.handleReferenceNumberOrEmailChange}
            cardType={this.state.filterCardType}
            paymentStatus={this.state.filterPaymentStatus}
            referenceNumberOrEmail={this.state.filterReferenceNumberOrEmail}
          />
          <TransactionList
            handleTransactionClick={this.handleTransactionSelect}
            loading={!!gapi}
            transactions={transactions}
          />
        </div>
      }
    </div>
  }
}
