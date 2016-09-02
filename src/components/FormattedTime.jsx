import React, { Component } from 'react'
import PropTypes from '../propTypes'

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

export default class FormattedTime extends Component {
  static propTypes = {
    time: PropTypes.instanceOf(Date).isRequired
  }

  render () {
    const dateAt = this.props.time
    const timeAt = formatDate(dateAt)
    const dateTime = dateAt.toISOString()
    return <time dateTime={dateTime}>{timeAt}</time>
  }
}
