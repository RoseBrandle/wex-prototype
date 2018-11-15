const express = require('express')
const router = express.Router()

// Branching
router.post('/renewals-check', function (req, res) {
  let renewalsChoice = req.session.data['wasteExemptionOptions']

  if (renewalsChoice === 'start') {
    res.redirect('/start')
  } else if (renewalsChoice === 'renew') {
    res.redirect('/renew')
  } else if (renewalsChoice === 'change') {
    res.redirect('/change')
  } else {
    res.redirect('/renewals-error')
  }
})

router.post('/renew-check', function (req, res) {
  let regNumber = req.session.data['registrationNumber']

  if (regNumber === '') {
    res.redirect('/renew-no-number')
  } else if (regNumber === 'WEX123456') {
    res.redirect('/check-email')
  } else if (regNumber === 'WEX123457') {
    res.redirect('/renew-need-new')
  } else {
    res.redirect('/renew-wrong-number')
  }
})

router.post('/send-email-check', function (req, res) {
  let emailAddress = req.session.data['emailCorrect']

  if (emailAddress === 'yes') {
    res.redirect('/send-email')
  } else if (emailAddress === 'no') {
    res.redirect('/change')
  } else {
    res.redirect('/check-email-error')
  }
})

router.post('/check-details-check', function (req, res) {
  let confirmDetails = req.session.data['currentDetails']

  if (confirmDetails === 'yes') {
    res.redirect('/declaration')
  } else if (confirmDetails === 'no') {
    res.redirect('/details-need-new')
  } else {
    res.redirect('/check-details-error')
  }
})

router.post('/declaration-check', function (req, res) {
  let declarationCheck = req.session.data['declarationConfirm']
  if (declarationCheck === 'yes') {
    res.redirect('/confirmation')
  }  else {
    res.redirect('/confirmation')
  }
})

module.exports = router
