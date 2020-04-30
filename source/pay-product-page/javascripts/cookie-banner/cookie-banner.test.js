"use strict";
const JsCookie = require("js-cookie");
const testBannerTemplate = require("./test-banner-template");

describe("Cookie Banner", () => {
  beforeEach(() => {
    document.body.innerHTML = testBannerTemplate;
    JsCookie.remove("govuk_pay_cookie_policy");
    window.GovUkPay = window.GovUkPay || {};
    window.GovUkPay.InitAnalytics = {};
    window.GovUkPay.InitAnalytics.InitialiseAnalytics = jest.fn();
    document.querySelector(".pay-cookie-banner").style.display = "none";
    require("../helpers/cookie/cookie-functions");
    require("./cookie-banner");
    // expire analytics cookie explictly, as cookies are not cleared in jest environment during the tests
    document.cookie = "govuk_pay_cookie_policy=;expires=Thu, 01 Jan 1970 00:00:00 UTC;domain=.example.org";
  });

  describe("Existing User", () => {
    it(`should NOT see cookie banner but initialise analytics when cookie consent = true`, () => {
      JsCookie.set("govuk_pay_cookie_policy", "{\"analytics\": true}");
      window.GovUkPay.CookieBanner.checkForBannerAndInit();

      expect(document.querySelector(".pay-cookie-banner").style.display).toEqual("none");
      expect(window.GovUkPay.InitAnalytics.InitialiseAnalytics.mock.calls.length).toBe(1);
    });

    it(`should NOT see cookie banner and not initialise analytics when cookie consent = false`, () => {
      JsCookie.set("govuk_pay_cookie_policy", "{\"analytics\": false}");
      window.GovUkPay.CookieBanner.checkForBannerAndInit();

      expect(document.querySelector(".pay-cookie-banner").style.display).toEqual("none");
      expect(window.GovUkPay.InitAnalytics.InitialiseAnalytics.mock.calls.length).toBe(0);
    });
  });

  describe("New User", () => {
    it(`should see cookie banner when no consent cookie present`, () => {
      window.GovUkPay.CookieBanner.checkForBannerAndInit();

      const banner = document.querySelector(".pay-cookie-banner");
      expect(banner.style.display).toEqual("block");
    });

    it(`click YES on the cookie banner - sets consent cookie correctly`, () => {
      window.GovUkPay.CookieBanner.checkForBannerAndInit();
      document.querySelector("button[data-accept-cookies=true]").click();

      const consentCookie = JsCookie.get("govuk_pay_cookie_policy");
      const consentCookieJson = JSON.parse(consentCookie);
      expect(consentCookieJson.analytics).toEqual(true);
    });

    it(`click YES on the cookie banner - displays confirmation message`, () => {
      window.GovUkPay.CookieBanner.checkForBannerAndInit();
      document.querySelector("button[data-accept-cookies=true]").click();

      const confirmBanner = document.querySelector(
        ".pay-cookie-banner__confirmation"
      );
      expect(confirmBanner.style.display).toEqual("block");
      expect(
        window.GovUkPay.InitAnalytics.InitialiseAnalytics.mock.calls.length
      ).toBe(1);
    });

    it(`click YES on the cookie banner - fires Analytics`, () => {
      window.GovUkPay.CookieBanner.checkForBannerAndInit();
      document.querySelector("button[data-accept-cookies=true]").click();

      expect(
        window.GovUkPay.InitAnalytics.InitialiseAnalytics.mock.calls.length
      ).toBe(1);
    });

    it(`click NO on the cookie banner - sets consent cookie correctly`, () => {
      window.GovUkPay.CookieBanner.checkForBannerAndInit();
      document.querySelector("button[data-accept-cookies=false]").click();

      const consentCookie = JsCookie.get("govuk_pay_cookie_policy");
      const consentCookieJson = JSON.parse(consentCookie);
      expect(consentCookieJson.analytics).toEqual(false);
    });

    it(`click NO on the cookie banner - displays confirmation message`, () => {
      window.GovUkPay.CookieBanner.checkForBannerAndInit();
      document.querySelector("button[data-accept-cookies=false]").click();

      const confirmBanner = document.querySelector(
        ".pay-cookie-banner__confirmation"
      );
      expect(confirmBanner.style.display).toEqual("block");
    });

    it(`click NO on the cookie banner - does NOT fire Analytics`, () => {
      window.GovUkPay.CookieBanner.checkForBannerAndInit();
      document.querySelector("button[data-accept-cookies=false]").click();

      expect(
        window.GovUkPay.InitAnalytics.InitialiseAnalytics.mock.calls.length
      ).toBe(0);
    });
  });

  describe("Confirmation mesage", () => {
    it(`hide button works`, () => {
      window.GovUkPay.CookieBanner.checkForBannerAndInit();
      document.querySelector("button[data-accept-cookies=true]").click();

      const confirmBanner = document.querySelector(
        ".pay-cookie-banner__confirmation"
      );
      expect(confirmBanner.style.display).toEqual("block");

      confirmBanner.querySelector(".pay-cookie-banner__hide-button").click();
      expect(confirmBanner.style.display).toEqual("none");
    });
  });
});
