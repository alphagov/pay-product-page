//= require govuk/all.js
//= require gaap-analytics.min.js
//= require cookies.js
//= require cookie-banner.js

document.addEventListener("DOMContentLoaded", function(event) {
  GOVUKFrontend.initAll()
  GAAP.analytics.eventTracking.init()
  initCookieBanner();
});

function initCookieBanner() {
  const $cookieBanner = document.querySelector('[data-module="govuk-pay-cookie-banner"]');
  if ($cookieBanner) {
    new CookieBanner($cookieBanner).init();
  }
}

