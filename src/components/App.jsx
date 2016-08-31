import React, { Component } from 'react'
import TransactionDetail from './TransactionDetail'
import TransactionList from './TransactionList'
const gapi = window.gapi

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

export default class App extends Component {
  state = {
    selectedTransaction: null,
    transactions: []
  }

  constructor (props) {
    super(props)
    this._checkGoogle = true
    this.pollGoogle()

    this.handleTransactionSelect = this.handleTransactionSelect.bind(this)
    this.handleTransactionUnselect = this.handleTransactionUnselect.bind(this)
  }

  componentWillUnmount () {
    clearTimeout(this._timeout)
  }

  pollGoogle () {
    const isGapiReady = gapi && gapi.auth && gapi.auth.authorize
    if (isGapiReady) {
      this.loadSheetsApi()
    } else {
      this._timeout = setTimeout(() => this.pollGoogle(), POLL_INTERVAL)
    }
  }

  loadSheetsApi () {
    gapi.auth.authorize({
      'client_id': CLIENT_ID,
      'scope': SCOPES,
      'immediate': true
    }, (authResult) => {
      if (authResult.error) { throw authResult.error }

      gapi.client.load(DISCOVERY_URL).then(() => {
        this.loadSpreadsheet()
      })
    })
  }

  loadSpreadsheet () {
    gapi.client.sheets.spreadsheets.values.get({
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

  handleTransactionSelect (idx) {
    this.setState({ selectedTransaction: idx })
  }

  handleTransactionUnselect () {
    this.setState({ selectedTransaction: null })
  }

  render () {
    const {transactions, selectedTransaction} = this.state
    const hasSelectedTransaction = selectedTransaction !== null

    return <div>
      {(hasSelectedTransaction)
        ? <TransactionDetail
          handleBackClick={this.handleTransactionUnselect}
          transaction={transactions[selectedTransaction]}
        />
        : <TransactionList
          handleTransactionClick={this.handleTransactionSelect}
          transactions={transactions}
        />
      }
    </div>
  }
}
