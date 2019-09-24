//= require govuk/all.js
//= require gaap-analytics.min.js
//= require cookies.js

document.addEventListener("DOMContentLoaded", function(event) {
  GOVUKFrontend.initAll()
  GAAP.analytics.eventTracking.init()
});
