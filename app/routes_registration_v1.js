const express = require('express')
const router = express.Router()

var folder = "registration-v1"

// RENEWALS
router.post('/start-check', function (req, res) {
  let registerChoice = req.session.data['registerChoice']

  if (registerChoice === 'startNew') {
    res.redirect('xxxxxx')
  } else if (registerChoice === 'reRegister') {
    res.redirect('xxxxx')
  } else if (registerChoice === 'change') {
    res.redirect('xxxxx')
  } else {
    res.redirect('xxxxxx')
  }
})



module.exports = router
