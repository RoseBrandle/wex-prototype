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

const WEX026225Data = {
  registerChoice:'startNew',
  regNumber:'WEX026225',
  expiryDate:'5 August 2019',
  countryChoice:'England',
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
  expiryDate:'5 August 2019',
  countryChoice:'England',
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
  expiryDate:'5 August 2019',
  countryChoice:'England',
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
  expiryDate:'5 August 2019',
  countryChoice:'England',
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
  expiryDate:'5 August 2019',
  countryChoice:'England',
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
  expiryDate:'5 August 2019',
  countryChoice:'England',
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
  expiryDate:'5 August 2019',
  countryChoice:'England',
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


const WEX155754Data = {
  registerChoice:'startNew',
  regNumber:'WEX155754',
  expiryDate:'5 August 2019',
  countryChoice:'England',
  appFirstName:'Kitty',
  appLastName:'Campbell',
  appTelephoneNumber:'01935123456',
  appEmail:'kitty@email.com',
  appEmailConfirm:'kitty@email.com',
  operatorType:'Limited company',
  opLtdCompanyRegNumber:'09558423',
  opLtdCompanyName:'OLD MILL JACKSON LTD',
  opLtdCompanyPostcode:'EX1 3LJ',
  opLtdCompanyAddress:'OLD MILL JACKSON LTD, LEEWARD HOUSE, FITZROY ROAD, EXETER',
  opFirstName:'Shaun',
  opLastName:'Moulton',
  opContactPosition:'Director',
  opContactTelephone:'07806 123 456',
  opContactEmail:'shaun@email.com',
  opContactEmailConfirm:'shaun@email.com',
  opContactPostcode:'EX1 3LJ',
  opContactAddress:'OLD MILL JACKSON LTD, LEEWARD HOUSE, FITZROY ROAD, EXETER',
  isFarm:'yes',
  isFarmer:'yes',
  siteGridRef:'',
  siteAddress:'TREGADGWITH, VELANSAGA BARTON FARM, ST. BURYAN, PENZANCE',
  siteDescription:'',
  siteAddressNumber: 'TREGADGWITH',
  siteAddress1: 'VELANSAGA BARTON FARM',
  siteAddress2: 'ST. BURYAN',
  siteTown: 'PENZANCE',
  sitePostcode: 'TR19 6BS',
  Exemptions: [
    'U1'
  ]
}


const WEX155967Data = {
  registerChoice:'startNew',
  regNumber:'WEX155967',
  expiryDate:'5 August 2019',
  countryChoice:'England',
  appFirstName:'Martin',
  appLastName:'Caunce',
  appTelephoneNumber:'07976123456',
  appEmail:'martin@email.com',
  appEmailConfirm:'martin@email.com',
  operatorType:'Limited company',
  opLtdCompanyRegNumber:'05381657',
  opLtdCompanyName:'Brow Farm Ltd',
  opLtdCompanyPostcode:'L40 1UH',
  opLtdCompanyAddress:'BROW FARM, SMITHY LANE, HOLMESWOOD, ORMSKIRK',
  opFirstName:'Martin',
  opLastName:'Caunce',
  opContactPosition:'Director',
  opContactTelephone:'07976123456',
  opContactEmail:'martin@email.com',
  opContactEmailConfirm:'martin@email.com',
  opContactPostcode:'L40 1UH',
  opContactAddress:'BROW FARM, SMITHY LANE, HOLMESWOOD, ORMSKIRK',
  isFarm:'yes',
  isFarmer:'yes',
  siteGridRef:'',
  siteAddress:'BROW FARM, SMITHY LANE, HOLMESWOOD, ORMSKIRK',
  siteDescription:'',
  siteAddressNumber: 'BROW FARM',
  siteAddress1: 'SMITHY LANE',
  siteAddress2: 'HOLMESWOOD',
  siteTown: 'ORMSKIRK',
  sitePostcode: 'L40 1UH',
  Exemptions: [
    'U4',
    'U10',
    'U12',
    'T4',
    'T6',
    'T9',
    'S2'
  ]
}


const WEX155905Data = {
  registerChoice:'startNew',
  regNumber:'WEX155905',
  expiryDate:'5 August 2019',
  countryChoice:'England',
  appFirstName:'Iain',
  appLastName:'Mortimer',
  appTelephoneNumber:'07966 123456',
  appEmail:'iain@email.com',
  appEmailConfirm:'iain@email.com',
  operatorType:'Partnership',
  opPartnershipName: 'Iain Mortimer',
  opPartner1FirstName:'Iain',
  opPartner1LastName:'Mortimer',
  opPartner2FirstName:'Jenny',
  opPartner2LastName:'Mortimer',
  opPartnershipPostcode:'EX17 3QB',
  opPartnershipAddress:'COURT BARTON, VENNY TEDBURN, CREDITON',
  opFirstName:'Iain',
  opLastName:'Mortimer',
  opContactPosition:'',
  opContactTelephone:'07966 123456',
  opContactEmail:'iain@email.com',
  opContactEmailConfirm:'iain@email.com',
  opContactPostcode:'EX17 3QB',
  opContactAddress:'COURT BARTON, VENNY TEDBURN, CREDITON',
  isFarm:'yes',
  isFarmer:'yes',
  siteGridRef:'',
  siteDescription:'',
  siteAddress:'CIDERCOURT, VENNY TEDBURN, CREDITON',
  siteAddressNumber: 'CIDERCOURT',
  siteAddress1: 'VENNY TEDBURN',
  siteAddress2: '',
  siteTown: 'CREDITON',
  sitePostcode: 'EX17 3QB',
  Exemptions: [
    'U1',
    'S2'
  ]
}


const WEX155897Data = {
  registerChoice:'startNew',
  regNumber:'WEX155897',
  expiryDate:'5 August 2019',
  countryChoice:'England',
  appFirstName:'Thomas',
  appLastName:'Heritage',
  appTelephoneNumber:'01295123456',
  appEmail:'thomas@email.com',
  appEmailConfirm:'thomas@email.com',
  operatorType:'Partnership',
  opPartnershipName: 'Thomas Heritage',
  opPartner1FirstName:'Thomas',
  opPartner1LastName:'Heritage',
  opPartner2FirstName:'Paul',
  opPartner2LastName:'Heritage',
  opPartnershipPostcode:'CV35 0RA',
  opPartnershipAddress:'HERITAGE FARMS, CHURCH FARM, WHATCOTE ROAD, OXHILL, WARWICK',
  opFirstName:'Thomas',
  opLastName:'Mortimer',
  opContactPosition:'Partner',
  opContactTelephone:'07966 123456',
  opContactEmail:'iain@email.com',
  opContactEmailConfirm:'iain@email.com',
  opContactPostcode:'CV35 0RA',
  opContactAddress:'HERITAGE FARMS, CHURCH FARM, WHATCOTE ROAD, OXHILL, WARWICK',
  isFarm:'yes',
  isFarmer:'yes',
  siteGridRef:'',
  siteDescription:'',
  siteAddress:'HERITAGE FARMS, CHURCH FARM, WHATCOTE ROAD, OXHILL, WARWICK',
  siteAddressNumber: 'HERITAGE FARMS',
  siteAddress1: 'CHURCH FARM',
  siteAddress2: 'WHATCOTE ROAD, OXHILL',
  siteTown: 'WARWICK',
  sitePostcode: 'CV35 0RA',
  Exemptions: [
    'U1',
    'U8',
    'U10',
    'U12',
    'U13',
    'U16',
    'T5',
    'T9',
    'D1',
    'D7',
    'S1',
    'S2',
    'S3'
  ]
}

const WEX155625Data = {
  registerChoice:'startNew',
  regNumber:'WEX155625',
  expiryDate:'5 August 2019',
  countryChoice:'England',
  appFirstName:'Turney',
  appLastName:'Partners',
  appTelephoneNumber:'01604 123456',
  appEmail:'luke@email.com',
  appEmailConfirm:'luke@email.com',
  operatorType:'Partnership',
  opPartnershipName: 'Turney Partners',
  opPartner1FirstName:'Luke',
  opPartner1LastName:'Turney',
  opPartner2FirstName:'Paul',
  opPartner2LastName:'Turney',
  opPartnershipPostcode:'NN7 2EF',
  opPartnershipAddress:'WEST HALL FARM, QUINTON, NORTHAMPTON',
  opFirstName:'Luke',
  opLastName:'Turney',
  opContactPosition:'Partner',
  opContactTelephone:'01604 123456',
  opContactEmail:'luke@email.com',
  opContactEmailConfirm:'luke@email.com',
  opContactPostcode:'NN7 2EF',
  opContactAddress:'WEST HALL FARM, QUINTON, NORTHAMPTON',
  isFarm:'yes',
  isFarmer:'yes',
  siteGridRef:'',
  siteDescription:'',
  siteAddress:'Quinton Green Farm, Quinton Green, Northampton',
  siteAddressNumber: 'Quinton Green Farm',
  siteAddress1: 'Quinton Green',
  siteAddress2: '',
  siteTown: 'Northampton',
  sitePostcode: 'NN7 2EG',
  Exemptions: [
    'U1',
    'U8',
    'U10',
    'U12',
    'U13',
    'U15',
    'D1',
    'D7',
    'S2',
    'S3'
  ]
}


const WEX155541Data = {
  registerChoice:'startNew',
  regNumber:'WEX155541',
  expiryDate:'5 August 2019',
  countryChoice:'England',
  appFirstName:'George N.F.',
  appLastName:'Browning',
  appTelephoneNumber:'01926123456',
  appEmail:'george@email.com',
  appEmailConfirm:'george@email.com',
  operatorType:'Partnership',
  opPartnershipName: 'George N.F. Browning',
  opPartner1FirstName:'George N.F.',
  opPartner1LastName:'Browning',
  opPartner2FirstName:'Gillian A.',
  opPartner2LastName:'Browning',
  opPartnershipPostcode:'CV23 9PD',
  opPartnershipAddress:'FELDON FOREST FARM, FISHPOOLS ROAD, FRANKTON, RUGBY',
  opFirstName:'George N.F.',
  opLastName:'Browning',
  opContactPosition:'Partner',
  opContactTelephone:'01926123456',
  opContactEmail:'george@email.com',
  opContactEmailConfirm:'george@email.com',
  opContactPostcode:'CV23 9PD',
  opContactAddress:'FELDON FOREST FARM, FISHPOOLS ROAD, FRANKTON, RUGBY',
  isFarm:'yes',
  isFarmer:'yes',
  siteGridRef:'',
  siteDescription:'',
  siteAddress:'FELDON FOREST FARM, FISHPOOLS ROAD, FRANKTON, RUGBY',
  siteAddressNumber: 'FELDON FOREST FARM',
  siteAddress1: 'FISHPOOLS ROAD',
  siteAddress2: 'FRANKTON',
  siteTown: 'RUGBY',
  sitePostcode: 'CV23 9PD',
  Exemptions: [
    'U1',
    'U4',
    'U8',
    'U10',
    'U12',
    'U13',
    'T23',
    'D1',
    'D3',
    'D7'
  ]
}

// Skanska
const WEX062219Data = {
  registerChoice:'startNew',
  regNumber:'WEX062219',
  expiryDate:'5 August 2019',
  countryChoice:'England',
  appFirstName:'Martin',
  appLastName:'Neeson',
  appTelephoneNumber:'01923 776 666',
  appEmail:'martin.neeson@skanska.co.uk',
  appEmailConfirm:'martin.neeson@skanska.co.uk',
  operatorType:'Limited company',
  opLtdCompanyRegNumber:'00191408',
  opLtdCompanyName:'SKANSKA CONSTRUCTION UK LIMITED',
  opLtdCompanyPostcode:'WD3 9SW',
  opLtdCompanyAddress:'Maple Cross House, Denham Way Maple Cross, Rickmansworth, Hertfordshire',
  opFirstName:'Roger',
  opLastName:'Wallace',
  opContactPosition:'Site manager',
  opContactTelephone:'01923 776 666',
  opContactEmail:'roger.wallace@skanska.co.uk',
  opContactEmailConfirm:'roger.wallace@skanska.co.uk',
  opContactPostcode:'WD3 9SW',
  opContactAddress:'Maple Cross House, Denham Way Maple Cross, Rickmansworth, Hertfordshire',
  isFarm:'no',
  isFarmer:'no',
  siteGridRef:'ST5260716754',
  siteAddress:'MEAD AVENUE, HOUNDSTONE BUSINESS PARK, YEOVIL',
  siteDescription:'',
  siteAddressNumber: 'MEAD AVENUE',
  siteAddress1: 'HOUNDSTONE BUSINESS PARK',
  siteAddress2: '',
  siteTown: 'YEOVIL',
  sitePostcode: 'BA22 8RT',
  Exemptions: [
    'S1',
    'S2',
    'T6'
  ]
}


// 08/07/2019 – WEX137539 – Euston Demolitions Skanska
const WEX137539Data = {
  registerChoice:'startNew',
  regNumber:'WEX137539',
  expiryDate:'5 August 2019',
  countryChoice:'England',
  appFirstName:'Anthony',
  appLastName:'Bickers',
  appTelephoneNumber:'01923 776 666',
  appEmail:'anthony.bickers@costain.co.uk',
  appEmailConfirm:'anthony.bickers@costain.co.uk',
  operatorType:'Limited company',
  opLtdCompanyRegNumber:'00610201',
  opLtdCompanyName:'Costain Limited',
  opLtdCompanyPostcode:'SL6 4UB',
  opLtdCompanyAddress:'COSTAIN HOUSE, VANWALL ROAD, MAIDENHEAD',
  opFirstName:'Anthony',
  opLastName:'Bickers',
  opContactPosition:'Site manager',
  opContactTelephone:'01923 776 666',
  opContactEmail:'anthony.bickers@costain.co.uk',
  opContactEmailConfirm:'anthony.bickers@costain.co.uk',
  opContactPostcode:'SL6 4UB',
  opContactAddress:'Costain House, Vanwall Business Park, Maidenhead, Berkshire',
  isFarm:'no',
  isFarmer:'no',
  siteGridRef:'TQ2946382563',
  siteAddress:'Cottage Hotel, 67-71, Euston Street, Holborn, Somers Town, London',
  siteDescription:'Cottage Hotel',
  siteAddressNumber: '67-71, Euston Street',
  siteAddress1: 'Euston Street, Holborn',
  siteAddress2: '',
  siteTown: 'London',
  sitePostcode: 'NW1 2ET',
  Exemptions: [
    'U1'
  ]
}

// 15/07/2019 – WEX146102 Willesden Euro Terminal Skanska
const WEX146102Data = {
  registerChoice:'startNew',
  regNumber:'WEX146102',
  expiryDate:'5 August 2019',
  countryChoice:'England',
  opFirstName:'Anthony',
  opLastName:'Bickers',
  appTelephoneNumber:'01923 776 666',
  appEmail:'anthony.bickers@costain.co.uk',
  appEmailConfirm:'anthony.bickers@costain.co.uk',
  operatorType:'Limited company',
  opLtdCompanyRegNumber:'00610201',
  opLtdCompanyName:'Costain Limited',
  opLtdCompanyPostcode:'SL6 4UB',
  opLtdCompanyAddress:'COSTAIN HOUSE, VANWALL ROAD, MAIDENHEAD',
  opFirstName:'Anthony',
  opLastName:'Bickers',
  opContactPosition:'Site manager',
  opContactTelephone:'01923 776 666',
  opContactEmail:'anthony.bickers@costain.co.uk',
  opContactEmailConfirm:'anthony.bickers@costain.co.uk',
  opContactPostcode:'SL6 4UB',
  opContactAddress:'Costain House, Vanwall Business Park, Maidenhead, Berkshire',
  isFarm:'no',
  isFarmer:'no',
  siteGridRef:'',
  siteAddress:'Costain Skanska JV, Willesden Euro Terminal, Channel Gate Road, London',
  siteDescription:'',
  siteAddressNumber: 'Willesden Euro Terminal',
  siteAddress1: 'Channel Gate Road',
  siteAddress2: '',
  siteTown: 'London',
  sitePostcode: 'NW10 6UQ',
  Exemptions: [
    'U1'
  ]
}

// 22/07/2019 – WEX152443 UCL Buildings Skanska
const WEX152443Data = {
  registerChoice:'startNew',
  regNumber:'WEX152443',
  expiryDate:'5 August 2019',
  countryChoice:'England',
  appFirstName:'Martin',
  appLastName:'Neeson',
  appTelephoneNumber:'01923 776 666',
  appEmail:'anthony.bickers@costain.co.uk',
  appEmailConfirm:'anthony.bickers@costain.co.uk',
  operatorType:'Limited company',
  opLtdCompanyRegNumber:'00610201',
  opLtdCompanyName:'Costain Limited',
  opLtdCompanyPostcode:'SL6 4UB',
  opLtdCompanyAddress:'COSTAIN HOUSE, VANWALL ROAD, MAIDENHEAD',
  opFirstName:'Anthony',
  opLastName:'Bickers',
  opContactPosition:'Site manager',
  opContactTelephone:'01923 776 666',
  opContactEmail:'anthony.bickers@costain.co.uk',
  opContactEmailConfirm:'anthony.bickers@costain.co.uk',
  opContactPostcode:'SL6 4UB',
  opContactAddress:'Costain House, Vanwall Business Park, Maidenhead, Berkshire',
  isFarm:'no',
  isFarmer:'no',
  siteGridRef:'',
  siteAddress:'UCL building, Hampstead Road, Euston',
  siteDescription:'',
  siteAddressNumber: 'UCL building',
  siteAddress1: 'Hampstead Road',
  siteAddress2: 'Euston',
  siteTown: 'London',
  sitePostcode: 'NW12BX',
  Exemptions: [
    'U1'
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

// Skanska sample #############################
router.get('/WEX062219', function (req, res) {
    req.session.data = WEX062219Data
    req.session.data.selectAddress = WEX062219Data.siteAddress
    res.redirect('/' + folder + '/email-renew')
})


// Load research participants #############################
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

router.get('/WEX155754', function (req, res) {
    req.session.data = WEX155754Data
    req.session.data.selectAddress = WEX155754Data.siteAddress
    res.redirect('/' + folder + '/email-renew')
})

router.get('/WEX155967', function (req, res) {
    req.session.data = WEX155967Data
    req.session.data.selectAddress = WEX155967Data.siteAddress
    res.redirect('/' + folder + '/email-renew')
})

router.get('/WEX155905', function (req, res) {
    req.session.data = WEX155905Data
    req.session.data.selectAddress = WEX155905Data.siteAddress
    res.redirect('/' + folder + '/email-renew')
})

router.get('/WEX155897', function (req, res) {
    req.session.data = WEX155897Data
    req.session.data.selectAddress = WEX155897Data.siteAddress
    res.redirect('/' + folder + '/email-renew')
})

router.get('/WEX155625', function (req, res) {
    req.session.data = WEX155625Data
    req.session.data.selectAddress = WEX155625Data.siteAddress
    res.redirect('/' + folder + '/email-renew')
})

router.get('/WEX155541', function (req, res) {
    req.session.data = WEX155541Data
    req.session.data.selectAddress = WEX155541Data.siteAddress
    res.redirect('/' + folder + '/email-renew')
})

// 3 skanska
router.get('/WEX137539', function (req, res) {
    req.session.data = WEX137539Data
    req.session.data.selectAddress = WEX137539Data.siteAddress
    res.redirect('/' + folder + '/email-renew')
})

router.get('/WEX146102', function (req, res) {
    req.session.data = WEX146102Data
    req.session.data.selectAddress = WEX146102Data.siteAddress
    res.redirect('/' + folder + '/email-renew')
})

router.get('/WEX152443', function (req, res) {
    req.session.data = WEX152443Data
    req.session.data.selectAddress = WEX152443Data.siteAddress
    res.redirect('/' + folder + '/email-renew')
})


module.exports = router
