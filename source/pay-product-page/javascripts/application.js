//= require govuk/all.js
//= require gaap-analytics.min.js
//= require ./cookie-banner/cookie-banner.js

document.addEventListener("DOMContentLoaded", function(event) {
  GOVUKFrontend.initAll()
  GAAP.analytics.eventTracking.init()
  window.GovPay.CookieBanner.checkForBannerAndInit();
});
