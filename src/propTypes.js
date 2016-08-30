import {PropTypes} from 'react'

PropTypes.transaction = PropTypes.shape({
  reference: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  card: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  subStatus: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired
})

export default PropTypes
