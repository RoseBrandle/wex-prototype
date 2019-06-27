const express = require('express')
const router = express.Router()

var folder = "registration-v2"

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
  countryChoice:'',
  appFirstName:'Rachel',
  appLastName:'Conway',
  appTelephoneNumber:'0117 978 1234',
  appEmail:'mike@ap-email.com',
  appEmailConfirm:'mike@ap-email.com',
  operatorType:'Partnership',
  opLtdCompanyRegNumber:'AB123456',
  opLtdCompanyName:'Farm Techniques Ltd',
  opLtdCompanyPostcode:'BS4 5FT',
  opLtdCompanyAddress:'9a, GRANGE ROAD, BRISTOL',
  individualName:'Sarah Individual',
  individualPostcode:'BS34 9GH',
  individualAddress:'9a, GRANGE ROAD, BRISTOL',
  opPartner1FirstName:'Roger',
  opPartner1LastName:'Brown',
  opPartner2FirstName:'Jane',
  opPartner2LastName:'Brown',
  opPartnershipName:'Our Waste Partnership',
  opPartnershipPostcode:'BS34 9GH',
  opPartnershipAddress:'9a, GRANGE ROAD, BRISTOL',
  opFirstName:'Bruce',
  opLastName:'Patel',
  opContactPosition:'Site manager',
  opContactTelephone:'07806 123 456',
  opContactEmail:'darici@mailinator.net',
  opContactEmailConfirm:'darici@mailinator.net',
  opContactPostcode:'BS34 9GH',
  opContactAddress:'9a, GRANGE ROAD, BRISTOL',
  isFarm:'yes',
  isFarmer:'yes',
  siteGridRef:'ST 58132 72695',
  siteAddress:'9a, GRANGE ROAD, BRISTOL',
  siteDescription:'Lower field, Oak Tree Farm. Parcel ED/1234',
  siteAddressNumber: 'Oak Farm',
  siteAddress1: 'Windmill Lane',
  siteAddress2: 'Rosehurst',
  siteTown: 'Cullingford',
  sitePostcode: 'TA1 5RF',
  Exemptions: [
    'U1',
    'U8',
    'T1',
    'D7',
    'S2',
    'S3'
  ]
}

const WEX026225Data = {
  registerChoice:'startNew',
  regNumber:'WEX026225',
  expiryDate:'13 July 2019',
  countryChoice:'',
  appFirstName:'R',
  appLastName:'Withers',
  appTelephoneNumber:'01761 456123',
  appEmail:'rodney.way@email.co.uk',
  appEmailConfirm:'rodney.way@email.co.uk',
  operatorType:'Individual or sole trader',
  individualName:'R Withers',
  individualPostcode:'BS40 7UY',
  individualAddress:'HOWGROVE FARM, THE BATCH, BUTCOMBE, BRISTOL',
  opFirstName:'R',
  opLastName:'Withers',
  opContactPosition:'',
  opContactTelephone:'01761 456123',
  opContactEmail:'rodney.way@email.co.uk',
  opContactEmailConfirm:'rodney.way@email.co.uk',
  opContactPostcode:'BS40 7UY',
  opContactAddress:'HOWGROVE FARM, THE BATCH, BUTCOMBE, BRISTOL',
  isFarm:'yes',
  isFarmer:'yes',
  siteGridRef:'ST5220762142',
  siteDescription:'',
  siteAddress:'HOWGROVE FARM, THE BATCH, BUTCOMBE, BRISTOL',
  siteAddressNumber: 'HOWGROVE FARM',
  siteAddress1: 'THE BATCH',
  siteAddress2: 'BUTCOMBE',
  siteTown: 'BRISTOL',
  sitePostcode: 'BS40 7UY',
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

const WEX047274Data = {
  registerChoice:'startNew',
  regNumber:'WEX047274',
  expiryDate:'27 August 2019',
  countryChoice:'',
  appFirstName:'Richard',
  appLastName:'Dury',
  appTelephoneNumber:'07711456123',
  appEmail:'summerleafarm@email.com',
  appEmailConfirm:'summerleafarm@email.com',
  operatorType:'Partnership',
  opPartnershipName: 'Richard Dury',
  opPartner1FirstName:'Jonathan',
  opPartner1LastName:'Dury',
  opPartner2FirstName:'Richard',
  opPartner2LastName:'Dury',
  individualName:'Richard Dury',
  opPartnershipPostcode:'BS40 6NQ',
  opPartnershipAddress:'SUMMERLEA FARM, BRISTOL ROAD, COMPTON MARTIN, BRISTOL',
  opFirstName:'Jonathan',
  opLastName:'Dury',
  opContactPosition:'',
  opContactTelephone:'07711456123',
  opContactEmail:'summerleafarm@email.com',
  opContactEmailConfirm:'summerleafarm@email.com',
  opContactPostcode:'BS40 6NQ',
  opContactAddress:'SUMMERLEA FARM, BRISTOL ROAD, COMPTON MARTIN, BRISTOL',
  isFarm:'yes',
  isFarmer:'yes',
  siteGridRef:'ST5564758136',
  siteDescription:'',
  siteAddress:'SUMMERLEA FARM, BRISTOL ROAD, COMPTON MARTIN, BRISTOL',
  siteAddressNumber: 'SUMMERLEA FARM',
  siteAddress1: 'BRISTOL ROAD',
  siteAddress2: 'COMPTON MARTIN',
  siteTown: 'BRISTOL',
  sitePostcode: 'BS40 6NQ',
  Exemptions: [
    'U1',
    'U10',
    'D1',
    'D7'
  ]
}


const WEX024426Data = {
  registerChoice:'startNew',
  regNumber:'WEX024426',
  expiryDate:'9 July 2019',
  countryChoice:'',
  appFirstName:'Andrew',
  appLastName:'Tanner',
  appTelephoneNumber:'07711456123',
  appEmail:'andrew@email.com',
  appEmailConfirm:'andrew@email.com',
  operatorType:'Individual or sole trader',
  individualName:'Andrew Tanner',
  individualPostcode:'BS40 8DU',
  individualAddress:'GLENMORE HOUSE, OLD HILL, WINFORD, BRISTOL',
  opFirstName:'Andrew',
  opLastName:'Tanner',
  opContactPosition:'',
  opContactTelephone:'07711456123',
  opContactEmail:'andrew@email.com',
  opContactEmailConfirm:'andrew@email.com',
  opContactPostcode:'BS40 8DU',
  opContactAddress:'GLENMORE HOUSE, OLD HILL, WINFORD, BRISTOL',
  isFarm:'yes',
  isFarmer:'yes',
  siteGridRef:'ST5269564728',
  siteDescription:'',
  siteAddress:'GLENMORE HOUSE, OLD HILL, WINFORD, BRISTOL',
  siteAddressNumber: 'GLENMORE HOUSE',
  siteAddress1: 'OLD HILL',
  siteAddress2: 'WINFORD',
  siteTown: 'BRISTOL',
  sitePostcode: 'BS40 8DU',
  Exemptions: [
    'U1',
    'U10',
    'U11',
    'D1',
    'D7'
  ]
}


const WEX055034Data = {
  registerChoice:'startNew',
  regNumber:'WEX055034',
  expiryDate:'10 September 2019',
  countryChoice:'',
  appFirstName:'Lesley',
  appLastName:'Bowes',
  appTelephoneNumber:'044117456123',
  appEmail:'lesley.bowes@email.com',
  appEmailConfirm:'lesley.bowes@email.com',
  operatorType:'Partnership',
  opPartnershipName: 'Lesley Bowes',
  opPartner1FirstName:'Lesley',
  opPartner1LastName:'Bowes',
  opPartner2FirstName:'Robert',
  opPartner2LastName:'Bowes',
  individualName:'Lesley Bowes',
  opPartnershipPostcode:'BS31 2ST',
  opPartnershipAddress:'CHEWTON FARM HOUSE, CHEWTON KEYNSHAM, KEYNSHAM, BRISTOL',
  opFirstName:'Lesley',
  opLastName:'Bowes',
  opContactPosition:'Partner',
  opContactTelephone:'044117456123',
  opContactEmail:'lesley.bowes@email.com',
  opContactEmailConfirm:'lesley.bowes@email.com',
  opContactPostcode:'BS31 2ST',
  opContactAddress:'CHEWTON FARM HOUSE, CHEWTON KEYNSHAM, KEYNSHAM, BRISTOL',
  isFarm:'yes',
  isFarmer:'yes',
  siteGridRef:'ST6525266503',
  siteDescription:'',
  siteAddress:'CHEWTON FARM HOUSE, CHEWTON KEYNSHAM, KEYNSHAM, BRISTOL',
  siteAddressNumber: 'CHEWTON FARM HOUSE',
  siteAddress1: 'CHEWTON KEYNSHAM',
  siteAddress2: 'KEYNSHAM',
  siteTown: 'BRISTOL',
  sitePostcode: 'BS31 2ST',
  Exemptions: [
    'U10',
    'T6',
    'D1',
    'D7'
  ]
}

const WEX064386Data = {
  registerChoice:'startNew',
  regNumber:'WEX064386',
  expiryDate:'27 September 2019',
  countryChoice:'',
  appFirstName:'James',
  appLastName:'Gibbs',
  appTelephoneNumber:'07966456123',
  appEmail:'westerleighhill@email.com',
  appEmailConfirm:'westerleighhill@email.com',
  operatorType:'Partnership',
  opPartnershipName: 'James Gibbs',
  opPartner1FirstName:'James',
  opPartner1LastName:'Gibbs',
  opPartner2FirstName:'Michael',
  opPartner2LastName:'Gibbs',
  individualName:'James Gibbs',
  opPartnershipPostcode:'BS37 8RB',
  opPartnershipAddress:'WESTERLEIGH HILL FARM, WESTERLEIGH HILL, WESTERLEIGH, BRISTOL',
  opFirstName:'James',
  opLastName:'Gibbs',
  opContactPosition:'',
  opContactTelephone:'07966456123',
  opContactEmail:'westerleighhill@email.com',
  opContactEmailConfirm:'westerleighhill@email.com',
  opContactPostcode:'BS37 8RB',
  opContactAddress:'WESTERLEIGH HILL FARM, WESTERLEIGH HILL, WESTERLEIGH, BRISTOL',
  isFarm:'yes',
  isFarmer:'yes',
  siteGridRef:'ST7017379136',
  siteDescription:'',
  siteAddress:'WESTERLEIGH HILL FARM, WESTERLEIGH HILL, WESTERLEIGH, BRISTOL',
  siteAddressNumber: 'WESTERLEIGH HILL FARM',
  siteAddress1: 'WESTERLEIGH HILL',
  siteAddress2: 'WESTERLEIGH',
  siteTown: 'BRISTOL',
  sitePostcode: 'BS37 8RB',
  Exemptions: [
    'D4',
    'D7'
  ]
}


const WEX024900Data = {
  registerChoice:'startNew',
  regNumber:'WEX024900',
  expiryDate:'10 July 2019',
  countryChoice:'',
  appFirstName:'Stuart',
  appLastName:'Tibbs',
  appTelephoneNumber:'07702456123',
  appEmail:'stuart@email.com',
  appEmailConfirm:'stuart@email.com',
  operatorType:'Individual or sole trader',
  individualName:'Stuart Tibbs',
  individualPostcode:'BS39 7SH',
  individualAddress:'SPRINGFIELD FARM, CLANDOWN ROAD, PAULTON, BRISTOL',
  opFirstName:'Stuart',
  opLastName:'Tibbs',
  opContactPosition:'',
  opContactTelephone:'07702456123',
  opContactEmail:'stuart@email.com',
  opContactEmailConfirm:'stuart@email.com',
  opContactPostcode:'BS39 7SH',
  opContactAddress:'SPRINGFIELD FARM, CLANDOWN ROAD, PAULTON, BRISTOL',
  isFarm:'yes',
  isFarmer:'yes',
  siteGridRef:'ST6600655911',
  siteDescription:'',
  siteAddress:'SPRINGFIELD FARM, CLANDOWN ROAD, PAULTON, BRISTOL',
  siteAddressNumber: 'SPRINGFIELD FARM',
  siteAddress1: 'CLANDOWN ROAD',
  siteAddress2: 'PAULTON',
  siteTown: 'BRISTOL',
  sitePostcode: 'BS39 7SH',
  Exemptions: [
    'D7'
  ]
}


const WEX033970Data = {
  registerChoice:'startNew',
  regNumber:'WEX033970',
  expiryDate:'1 August 2019',
  countryChoice:'',
  appFirstName:'Christine',
  appLastName:'Hayes',
  appTelephoneNumber:'07890 456123',
  appEmail:'christine.hayes@email.co.uk',
  appEmailConfirm:'christine.hayes@email.co.uk',
  operatorType:'Individual or sole trader',
  individualName:'Christine Hayes',
  individualPostcode:'BS40 7AX',
  individualAddress:'HILL FARM, BURRINGTON, BRISTOL',
  opFirstName:'Christine',
  opLastName:'Hayes',
  opContactPosition:'',
  opContactTelephone:'07890 456123',
  opContactEmail:'christine.hayes@email.co.uk',
  opContactEmailConfirm:'christine.hayes@email.co.uk',
  opContactPostcode:'BS40 7AX',
  opContactAddress:'HILL FARM, BURRINGTON, BRISTOL',
  isFarm:'yes',
  isFarmer:'yes',
  siteGridRef:'ST4690758633',
  siteDescription:'',
  siteAddress:'HILL FARM, BURRINGTON, BRISTOL',
  siteAddressNumber: 'HILL FARM',
  siteAddress1: 'BURRINGTON',
  siteAddress2: '',
  siteTown: 'BRISTOL',
  sitePostcode: 'BS40 7AX',
  Exemptions: [
    'U4',
    'U8',
    'T6',
    'T23',
    'D7'
  ]
}

// Participants ###############
// 10:00 am: WEX026225
// 11:00 am: WEX047274
// 12:00 am: WEX024426
// 13:00 pm: WEX055034
// 14:00 pm: WEX024900

// Backup 12:00: WEX033970

// July 2nd sessions: ###############
// WEX155754
// WEX155905
// WEX155967

// July 4th session: ###############
// WEX155897

// July 9th sessions: ###############
// WEX064386
// WEX155625

// July 11 session: ###############
// WEX155541


// Load sample data
router.get('/sample', function (req, res) {
    req.session.data = companySampleData
    res.redirect('/' + folder + '/email-renew')
})

router.get('/WEX026225', function (req, res) {
    req.session.data = WEX026225Data
    req.session.data.selectAddress = WEX026225Data.siteAddress
    res.redirect('/' + folder + '/email-renew')
})

router.get('/WEX047274', function (req, res) {
    req.session.data = WEX047274Data
    req.session.data.selectAddress = WEX047274Data.siteAddress
    res.redirect('/' + folder + '/email-renew')
})

router.get('/WEX024426', function (req, res) {
    req.session.data = WEX024426Data
    req.session.data.selectAddress = WEX024426Data.siteAddress
    res.redirect('/' + folder + '/email-renew')
})

router.get('/WEX055034', function (req, res) {
    req.session.data = WEX055034Data
    req.session.data.selectAddress = WEX055034Data.siteAddress
    res.redirect('/' + folder + '/email-renew')
})

router.get('/WEX064386', function (req, res) {
    req.session.data = WEX064386Data
    req.session.data.selectAddress = WEX064386Data.siteAddress
    res.redirect('/' + folder + '/email-renew')
})

router.get('/WEX024900', function (req, res) {
    req.session.data = WEX024900Data
    req.session.data.selectAddress = WEX024900Data.siteAddress
    res.redirect('/' + folder + '/email-renew')
})

router.get('/WEX033970', function (req, res) {
    req.session.data = WEX033970Data
    req.session.data.selectAddress = WEX033970Data.siteAddress
    res.redirect('/' + folder + '/email-renew')
})




module.exports = router
