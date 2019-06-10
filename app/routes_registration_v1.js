const express = require('express')
const router = express.Router()

var folder = "/registration-v1/"

router.use(function (req, res, next) {
  // set a folder and store in locals
  // this can then be used in pages as {{folder}}
  res.locals.folder=folder
  next()
});

// Start new, re-reg or change first page
router.post('/start-check', function (req, res) {
  let registerChoice = req.session.data['registerChoice']

  if (registerChoice === 'startNew') {
    res.redirect(folder + 'country')
  } else if (registerChoice === 'reRegister') {
    res.redirect(folder + '/country')
  } else if (registerChoice === 'change') {
    res.redirect(folder + '/contact-ea')
  } else {
    res.redirect(folder + '/start')
  }
})

// Country check
router.post('/country-check', function (req, res) {
  let countryChoice = req.session.data['countryChoice']

  if (countryChoice === 'England') {
    res.redirect(folder + 'app-contact-name')
  } else {
    res.redirect(folder + 'country-not-england')
  }
})

// Operator type check
router.post('/operator-type-check', function (req, res) {
  let operatorType = req.session.data['operatorType']

  if (operatorType === 'Limited company') {
    res.redirect(folder + 'op-limited-company-reg-number')
  } else {
    res.redirect(folder + 'op-type-not-covered')
  }
})


// Sample data: company
const companySampleData = {
  registerChoice:'startNew',
  regNumber:'WEX339257',
  countryChoice:'England',
  appFirstName:'Rachel',
  appLastName:'Conway',
  appTelephoneNumber:'0117 978 1234',
  appEmail:'mike@ap-email.com',
  appEmailConfirm:'mike@ap-email.com',
  operatorType:'Limited company',
  opLtdCompanyRegNumber:'AB123456',
  opLtdCompanyName:'Farm Techniques Ltd',
  opLtdCompanyPostcode:'BS4 5FT',
  opLtdCompanyAddress:'9a, GRANGE ROAD, BRISTOL',
  opFirstName:'Bruce',
  opLastName:'Patel',
  opContactPosition:'Site manager',
  opContactTelephone:'07806 123 456',
  opContactEmail:'darici@mailinator.net',
  opContactEmailConfirm:'darici@mailinator.net',
  opContactPostcode:'BS34 9GH',
  opContactAddress:'13, GRANGE ROAD, BRISTOL',
  isFarm:'yes',
  isFarmer:'yes',
  siteGridRef:'ST 58132 72695',
  siteDescription:'Lower field, Oak Tree Farm. Parcel ED/1234',
  siteAddressNumber: 'Oak Farm',
  siteAddress1: 'Windmill Lane',
  siteAddress2: 'Rosehurst',
  siteTown: 'Cullingford',
  Exemptions: [
    'U1',
    'U8',
    'T1',
    'D7',
    'S2',
    'S3'
  ]
}

// Load sample data
router.get('/sample', function (req, res) {
    req.session.data = companySampleData
    res.redirect(folder + 'check-answers')
})



module.exports = router
