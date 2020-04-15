//= require govuk/all.js
//= require gaap-analytics.min.js
//= require cookies.js

document.addEventListener("DOMContentLoaded", function(event) {
  GOVUKFrontend.initAll()
  GAAP.analytics.eventTracking.init()
  const $cookieBanner = document.querySelector('[data-module="dm-cookie-banner"]')
  if ($cookieBanner) {
    console.log('there is cookie banner')
    new CookieBanner($cookieBanner).init()
  }
});
