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





module.exports = router
