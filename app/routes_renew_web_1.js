const express = require('express')
const router = express.Router()

var folder = "renew-web-1"

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
    res.redirect('/' + folder + '/registration-number')
  } else if (registerChoice === 'change') {
    res.redirect('/' + folder + '/contact-ea')
  } else {
    res.redirect('/' + folder + '/start')
  }
})

// Branching all renewal scenarios based on specified number
router.post('/renew-check', function (req, res) {
  let regNum = req.session.data['registrationNumber']
  var regNumber = regNum.toUpperCase()
  regNumber = regNumber.replace(/\s/g,'')

  var pattern = /^WEX[0-9]{6}$/

  if (regNumber === '') {
    res.redirect('/' + folder + '/registration-number?error=noNumber')

  } else if (regNumber === 'WEX223456') {
    res.redirect('/' + folder + '/registration-number?error=notDueYet')

  } else if (regNumber === 'WEX323456') {
    res.redirect('/' + folder + '/registration-number-not-recognised')

  } else if (regNumber === 'WEX423456') {
    res.redirect('/' + folder + '/registration-number-expired')

  } else if ( ! regNumber.match(pattern) ) {
    res.redirect('/' + folder + '/registration-number?error=wrongFormat')

  } else {
    res.redirect('/' + folder + '/renew-web-check-answers')
  }

})

// renew-info ================================================
router.post('/renew-info', function (req, res) {
  res.render(folder + '/renew-info',{
    "formAction":"country"
  })
})

// /country POST action hardcoded to /country-check

// Country check
router.post('/country-check', function (req, res) {
  let countryChoice = req.session.data['countryChoice']

  if (countryChoice === 'England') {
    res.redirect('/' + folder + '/exemptions?formAction=app-contact-name')
  } else {
    res.redirect('/' + folder + '/country-not-england')
  }
})

// Exemptions
router.post('/exemptions', function (req, res) {
  res.render(folder + '/exemptions',{
    "formAction":"app-contact-name"
  })
})

// /app-telephone-number
router.post('/app-contact-name', function (req, res) {
  res.render(folder + '/app-contact-name',{
    "formAction":"app-telephone-number"
  })
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
  } else if (operatorType === 'Partnership') {
    res.redirect('/' + folder + '/op-partner-name-1?formAction=op-partner-name-2')
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

// PARTNER ================================================

router.post('/op-partner-name-2', function (req, res) {
  res.render(folder + '/op-partner-name-2',{
    "formAction":"op-partnership-name"
  })
})

router.post('/op-partnership-name', function (req, res) {
  res.render(folder + '/op-partnership-name',{
    "formAction":"op-partnership-postcode"
  })
})

router.post('/op-partnership-postcode', function (req, res) {
  res.render(folder + '/op-partnership-postcode',{
    "formAction":"op-partnership-address"
  })
})

router.post('/op-partnership-address', function (req, res) {
  res.render(folder + '/op-partnership-address',{
    "formAction":"op-contact-name"
  })
})


// CONTACT ================================================

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
    "formAction":"site-address-check"
  })
})

router.post('/site-address-check', function (req, res) {
  let siteDescription = req.session.data['siteDescription']

  if (siteDescription === '') {
    res.redirect('/' + folder + '/site-postcode?formAction=site-address')
  } else {
    res.redirect('/' + folder + '/site-grid-reference?formAction=check-answers')
  }
})

router.post('/site-grid-reference', function (req, res) {
  res.render(folder + '/site-grid-reference',{
    "formAction":"check-answers"
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
    "formAction":"renewal-complete"
  })
})



// Sample data: company
const companySampleData = {
  registerChoice:'startNew',
  regNumber:'WEX339257',
  expiryDate:'31 July 2019',
  countryChoice:'England',
  appFirstName:'Rachel',
  appLastName:'Conway',
  appTelephoneNumber:'0117 978 1234',
  appEmail:'rachel@ap-email.com',
  appEmailConfirm:'rachel@ap-email.com',
  operatorType:'Limited company',
  opLtdCompanyRegNumber:'AB123456',
  opLtdCompanyName:'Farm Techniques Ltd',
  opLtdCompanyPostcode:'BS4 5FT',
  opLtdCompanyAddress:'WEEB WAY, COLLSTON, TREWBRIDGE',
  opFirstName:'Bruce',
  opLastName:'Wallace',
  opContactPosition:'Site manager',
  opContactTelephone:'07806 123 456',
  opContactEmail:'darici@mailinator.net',
  opContactEmailConfirm:'darici@mailinator.net',
  opContactPostcode:'BS34 9GH',
  opContactAddress:'WEEB WAY, COLLSTON, TREWBRIDGE',
  isFarm:'yes',
  isFarmer:'yes',
  siteGridRef:'ST 58132 72695',
  siteAddress:'WEEB WAY, COLLSTON, TREWBRIDGE',
  siteDescription:'Lower field, Oak Tree Farm. Parcel ED/1234',
  siteAddressNumber: 'WEEB WAY',
  siteAddress1: 'COLLSTON',
  siteAddress2: '',
  siteTown: 'TREWBRIDGE',
  sitePostcode: 'TA17 5RF',
  Exemptions: [
    'U1',
    'U8',
    'T1',
    'D7',
    'S2',
    'S3'
  ]
}

const individualSampleData = {
  registerChoice:'startNew',
  regNumber:'WEX354267',
  expiryDate:'14 July 2019',
  countryChoice:'England',
  appFirstName:'Sarah',
  appLastName:'Williams',
  appTelephoneNumber:'01342 456123',
  appEmail:'sarah.williams@email.co.uk',
  appEmailConfirm:'sarah.williams@email.co.uk',
  operatorType:'Individual or sole trader',
  individualName:'Sarah Williams',
  individualPostcode:'BD45 3UY',
  individualAddress:'THE OLD FARM, TRUSCOTT, BEDFORDSHIRE',
  opFirstName:'Sarah',
  opLastName:'Williams',
  opContactPosition:'',
  opContactTelephone:'01761 456123',
  opContactEmail:'sarah.williams@email.co.uk',
  opContactEmailConfirm:'sarah.williams@email.co.uk',
  opContactPostcode:'BD45 3UY',
  opContactAddress:'THE OLD FARM, TRUSCOTT, BEDFORDSHIRE',
  isFarm:'yes',
  isFarmer:'yes',
  siteGridRef:'ST5320762142',
  siteDescription:'',
  siteAddress:'THE OLD FARM, TRUSCOTT, BEDFORDSHIRE',
  siteAddressNumber: 'THE OLD FARM',
  siteAddress1: 'TRUSCOTT',
  siteAddress2: '',
  siteTown: 'BEDFORDSHIRE',
  sitePostcode: 'BD45 3UY',
  Exemptions: [
    'U1',
    'U2',
    'U4',
    'U8',
    'U10',
    'U13',
    'T1',
    'D1',
    'D7',
    'S2'
  ]
}


const partnershipSampleData = {
  registerChoice:'startNew',
  regNumber:'WEX432123',
  expiryDate:'7 August 2019',
  countryChoice:'England',
  appFirstName:'Brian',
  appLastName:'Purdy',
  appTelephoneNumber:'06611456123',
  appEmail:'b.purdy@email.com',
  appEmailConfirm:'b.purdy@email.com',
  operatorType:'Partnership',
  opPartnershipName: 'Brian Purdy',
  opPartner1FirstName:'Brian',
  opPartner1LastName:'Purdy',
  opPartner2FirstName:'Jane',
  opPartner2LastName:'Purdy',
  individualName:'Brian Purdy',
  opPartnershipPostcode:'TS23 6NQ',
  opPartnershipAddress:'SUMMER FARM, LONDON ROAD, COMPTON PUGWORTH, NEATON',
  opFirstName:'Brian',
  opLastName:'Purdy',
  opContactPosition:'Partner',
  opContactTelephone:'06611456123',
  opContactEmail:'b.purdy@email.com',
  opContactEmailConfirm:'b.purdy@email.com',
  opContactPostcode:'TS23 6NQ',
  opContactAddress:'SUMMER FARM, LONDON ROAD, COMPTON PUGWORTH, NEATON',
  isFarm:'yes',
  isFarmer:'no',
  siteGridRef:'ST5564758136',
  siteDescription:'',
  siteAddress:'SUMMER FARM, LONDON ROAD, COMPTON PUGWORTH, NEATON',
  siteAddressNumber: 'SUMMER FARM',
  siteAddress1: 'LONDON ROAD',
  siteAddress2: 'COMPTON PUGWORTH',
  siteTown: 'NEATON',
  sitePostcode: 'TS23 6NQ',
  Exemptions: [
    'U1',
    'U10',
    'D1',
    'D7'
  ]
}




// Load sample data #############################
router.get('/sample-company', function (req, res) {
    req.session.data = companySampleData
    req.session.data.selectAddress = companySampleData.siteAddress
    res.redirect('/' + folder + '/email-renew')
})

router.get('/sample-partnership', function (req, res) {
    req.session.data = partnershipSampleData
    req.session.data.selectAddress = partnershipSampleData.siteAddress
    res.redirect('/' + folder + '/email-renew')
})

router.get('/sample-individual', function (req, res) {
    req.session.data = individualSampleData
    req.session.data.selectAddress = individualSampleData.siteAddress
    res.redirect('/' + folder + '/email-renew')
})




module.exports = router
