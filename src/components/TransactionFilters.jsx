import React, { Component } from 'react'
import PropTypes from '../propTypes'

export default class TransactionFilters extends Component {
  render () {
    return <div>
      <div className='overview'>
        <h2 className='heading-medium staff-subheading'>Filter transactions list</h2>
      </div>
      <div className='filter-section'>
        <div className='column-third filter-fields'>
          <div className='form-group'>
            <label className='form-label-bold' htmlFor='full-name'>
              Reference number or email
              <span className='form-hint'>Enter full or partial details</span>
            </label>
            <input className='form-control' id='full-name' name='full-name' type='text' />
          </div>
        </div>
        <div className='column-third filter-fields'>
          <div className='form-group'>
            <label className='form-label-bold' htmlFor='full-name'>
              Payment status
              <span className='form-hint'>Select an option</span>
            </label>
            <div className='dropdown'>
              <select name='select' className='form-control dropdown-list' id='full-name' value='all-transactions'>
                <option value='all-transactions'>All transactions</option>
                <option value='in-progress'>In progress</option>
                <option value='successful'>Successful</option>
                <option value='failed'>Failed</option>
                <option value='refunds'>Refunds</option>
              </select>
            </div>
          </div>
        </div>
        <div className='column-third filter-fields'>
          <div className='form-group'>
            <label className='form-label-bold' htmlFor='full-name'>
              Card type
              <span className='form-hint'>Select an option</span>
            </label>
            <div className='dropdown'>
              <select name='select' className='form-control dropdown-list' id='full-name' value='all-types'>
                <option value='all-types'>All types</option>
                <option value='credit-card-only'>Credit card only</option>
                <option value='debit-card-only'>Debit card only</option>
                <option value='visa'>Visa</option>
                <option value='mastercard'>Mastercard</option>
                <option value='american-Express'>American Express</option>
                <option value='jcb'>JCB</option>
                <option value='diners-club'>Diner's Club</option>
                <option value='discover'>Discover</option>
                <option value='union-pay'>Union Pay</option>
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
            <a href='transaction-list'>
              <button className='button filter-button'>Filter</button>
            </a>
          </div>
        </div>
      </div>
      <div className='column-three-quarters filter-fields'>
        <h2 className='heading-small'>
          45,896 transactions
        </h2>
      </div>
    </div>
  }
}
