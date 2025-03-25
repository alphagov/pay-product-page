//= require cookies.js
//= require ./cookie-banner/cookie-banner.js
//= require ./cookie-settings/cookie-settings.js

document.addEventListener('DOMContentLoaded', function (event) {
  if (window.GOVUKFrontend) {
    window.GOVUKFrontend.initAll()
  }
  if (window.GAAP && window.GAAP.analytics) {
    window.GAAP.analytics.eventTracking.init()
  }
  window.GovUkPay.CookieBanner.checkForBannerAndInit()
  window.GovUkPay.CookieSettings.checkForFormAndInit()
})
