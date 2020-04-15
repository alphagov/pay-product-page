//= require ./analytics.js

window.GovPay = window.GovPay || {};
window.GovPay.InitAnalytics = (function () {
  // TODO: Remove hard coded tracking IDs to make this more generic and useful to others
  var TRACKING_ID = "UA-72121642-9";


  InitialiseAnalytics = function () {
    // TODO: Check if we still need this hack for the domain
    var cookieDomain =
      document.domain === "www.payments.service.gov.uk"
        ? ".payments.service.gov.uk"
        : document.domain;

    // Load Analytics libraries
    window.GovPay.Analytics.LoadGoogleAnalytics();

    // Configure profiles and make interface public
    // for custom dimensions, virtual pageviews and events
    window.GovPay.analytics = window.GovPay.Analytics.SetupAnalytics({
      trackingId: TRACKING_ID,
      cookieDomain: cookieDomain,
      anonymizeIp: true,
      displayFeaturesTask: null,
      transport: "beacon",
      expires: 365,
    });

    // Add cross-domain tracking for www.gov.uk domain
    //TODO - Do we need this?
    //PageAnalytics.AddLinkedTrackerDomain(linkedTrackingId, 'govuk_shared', ['www.gov.uk'])

    // Track initial pageview
    window.GovPay.Analytics.TrackPageview();
  };

  return {
    InitialiseAnalytics: InitialiseAnalytics,
  };
})();
