const express = require('express')
const router = express.Router()

// all routes for registration v1
router.use('/registration-v1', require('./routes_registration_v1'))
router.use('/registration-v2', require('./routes_registration_v2'))
router.use('/registration-v2-1', require('./routes_registration_v2-1'))
router.use('/registration-v2-2', require('./routes_registration_v2-2'))
router.use('/registration-v2-3', require('./routes_registration_v2-3'))
router.use('/registration-rc', require('./routes_registration_rc'))
router.use('/renew-web-1', require('./routes_renew_web_1'))
router.use('/renew-web-2', require('./routes_renew_web_2'))

// start page URL to match GOV short link



router.get('/renew-waste-exemption', function (req, res) {
    res.redirect('/startpage/startbutton-v2')
})

// RENEWALS
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
    res.redirect('/renewals/change')
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

router.post('/check-details-check-v2', function (req, res) {
  let confirmDetails = req.session.data['currentDetails']

  if (confirmDetails === 'yes') {
    res.redirect('renewal-email-v2/declaration')
  } else if (confirmDetails === 'no') {
    res.redirect('/renewal-email-v2/details-need-new')
  } else {
    res.redirect('/renewals/check-details-error')
  }
})

router.post('/check-details-check-v3', function (req, res) {
  let confirmDetails = req.session.data['currentDetails']

  if (confirmDetails === 'yes') {
    res.redirect('renewal-email-v3/check-details-3')
  } else if (confirmDetails === 'no') {
    res.redirect('/renewal-email-v3/details-need-new')
  } else {
    res.redirect('/renewals/check-details-error')
  }
})

router.post('/check-details-check-v4', function (req, res) {
  let confirmDetails = req.session.data['currentDetails']

  if (confirmDetails === 'yes') {
    res.redirect('renewal-email-v3/declaration')
  } else if (confirmDetails === 'no') {
    res.redirect('/renewal-email-v3/details-need-new')
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

router.post('/declaration-check-v2', function (req, res) {
  const isConfirmed = 'declarationConfirm' in req.body;
  if (isConfirmed) {
    res.redirect('/renewal-email-v2/confirmation')
  }  else {
    res.redirect('/renewal-email-v2/declaration-error')
  }
})

//ADDRESS-REUSE
router.post('/address-reuse-check', function (req, res) {
  let registrationChoice = req.session.data['branching']

  if (registrationChoice === 'start') {
    res.redirect('/address-reuse/applicant-details')
  } else if (registrationChoice === 'reregister') {
    res.redirect('/renewals/renew')
  } else if (registrationChoice === 'change') {
    res.redirect('/contact-ea')
  } else {
    res.redirect('/address-reuse/start-error')
  }
})

router.post('/aware-of-pp', function (req, res) {
  let awareOfPrivacyPolicy = req.session.data['pp-aware']

  if (awareOfPrivacyPolicy === 'yes') {
    res.redirect('/address-reuse/start')
  } else if (awareOfPrivacyPolicy === 'no') {
    res.redirect('/registration/ad-privacy-policy-text')
  }
})

module.exports = router
