//= require ../helpers/cookie/cookie-functions.js
//= require ../analytics/init.js

window.GovUkPay = window.GovUkPay || {}

window.GovUkPay.CookieBanner = (function () {
  let $module = {}
  const COOKIE_NAME = 'govuk_pay_cookie_policy'

  const setModule = function ($module) {
    $module = $module
  }

  const checkForBannerAndInit = function () {
    var $cookieBanner = document.querySelector('[data-module="pay-cookie-banner"]')

    if ($cookieBanner) {
      setModule($cookieBanner)
      init($module)
    }
  }

  const init = function ($module) {
    $module.cookieBanner = document.querySelector('.pay-cookie-banner')
    $module.cookieBannerConfirmationMessage = document.querySelector('.pay-cookie-banner__confirmation')

    setupCookieMessage()
  }

  const setupCookieMessage = function () {
    const $hideLink = $module.cookieBannerConfirmationMessage.querySelector('button[data-hide-cookie-banner]')
    if ($hideLink) {
      $hideLink.addEventListener('click', hideCookieMessage)
    }

    const $acceptCookiesLink = $module.cookieBanner.querySelector('button[data-accept-cookies=true]')
    if ($acceptCookiesLink) {
      $acceptCookiesLink.addEventListener('click', function () {
        setCookieConsent(true)
      })
    }

    const $rejectCookiesLink = $module.cookieBanner.querySelector('button[data-accept-cookies=false]')
    if ($rejectCookiesLink) {
      $rejectCookiesLink.addEventListener('click', function () {
        setCookieConsent(false)
      })
    }

    showCookieMessage()
  }

  const showCookieMessage = function () {
    // Show the cookie banner if policy cookie not set
    var hasCookiesPolicy = window.GovUkPay.Cookie.getCookie(COOKIE_NAME)

    if ($module.cookieBanner) {
      if (!hasCookiesPolicy) {
        $module.cookieBanner.style.display = 'block'
      } else {
        const consentCookieObj = window.GovUkPay.Cookie.getConsentCookie()
        if (consentCookieObj && consentCookieObj.analytics === true) {
          window.GovUkPay.InitAnalytics.InitialiseAnalytics()
        }
        $module.cookieBanner.style.display = 'none'
      }
    }
  }

  const hideCookieMessage = function (event) {
    if ($module.cookieBannerConfirmationMessage) {
      $module.cookieBannerConfirmationMessage.style.display = 'none'
    }

    if (event.target) {
      event.preventDefault()
    }
  }

  const setCookieConsent = function (analyticsConsent) {
    window.GovUkPay.Cookie.setConsentCookie({ analytics: analyticsConsent })

    showConfirmationMessage(analyticsConsent)
    $module.cookieBannerConfirmationMessage.focus()
    if (analyticsConsent) {
      window.GovUkPay.InitAnalytics.InitialiseAnalytics()
    }
  }

  const showConfirmationMessage = function (analyticsConsent) {
    var messagePrefix = analyticsConsent ? 'You’ve accepted analytics cookies. ' : 'You told us not to use analytics cookies. '

    var $cookieBannerMainContent = document.querySelector('.pay-cookie-banner__wrapper')
    var $cookieBannerConfirmationMessage = document.querySelector('.pay-cookie-banner__confirmation-message')

    $cookieBannerConfirmationMessage.insertAdjacentText('afterbegin', messagePrefix)
    $cookieBannerMainContent.style.display = 'none'
    $module.cookieBannerConfirmationMessage.style.display = 'block'
  }

  return {
    setModule: setModule,
    checkForBannerAndInit: checkForBannerAndInit,
    init: init,
    setupCookieMessage: setupCookieMessage,
    showCookieMessage: showCookieMessage,
    hideCookieMessage: hideCookieMessage,
    setCookieConsent: setCookieConsent,
    showConfirmationMessage: showConfirmationMessage,
  }
})()
