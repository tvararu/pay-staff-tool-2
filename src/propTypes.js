import {PropTypes} from 'react'

PropTypes.transaction = PropTypes.shape({
  reference: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  subStatus: PropTypes.string.isRequired,
  card: PropTypes.string.isRequired,
  provider: PropTypes.string.isRequired,
  gatewayId: PropTypes.string.isRequired,
  payId: PropTypes.string.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  startEnter: PropTypes.instanceOf(Date).isRequired,
  authSubmit: PropTypes.instanceOf(Date).isRequired,
  authSucceed: PropTypes.instanceOf(Date).isRequired,
  paySubmit: PropTypes.instanceOf(Date).isRequired,
  paySucceed: PropTypes.instanceOf(Date).isRequired,
  failed: PropTypes.instanceOf(Date).isRequired
})

export default PropTypes
