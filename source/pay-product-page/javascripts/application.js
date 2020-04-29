//= require govuk/all.js
//= require gaap-analytics.min.js
//= require cookies.js
//= require ./cookie-banner/cookie-banner.js
//= require ./cookie-settings/cookie-settings.js

document.addEventListener("DOMContentLoaded", function(event) {
  GOVUKFrontend.initAll()
  GAAP.analytics.eventTracking.init()
  window.GovUkPay.CookieBanner.checkForBannerAndInit();
  window.GovUkPay.CookieSettings.checkForFormAndInit();
});
