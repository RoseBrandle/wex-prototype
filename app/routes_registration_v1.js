const express = require('express')
const router = express.Router()

var folder = "registration-v1"

router.use(function (req, res, next) {
  // set a folder and store in locals
  // this can then be used in pages as {{folder}}
  res.locals.folder=folder
  next()
});

// /start POST action is hard coded to /start-check

// Start new, re-reg or change first page
router.post('/start-check', function (req, res) {
  let registerChoice = req.session.data['registerChoice']

  if (registerChoice === 'startNew') {
    res.redirect('/' + folder + '/country')
  } else if (registerChoice === 'reRegister') {
    res.redirect('/' + folder + '/country')
  } else if (registerChoice === 'change') {
    res.redirect('/' + folder + '/contact-ea')
  } else {
    res.redirect('/' + folder + '/start')
  }
})

// /country POST action hardcoded to /country-check

// Country check
router.post('/country-check', function (req, res) {
  let countryChoice = req.session.data['countryChoice']

  if (countryChoice === 'England') {
    res.redirect('/' + folder + '/app-contact-name?formAction=app-telephone-number')
  } else {
    res.redirect('/' + folder + '/country-not-england')
  }
})

// /app-telephone-number
router.post('/app-telephone-number', function (req, res) {
  res.render(folder + '/app-telephone-number',{
    "formAction":"app-email"
  })
})

// /app-email
router.post('/app-email', function (req, res) {
  res.render(folder + '/app-email',{
    "formAction":"operator-type"
  })
})

// Operator type is hard-coded to /operator-type-check
// which fredirects gto /op-limited-company-reg-number
router.post('/operator-type-check', function (req, res) {
  let operatorType = req.session.data['operatorType']

  if (operatorType === 'Limited company') {
    res.redirect('/' + folder + '/op-limited-company-reg-number?formAction=op-limited-company-name')
  } else if (operatorType === 'Individual or sole trader') {
    res.redirect('/' + folder + '/op-individual-name?formAction=op-individual-postcode')
  } else {
    res.redirect('/' + folder + '/op-type-not-covered')
  }
})

// INDIVIDUAL ================================================

router.post('/op-individual-postcode', function (req, res) {
  res.render(folder + '/op-individual-postcode',{
    "formAction":"op-individual-address"
  })
})

router.post('/op-individual-address', function (req, res) {
  res.render(folder + '/op-individual-address',{
    "formAction":"op-contact-name"
  })
})


// COMPANY ================================================
router.post('/op-limited-company-name', function (req, res) {
  res.render(folder + '/op-limited-company-name',{
    "formAction":"op-limited-company-postcode"
  })
})

router.post('/op-limited-company-postcode', function (req, res) {
  res.render(folder + '/op-limited-company-postcode',{
    "formAction":"op-limited-company-address"
  })
})

router.post('/op-limited-company-address', function (req, res) {
  res.render(folder + '/op-limited-company-address',{
    "formAction":"op-contact-name"
  })
})

router.post('/op-contact-name', function (req, res) {
  res.render(folder + '/op-contact-name',{
    "formAction":"op-contact-position"
  })
})

router.post('/op-contact-position', function (req, res) {
  res.render(folder + '/op-contact-position',{
    "formAction":"op-contact-telephone"
  })
})

router.post('/op-contact-telephone', function (req, res) {
  res.render(folder + '/op-contact-telephone',{
    "formAction":"op-contact-email"
  })
})

router.post('/op-contact-email', function (req, res) {
  res.render(folder + '/op-contact-email',{
    "formAction":"op-contact-postcode"
  })
})

router.post('/op-contact-postcode', function (req, res) {
  res.render(folder + '/op-contact-postcode',{
    "formAction":"op-contact-address"
  })
})

router.post('/op-contact-address', function (req, res) {
  res.render(folder + '/op-contact-address',{
    "formAction":"farm"
  })
})

router.post('/farm', function (req, res) {
  res.render(folder + '/farm',{
    "formAction":"farmer"
  })
})

router.post('/farmer', function (req, res) {
  res.render(folder + '/farmer',{
    "formAction":"site-grid-reference"
  })
})

router.post('/site-grid-reference', function (req, res) {
  res.render(folder + '/site-grid-reference',{
    "formAction":"exemptions"
  })
})

// ####### GET for address alternative
router.get('/site-postcode', function (req, res) {
  res.render(folder + '/site-postcode',{
    "formAction":"site-address"
  })
})

router.post('/site-address', function (req, res) {
  res.render(folder + '/site-address',{
    "formAction":"exemptions"
  })
})

router.post('/exemptions', function (req, res) {
  res.render(folder + '/exemptions',{
    "formAction":"check-answers"
  })
})

router.post('/check-answers', function (req, res) {
  res.render(folder + '/check-answers',{
    "formAction":"declaration"
  })
})

router.post('/declaration', function (req, res) {
  res.render(folder + '/declaration',{
    "formAction":"registration-complete"
  })
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
  individualName:'Sarah Individual',
  individualPostcode:'BS34 9GH',
  individualAddress:'9a, GRANGE ROAD, BRISTOL',
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
    res.redirect('/' + folder + '/check-answers')
})



module.exports = router
