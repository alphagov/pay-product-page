//= require ../helpers/cookie/cookie-functions.js
//= require ../analytics/init.js

window.GovUkPay = window.GovUkPay || {};

window.GovUkPay.CookieBanner = (function () {
  $module = {};
  COOKIE_NAME = "govuk_pay_cookie_policy";

  setModule = function ($module) {
    $module = $module;
  };

  checkForBannerAndInit = function () {
    var $cookieBanner = document.querySelector(
      '[data-module="pay-cookie-banner"]'
    );

    if ($cookieBanner) {
      setModule($cookieBanner);
      init($module);
    }
  };

  init = function ($module) {
    $module.cookieBanner = document.querySelector(".pay-cookie-banner");
    $module.cookieBannerConfirmationMessage = document.querySelector(
      ".pay-cookie-banner__confirmation"
    );

    setupCookieMessage();
  };

  setupCookieMessage = function () {
    this.$hideLink = $module.cookieBannerConfirmationMessage.querySelector("button[data-hide-cookie-banner]");
    if (this.$hideLink) {
      this.$hideLink.addEventListener("click", hideCookieMessage);
    }

    this.$acceptCookiesLink = $module.cookieBanner.querySelector(
      "button[data-accept-cookies=true]"
    );
    if (this.$acceptCookiesLink) {
      this.$acceptCookiesLink.addEventListener("click", function () {
        setCookieConsent(true);
      })
    }

    this.$rejectCookiesLink = $module.cookieBanner.querySelector(
      "button[data-accept-cookies=false]"
    );
    if (this.$rejectCookiesLink) {
      this.$rejectCookiesLink.addEventListener("click", function () {
        setCookieConsent(false);
      })
    }

    this.showCookieMessage();
  };

  showCookieMessage = function () {
    // Show the cookie banner if policy cookie not set
    var hasCookiesPolicy = window.GovUkPay.Cookie.getCookie(COOKIE_NAME)

    if ($module.cookieBanner) {
      if (!hasCookiesPolicy) {
        $module.cookieBanner.style.display = "block"
      } else {
        const consentCookieObj =window.GovUkPay.Cookie.getConsentCookie()
        if (consentCookieObj && consentCookieObj.analytics === true) {
          window.GovUkPay.InitAnalytics.InitialiseAnalytics();
        }
        $module.cookieBanner.style.display = "none"
      }
    }
  }

  hideCookieMessage = function (event) {
    if ($module.cookieBannerConfirmationMessage) {
      $module.cookieBannerConfirmationMessage.style.display = "none";
    }

    if (event.target) {
      event.preventDefault();
    }
  };

  setCookieConsent = function (analyticsConsent) {
    window.GovUkPay.Cookie.setConsentCookie({ analytics: analyticsConsent });

    showConfirmationMessage(analyticsConsent);
    $module.cookieBannerConfirmationMessage.focus();
    if (analyticsConsent) {
      window.GovUkPay.InitAnalytics.InitialiseAnalytics();
    }
  };

  showConfirmationMessage = function (analyticsConsent) {
    var messagePrefix = analyticsConsent
      ? "You’ve accepted analytics cookies."
      : "You told us not to use analytics cookies.";

    var $cookieBannerMainContent = document.querySelector(
      ".pay-cookie-banner__wrapper"
    );
    var $cookieBannerConfirmationMessage = document.querySelector(
      ".pay-cookie-banner__confirmation-message"
    );

    $cookieBannerConfirmationMessage.insertAdjacentText(
      "afterbegin",
      messagePrefix
    );
    $cookieBannerMainContent.style.display = "none";
    $module.cookieBannerConfirmationMessage.style.display = "block";
  };

  return {
    setModule: setModule,
    checkForBannerAndInit: checkForBannerAndInit,
    init: init,
    setupCookieMessage: setupCookieMessage,
    showCookieMessage: showCookieMessage,
    hideCookieMessage: hideCookieMessage,
    setCookieConsent: setCookieConsent,
    showConfirmationMessage: showConfirmationMessage,
  };
})();
