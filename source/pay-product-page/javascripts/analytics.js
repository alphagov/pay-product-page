function InitialiseAnalytics () {
  LoadGoogleAnalytics()

  SetupAnalytics({
      trackingId: 'UA-72121642-9',
      anonymizeIp: true,
      displayFeaturesTask: null,
      transport: 'beacon',
      expires: 365
    })
  
  TrackPageview()
}

function LoadGoogleAnalytics () { /* eslint-disable */
  // Copied from Google Analytics installation instructions
  /* jshint ignore:start */
  (function(i, s, o, g, r, a, m){ i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments) }, i[r].l = 1 * new Date(); a = s.createElement(o),
    m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga')
  /* jshint ignore:end */
}

function SetupAnalytics (config) {
  window.ga('create', config.trackingId, { cookieExpires: config.expires * 24 * 60 * 60 })

  window.ga('set', 'anonymizeIp', config.anonymizeIp)
  window.ga('set', 'displayFeaturesTask', config.displayFeaturesTask)
  window.ga('set', 'transport', config.transport)
}

function TrackPageview () {
  const page = (window.location.pathname + window.location.search)
  window.ga('send', 'pageview', stripPII(page))
}
