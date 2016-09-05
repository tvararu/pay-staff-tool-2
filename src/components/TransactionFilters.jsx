import React, { Component } from 'react'
import PropTypes from '../propTypes'
import InputText from './InputText'

export default class TransactionFilters extends Component {
  static propTypes = {
    applyFilter: PropTypes.bool.isRequired,
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
      'Failed'
    ]).isRequired,
    fromDate: PropTypes.string.isRequired,
    fromTime: PropTypes.string.isRequired,
    toDate: PropTypes.string.isRequired,
    toTime: PropTypes.string.isRequired,
    handleFromDateChange: PropTypes.func.isRequired,
    handleFromTimeChange: PropTypes.func.isRequired,
    handleToDateChange: PropTypes.func.isRequired,
    handleToTimeChange: PropTypes.func.isRequired,
    referenceNumberOrEmail: PropTypes.string.isRequired,
    handleResetFilters: PropTypes.func.isRequired
  }

  render () {
    const {
      referenceNumberOrEmail, handleReferenceNumberOrEmailChange, handleFilterButtonClick,
      handleCardTypeChange, handlePaymentStatusChange, cardType, paymentStatus,
      fromDate, fromTime, toDate, toTime,
      handleFromDateChange, handleFromTimeChange, handleToDateChange, handleToTimeChange,
      applyFilter, handleResetFilters
    } = this.props

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
            <InputText
              id='ref-or-email'
              onChange={handleReferenceNumberOrEmailChange}
              onSubmit={handleFilterButtonClick}
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
                <p className='form-hint'><label htmlFor='date-from-date'>Date</label></p>
                <InputText
                  id='date-from-date'
                  onChange={handleFromDateChange}
                  value={fromDate}
                  onSubmit={handleFilterButtonClick}
                />
                <p className='form-hint-small'>eg 25/11/2015</p>
              </div>
              <div className='form-group'>
                <p className='form-hint'><label htmlFor='date-from-time'>Time</label></p>
                <InputText
                  id='date-from-time'
                  onChange={handleFromTimeChange}
                  value={fromTime}
                  onSubmit={handleFilterButtonClick}
                />
                <p className='form-hint-small'>eg 9:30:00</p>
              </div>
              <div className='datetime-seperator'>
                <p>to</p>
              </div>
              <div className='form-group'>
                <p className='form-hint'><label htmlFor='date-to-date'>Date</label></p>
                <InputText
                  id='date-to-date'
                  onChange={handleToDateChange}
                  value={toDate}
                  onSubmit={handleFilterButtonClick}
                />
                <p className='form-hint-small'>eg 27/11/2015</p>
              </div>
              <div className='form-group'>
                <p className='form-hint'><label htmlFor='date-to-time'>Time</label></p>
                <InputText
                  id='date-to-time'
                  onChange={handleToTimeChange}
                  value={toTime}
                  onSubmit={handleFilterButtonClick}
                />
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
            {(applyFilter)
              ? <a href='#' onClick={handleResetFilters}>Reset all filters</a>
              : null
            }
          </div>
        </div>
      </div>
    </div>
  }
}
