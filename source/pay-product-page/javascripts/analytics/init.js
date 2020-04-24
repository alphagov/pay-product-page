//= require ./analytics.js

window.GovUkPay = window.GovUkPay || {};
window.GovUkPay.InitAnalytics = (function () {
  // TODO: Remove hard coded tracking IDs to make this more generic and useful to others
  var TRACKING_ID = "UA-72121642-9";


  InitialiseAnalytics = function () {
    window.GovUkPay.Analytics.LoadGoogleAnalytics();

    // Configure profiles and make interface public
    // for custom dimensions, virtual pageviews and events
    window.GovUkPay.analytics = window.GovUkPay.Analytics.SetupAnalytics({
      trackingId: TRACKING_ID,
      anonymizeIp: true,
      displayFeaturesTask: null,
      transport: "beacon",
      expires: 365,
    });

    // Track initial pageview
    window.GovUkPay.Analytics.TrackPageview();
  };

  return {
    InitialiseAnalytics: InitialiseAnalytics,
  };
})();
