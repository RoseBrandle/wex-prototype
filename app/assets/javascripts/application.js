/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {

  window.GOVUKFrontend.initAll()

  // Hide new tab span
  $("span.newtab").toggleClass('govuk-visually-hidden')
  // Show new tab message on click
  $("a[target='_blank']").one("click", function(e){
      e.preventDefault()
      $(this).blur()
      $(this).children( 'span.newtab' ).toggleClass('govuk-visually-hidden').addClass('bold-small')
  })


})
