/**
 * @jest-environment jsdom
 */

describe("Cookie settings", () => {
  beforeAll(() => {
    require("./cookie-functions");
  });

  describe("getCookie", () => {
    afterEach(() => {
      // Delete _ga cookie
      document.cookie = "_ga=;expires=Thu, 01 Jan 1970 00:00:00 UTC";
    });

    it("returns null if no cookie present", () => {
      expect(window.GovPay.Cookie.getCookie("_ga")).toEqual(null);
    });

    it("returns cookie if present", () => {
      window.GovPay.Cookie.setCookie("_ga", "foo");
      expect(window.GovPay.Cookie.getCookie("_ga")).toEqual("foo");
    });
  });

  describe("setCookie", () => {
    afterEach(() => {
      // Delete test cookies
      document.cookie = "myCookie=;expires=Thu, 01 Jan 1970 00:00:00 UTC";
      document.cookie =
        "govuk_pay_cookie_policy=;expires=Thu, 01 Jan 1970 00:00:00 UTC";
    });

    it("doesnt set a cookie with a value if not a recognised name", () => {
      window.GovPay.Cookie.setCookie("myCookie", "myValue");

      expect(document.cookie).toEqual("");
    });

    it("allows deletion of any cookie even if not recognised", () => {
      window.GovPay.Cookie.setCookie("myCookie", null);

      expect(document.cookie).toEqual("myCookie=null");
    });

    it("sets allowed cookie with no options", () => {
      window.GovPay.Cookie.setCookie(
        "govuk_pay_cookie_policy",
        '{"analytics":false}'
      );

      expect(document.cookie).toEqual(
        'govuk_pay_cookie_policy={"analytics":false}'
      );
    });

    it("sets allowed cookie with expiry date as an option", () => {
      const cookieExpiryDays = 10;
      const cookieString = window.GovPay.Cookie.setCookie(
        "govuk_pay_cookie_policy",
        '{"analytics":false}',
        { days: cookieExpiryDays }
      );

      //We cannot check the expiry date exactly - so we are checking it is between 2 days.
      const searchString = "expires=";
      const expiryDateString = cookieString.substring(
        cookieString.indexOf(searchString) + searchString.length
      );

      var expiryDate = new Date(expiryDateString);

      var previousDay = new Date(
        new Date().getTime() + 1000 * 60 * 60 * 24 * (cookieExpiryDays - 1)
      );
      var nextDay = new Date(
        new Date().getTime() + 1000 * 60 * 60 * 24 * (cookieExpiryDays + 1)
      );

      expect(expiryDate.getTime()).toBeGreaterThan(previousDay.getTime());
      expect(expiryDate.getTime()).toBeLessThan(nextDay.getTime());
    });
  });

  describe("getConsentCookie", () => {
    afterEach(() => {
      // Delete consent cookie
      document.cookie =
        "govuk_pay_cookie_policy=;expires=Thu, 01 Jan 1970 00:00:00 UTC";
    });

    it("returns null if consent cookie not present", () => {
      expect(window.GovPay.Cookie.getConsentCookie()).toEqual(null);
    });

    it("returns consent cookie object if present", () => {
      document.cookie = 'govuk_pay_cookie_policy={"analytics":false}';

      expect(window.GovPay.Cookie.getConsentCookie()).toEqual({
        analytics: false,
      });
    });
  });

  describe("setConsentCookie", () => {
    afterEach(() => {
      // Delete consent cookie
      document.cookie =
        "govuk_pay_cookie_policy=;expires=Thu, 01 Jan 1970 00:00:00 UTC";
    });

    describe("to false", () => {
      it("changes existing cookie value to false", () => {
        document.cookie = 'govuk_pay_cookie_policy={"analytics":true};';

        window.GovPay.Cookie.setConsentCookie({ analytics: false });

        expect(document.cookie).toEqual(
          'govuk_pay_cookie_policy={"analytics":false}'
        );
      });

      it("deletes existing analytics cookies", () => {
        document.cookie = "_ga=test;_gid=test;_gat_govuk_shared=test";

        window.GovPay.Cookie.setConsentCookie({ analytics: false });

        expect(document.cookie).toEqual(
          'govuk_pay_cookie_policy={"analytics":false}'
        );
        // Make sure those analytics cookies are definitely gone
        expect(window.GovPay.Cookie.getCookie("_ga")).toEqual(null);
        expect(window.GovPay.Cookie.getCookie("_gid")).toEqual(null);
        expect(window.GovPay.Cookie.getCookie("_gat_govuk_shared")).toEqual(
          null
        );
      });
    });

    describe("to true", () => {
      it("sets existing cookie policy cookie to true", () => {
        document.cookie = 'govuk_pay_cookie_policy={"analytics":false};';

        window.GovPay.Cookie.setConsentCookie({ analytics: true });

        expect(document.cookie).toEqual(
          'govuk_pay_cookie_policy={"analytics":true}'
        );
      });
    });
  });

  describe("getCookieDomain", () => {
    it(`when hostname has www, it replaces with a '.'`, () => {
      delete window.location;
      window.location = { hostname: "www.example.org" };

      expect(window.GovPay.Cookie.getCookieDomain()).toEqual(".example.org");
    });
  });
});
