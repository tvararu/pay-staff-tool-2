import React, { Component } from 'react'
import PropTypes from '../propTypes'

export default class TransactionFilters extends Component {
  static propTypes = {
    handleFilterButtonClick: PropTypes.func.isRequired,
    handleCardTypeChange: PropTypes.func.isRequired,
    handlePaymentStatusChange: PropTypes.func.isRequired,
    handleReferenceNumberOrEmailChange: PropTypes.func.isRequired,
    cardType: PropTypes.oneOf([
      'All types',
      'Visa',
      'Mastercard',
      'American Express',
      'JCB',
      "Diner's Club",
      'Discover',
      'Union Pay'
    ]).isRequired,
    paymentStatus: PropTypes.oneOf([
      'All transactions',
      'In progress',
      'Successful',
      'Failed',
      'Refunds'
    ]).isRequired,
    referenceNumberOrEmail: PropTypes.string.isRequired
  }

  render () {
    const {referenceNumberOrEmail, handleReferenceNumberOrEmailChange, handleFilterButtonClick,
      handleCardTypeChange, handlePaymentStatusChange, cardType, paymentStatus} = this.props

    return <div>
      <div className='overview'>
        <h2 className='heading-medium staff-subheading'>Filter transactions list</h2>
      </div>
      <div className='filter-section'>
        <div className='column-third filter-fields'>
          <div className='form-group'>
            <label className='form-label-bold' htmlFor='ref-or-email'>
              Reference number or email
              <span className='form-hint'>Enter full or partial details</span>
            </label>
            <input
              className='form-control'
              id='ref-or-email'
              onChange={handleReferenceNumberOrEmailChange}
              type='text'
              value={referenceNumberOrEmail}
            />
          </div>
        </div>
        <div className='column-third filter-fields'>
          <div className='form-group'>
            <label className='form-label-bold' htmlFor='payment-status'>
              Payment status
              <span className='form-hint'>Select an option</span>
            </label>
            <div className='dropdown'>
              <select
                className='form-control dropdown-list'
                id='payment-status'
                onChange={handlePaymentStatusChange}
                value={paymentStatus}
              >
                <option value='All transactions'>All transactions</option>
                <option value='In progress'>In progress</option>
                <option value='Successful'>Successful</option>
                <option value='Failed'>Failed</option>
                <option value='Refunds'>Refunds</option>
              </select>
            </div>
          </div>
        </div>
        <div className='column-third filter-fields'>
          <div className='form-group'>
            <label className='form-label-bold' htmlFor='card-type'>
              Card type
              <span className='form-hint'>Select an option</span>
            </label>
            <div className='dropdown'>
              <select
                className='form-control dropdown-list'
                id='card-type'
                onChange={handleCardTypeChange}
                value={cardType}
              >
                <option value='All types'>All types</option>
                <option value='Visa'>Visa</option>
                <option value='Mastercard'>Mastercard</option>
                <option value='American Express'>American Express</option>
                <option value='JCB'>JCB</option>
                <option value="Diner's Club">Diner's Club</option>
                <option value='Discover'>Discover</option>
                <option value='Union Pay'>Union Pay</option>
              </select>
            </div>
          </div>
        </div>
        <div className='column-three-quarters filter-fields'>
          <div className='form-group'>
            <legend className='form-label-bold date-label'>Date range</legend>
            <div className='form-date'>
              <div className='form-group'>
                <p className='form-hint'>Date</p>
                <input className='form-control' id='full-name' name='full-name' type='text' />
                <p className='form-hint-small'>eg 25/11/2015</p>
              </div>
              <div className='form-group'>
                <p className='form-hint'>Time</p>
                <input className='form-control' id='full-name' name='full-name' type='text' />
                <p className='form-hint-small'>eg 9:30:00</p>
              </div>
              <div className='datetime-seperator'>
                <p>to</p>
              </div>
              <div className='form-group'>
                <p className='form-hint'>Date</p>
                <input className='form-control' id='full-name' name='full-name' type='text' />
                <p className='form-hint-small'>eg 27/11/2015</p>
              </div>
              <div className='form-group'>
                <p className='form-hint'>Time</p>
                <input className='form-control' id='full-name' name='full-name' type='text' />
                <p className='form-hint-small'>eg 15:00:00</p>
              </div>
            </div>
          </div>
        </div>
        <div className='column-quarter filter-fields'>
          <div className='form-group filter-button'>
            <button
              className='button filter-button'
              onClick={handleFilterButtonClick}
            >
              Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  }
}
