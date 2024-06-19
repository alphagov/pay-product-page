//= require ./analytics.js

window.GovUkPay = window.GovUkPay || {}
window.GovUkPay.InitAnalytics = (function () {
  InitialiseAnalytics = function () {
    window.GovUkPay.Analytics.LoadGoogleAnalytics()
  }

  return {
    InitialiseAnalytics: InitialiseAnalytics,
  }
})()
