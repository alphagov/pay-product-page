window.GovUkPay = window.GovUkPay || {};
window.GovUkPay.Analytics = (function () {
  // Stripped-down wra§pper for Google Analytics, based on:
  // https://github.com/alphagov/static/blob/master/doc/analytics.md
  SetupAnalytics = function (config) {
    window.ga("create", config.trackingId, config.cookieDomain);
    window.ga("set", "anonymizeIp", config.anonymizeIp);
    window.ga("set", "displayFeaturesTask", config.displayFeaturesTask);
    window.ga("set", "transport", config.transport);
  };

  LoadGoogleAnalytics = function () {
    /* eslint-disable */
    // Copied from Google Analytics installation instructions
    /* jshint ignore:start */
    (function (i, s, o, g, r, a, m) {
      i["GoogleAnalyticsObject"] = r;
      (i[r] =
        i[r] ||
        function () {
          (i[r].q = i[r].q || []).push(arguments);
        }),
        (i[r].l = 1 * new Date());
      (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m);
    })(
      window,
      document,
      "script",
      "//www.google-analytics.com/analytics.js",
      "ga"
    );
    /* jshint ignore:end */
  };

  TrackPageview = function (path, title, options) {
    var page = window.location.pathname + window.location.search;
    window.ga("send", "pageview", page);
  };

  return {
    TrackPageview: TrackPageview,
    LoadGoogleAnalytics: LoadGoogleAnalytics,
    SetupAnalytics: SetupAnalytics,
  };
})();
