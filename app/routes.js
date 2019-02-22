const express = require('express')
const router = express.Router()

// Branching
router.post('/renewals-check', function (req, res) {
  let renewalsChoice = req.session.data['wasteExemptionOptions']

  if (renewalsChoice === 'start') {
    res.redirect('/registration/start')
  } else if (renewalsChoice === 'renew') {
    res.redirect('renewals/renew')
  } else {
    res.redirect('/renewals/start-error')
  }
})

// Branching all renewal scenarios based on specified number
router.post('/renew-check', function (req, res) {
  let regNum = req.session.data['registrationNumber']
  var regNumber = (regNum.toUpperCase());

  if (regNumber === '') {
    res.redirect('/renewals/renew-no-number')
  } else if (regNumber === 'WEX123452') {
    res.redirect('/renewals/renew-not-ready-error')
  } else if (regNumber === 'WEX123454') {
    res.redirect('/renewals/renew-not-recognised')
  } else if (regNumber === 'WEX123456') {
    res.redirect('/renewals/check-email')
  } else if (regNumber === 'WEX123457') {
    res.redirect('/renewals/renew-need-new-error')
  } else if (regNumber === 'WEX123458') {
    res.redirect('/renewals/renew-need-new')
  } else {
    res.redirect('/renewals/renew-wrong-number')
  }
})

router.post('/send-email-check', function (req, res) {
  let emailAddress = req.session.data['emailCorrect']

  if (emailAddress === 'yes') {
    res.redirect('/renewals/send-email')
  } else if (emailAddress === 'no') {
    res.redirect('/change')
  } else {
    res.redirect('/renewals/check-email-error')
  }
})

router.post('/check-details-check', function (req, res) {
  let confirmDetails = req.session.data['currentDetails']

  if (confirmDetails === 'yes') {
    res.redirect('renewals/declaration')
  } else if (confirmDetails === 'no') {
    res.redirect('/renewals/details-need-new')
  } else {
    res.redirect('/renewals/check-details-error')
  }
})

router.post('/declaration-check', function (req, res) {
  const isConfirmed = 'declarationConfirm' in req.body;
  if (isConfirmed) {
    res.redirect('/renewals/confirmation')
  }  else {
    res.redirect('/renewals/declaration-error')
  }
})

module.exports = router
