"use strict";
const JsCookie = require("js-cookie");
const testBannerTemplate = require("./test-banner-template");

describe("Cookie Banner", () => {
  beforeEach(() => {
    document.body.innerHTML = testBannerTemplate;
    JsCookie.remove("gov_pay_cookie_policy");
    window.GovPay = window.GovPay || {};
    window.GovPay.InitAnalytics = {};
    window.GovPay.InitAnalytics.InitialiseAnalytics = jest.fn();

    document.querySelector(".pay-cookie-banner").style.display = "none";
    require("../helpers/cookie/cookie-functions");
    require("./cookie-banner");
  });

  describe("Existing User", () => {
    it(`should NOT see cookie banner when cookie consent = true`, () => {
      JsCookie.set("gov_pay_cookie_policy", "{analytics: true}");
      window.GovPay.CookieBanner.checkForBannerAndInit();

      expect(
        document.querySelector(".pay-cookie-banner").style.display
      ).toEqual("none");
    });

    it(`should NOT see cookie banner when cookie consent = false`, () => {
      JsCookie.set("gov_pay_cookie_policy", "{analytics: false}");
      window.GovPay.CookieBanner.checkForBannerAndInit();

      expect(
        document.querySelector(".pay-cookie-banner").style.display
      ).toEqual("none");
      expect(
        window.GovPay.InitAnalytics.InitialiseAnalytics.mock.calls.length
      ).toBe(0);
    });
  });

  describe("New User", () => {
    it(`should see cookie banner when no consent cookie present`, () => {
      console.log("cookie: ", document.cookie);
      window.GovPay.CookieBanner.checkForBannerAndInit();

      const banner = document.querySelector(".pay-cookie-banner");
      console.log(banner.style.display);
      expect(banner.style.display).toEqual("block");
    });

    it(`click YES on the cookie banner - sets consent cookie correctly`, () => {
      window.GovPay.CookieBanner.checkForBannerAndInit();
      document.querySelector("button[data-accept-cookies=true]").click();

      const consentCookie = JsCookie.get("gov_pay_cookie_policy");
      const consentCookieJson = JSON.parse(consentCookie);
      expect(consentCookieJson.analytics).toEqual(true);
    });

    it(`click YES on the cookie banner - displays confirmation message`, () => {
      window.GovPay.CookieBanner.checkForBannerAndInit();
      document.querySelector("button[data-accept-cookies=true]").click();

      const confirmBanner = document.querySelector(
        ".pay-cookie-banner__confirmation"
      );
      expect(confirmBanner.style.display).toEqual("block");
      expect(
        window.GovPay.InitAnalytics.InitialiseAnalytics.mock.calls.length
      ).toBe(1);
    });

    it(`click YES on the cookie banner - fires Analytics`, () => {
      window.GovPay.CookieBanner.checkForBannerAndInit();
      document.querySelector("button[data-accept-cookies=true]").click();

      expect(
        window.GovPay.InitAnalytics.InitialiseAnalytics.mock.calls.length
      ).toBe(1);
    });

    it(`click NO on the cookie banner - sets consent cookie correctly`, () => {
      window.GovPay.CookieBanner.checkForBannerAndInit();
      document.querySelector("button[data-accept-cookies=false]").click();

      const consentCookie = JsCookie.get("gov_pay_cookie_policy");
      const consentCookieJson = JSON.parse(consentCookie);
      expect(consentCookieJson.analytics).toEqual(false);
    });

    it(`click NO on the cookie banner - displays confirmation message`, () => {
      window.GovPay.CookieBanner.checkForBannerAndInit();
      document.querySelector("button[data-accept-cookies=false]").click();

      const confirmBanner = document.querySelector(
        ".pay-cookie-banner__confirmation"
      );
      expect(confirmBanner.style.display).toEqual("block");
    });

    it(`click NO on the cookie banner - does NOT fire Analytics`, () => {
      window.GovPay.CookieBanner.checkForBannerAndInit();
      document.querySelector("button[data-accept-cookies=false]").click();

      expect(
        window.GovPay.InitAnalytics.InitialiseAnalytics.mock.calls.length
      ).toBe(0);
    });
  });

  describe('Confirmation mesage', () => {
    it(`hide button works`, () => {
      window.GovPay.CookieBanner.checkForBannerAndInit();
      document.querySelector("button[data-accept-cookies=true]").click();
  
      const confirmBanner = document.querySelector(
        ".pay-cookie-banner__confirmation"
      );
      expect(confirmBanner.style.display).toEqual("block");

      confirmBanner.querySelector('.pay-cookie-banner__hide-button').click();
      expect(confirmBanner.style.display).toEqual('none');
    });
  })
});
