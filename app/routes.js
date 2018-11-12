const express = require('express')
const router = express.Router()

// Branching
router.post('/renewals-answer', function (req, res) {
  let renewalsChoice = req.session.data['wasteExemptionOptions']

  if (renewalsChoice === 'start') {
    res.redirect('/start')
  } else if (renewalsChoice === 'change') {
    res.redirect('/change')
  } else {
    res.redirect('/renew')
  }
})

router.post('/renew-check', function (req, res) {
  let regNumber = req.session.data['registrationNumber']

  if (regNumber === '') {
    res.redirect('/renew-no-number')
  } else if (regNumber === 'WEX123456') {
    res.redirect('/send-email')
  } else {
    res.redirect('/renew-wrong-number')
  }
})

module.exports = router
