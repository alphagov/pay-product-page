window.GovUkPay = window.GovUkPay || {}

window.GovUkPay.Cookie = (function () {
  var DEFAULT_COOKIE_CONSENT = {
    analytics: false,
  }

  var COOKIE_CATEGORIES = {
    _ga: 'analytics',
    _gid: 'analytics',
    _gat_govuk_shared: 'analytics',
  }

  var COOKIE_NAME = 'govuk_pay_cookie_policy'

  var getCookie = function (name) {
    var nameEQ = name + '='
    var cookies = document.cookie.split(';')
    for (var i = 0, len = cookies.length; i < len; i++) {
      var cookie = cookies[i]
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1, cookie.length)
      }
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length))
      }
    }
    return null
  }

  /*
  Cookie methods
  ==============
  Usage:
    Setting a cookie:
    setCookie('hobnob', 'tasty', { days: 30 })
    Reading a cookie:
    getCookie('hobnob')
    Deleting a cookie:
    Cookie('hobnob', null)
  */

  var Cookie = function (name, value, options) {
    if (typeof value !== 'undefined') {
      if (value === false || value === null) {
        return setCookie(name, '', { days: -1 })
      } else {
        // Default expiry date of 30 days
        if (typeof options === 'undefined') {
          options = { days: 30 }
        }
        return setCookie(name, value, options)
      }
    } else {
      return getCookie(name)
    }
  }

  var getConsentCookie = function () {
    var consentCookie = getCookie(COOKIE_NAME)
    var consentCookieObj

    if (consentCookie) {
      try {
        consentCookieObj = JSON.parse(consentCookie)
      } catch (err) {
        return null
      }

      if (typeof consentCookieObj !== 'object' && consentCookieObj !== null) {
        consentCookieObj = JSON.parse(consentCookieObj)
      }
    } else {
      return null
    }

    return consentCookieObj
  }

  var setConsentCookie = function (options) {
    var cookieConsent = getConsentCookie()

    if (!cookieConsent) {
      cookieConsent = JSON.parse(JSON.stringify(DEFAULT_COOKIE_CONSENT))
    }

    for (var cookieType in options) {
      cookieConsent[cookieType] = options[cookieType]

      // Delete cookies of that type if consent being set to false
      if (!options[cookieType]) {
        for (var cookie in COOKIE_CATEGORIES) {
          if (COOKIE_CATEGORIES[cookie] === cookieType) {
            Cookie(cookie, null)

            if (Cookie(cookie)) {
              document.cookie = cookie + '=;expires=' + new Date() + ';domain=' + getCookieDomain() + ';path=/'
            }
          }
        }
      }
    }

    setCookie(COOKIE_NAME, JSON.stringify(cookieConsent), { days: 365 })
  }

  var getCookieDomain = function () {
    return window.location.hostname.replace(/^www\./, '.')
  }

  var checkConsentCookieCategory = function (cookieName, cookieCategory) {
    var currentConsentCookie = getConsentCookie()

    // If the consent cookie doesn't exist, but the cookie is in our known list, return true
    if (!currentConsentCookie && COOKIE_CATEGORIES[cookieName]) {
      return true
    }

    currentConsentCookie = getConsentCookie()

    // Sometimes currentConsentCookie is malformed in some of the tests, so we need to handle these
    try {
      return currentConsentCookie[cookieCategory]
    } catch (e) {
      console.error(e)
      return false
    }
  }

  var checkConsentCookie = function (cookieName, cookieValue) {
    // If we're setting the consent cookie OR deleting a cookie, allow by default
    if (cookieName === COOKIE_NAME || cookieValue === null || cookieValue === false) {
      return true
    }

    if (COOKIE_CATEGORIES[cookieName]) {
      var cookieCategory = COOKIE_CATEGORIES[cookieName]

      return checkConsentCookieCategory(cookieName, cookieCategory)
    } else {
      // Deny the cookie if it is not known to us
      return false
    }
  }

  var setCookie = function (name, value, options) {
    if (window.GovUkPay.Cookie.checkConsentCookie(name, value)) {
      if (typeof options === 'undefined') {
        options = {}
      }
      var cookieString = name + '=' + value + '; path=/; domain=' + getCookieDomain()
      if (options.days) {
        var date = new Date()
        date.setTime(date.getTime() + options.days * 24 * 60 * 60 * 1000)
        cookieString = cookieString + '; expires=' + date.toGMTString()
      }
      if (document.location.protocol === 'https:') {
        cookieString = cookieString + '; Secure'
      }

      document.cookie = cookieString
      return cookieString
    }

    return null
  }

  return {
    getCookie: getCookie,
    Cookie: Cookie,
    getConsentCookie: getConsentCookie,
    setConsentCookie: setConsentCookie,
    checkConsentCookieCategory: checkConsentCookieCategory,
    checkConsentCookie: checkConsentCookie,
    setCookie: setCookie,
    getCookieDomain: getCookieDomain,
  }
})()
