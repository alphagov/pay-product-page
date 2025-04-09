//= require ./analytics.js

window.GovUkPay = window.GovUkPay || {}
window.GovUkPay.InitAnalytics = (function () {
  const InitialiseAnalytics = function () {
    window.GovUkPay.Analytics.LoadGoogleAnalytics()
  }

  return {
    InitialiseAnalytics: InitialiseAnalytics,
  }
})()
