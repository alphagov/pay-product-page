//= require ./analytics.js

window.GovPay = window.GovPay || {};
window.GovPay.InitAnalytics = (function () {
  // TODO: Remove hard coded tracking IDs to make this more generic and useful to others
  var TRACKING_ID = "UA-72121642-9";


  InitialiseAnalytics = function () {
    window.GovPay.Analytics.LoadGoogleAnalytics();

    // Configure profiles and make interface public
    // for custom dimensions, virtual pageviews and events
    window.GovPay.analytics = window.GovPay.Analytics.SetupAnalytics({
      trackingId: TRACKING_ID,
      anonymizeIp: true,
      displayFeaturesTask: null,
      transport: "beacon",
      expires: 365,
    });

    // Track initial pageview
    window.GovPay.Analytics.TrackPageview();
  };

  return {
    InitialiseAnalytics: InitialiseAnalytics,
  };
})();
