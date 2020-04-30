/**
 * @jest-environment jsdom
 */

const jsCookie = require("js-cookie");

beforeEach(() => {
  clearCookies()
});

describe("Cookie settings", () => {
  beforeAll(() => {
    require("./cookie-functions");
  });

  describe("getCookie", () => {
    it("returns null if no cookie present", () => {
      expect(window.GovUkPay.Cookie.getCookie("_ga")).toEqual(null);
    });

    it("returns cookie if present", () => {
      window.GovUkPay.Cookie.setCookie("_ga", "foo");
      expect(window.GovUkPay.Cookie.getCookie("_ga")).toEqual("foo");
    });
  });

  describe("setCookie", () => {
    it("doesnt set a cookie with a value if not a recognised name", () => {
      window.GovUkPay.Cookie.setCookie("myCookie", "myValue");

      expect(document.cookie).toEqual("");
    });

    it("allows deletion of any cookie even if not recognised", () => {
      window.GovUkPay.Cookie.setCookie("myCookie", null);

      expect(document.cookie).toEqual("myCookie=null");
    });

    it("sets allowed cookie with no options", () => {
      window.GovUkPay.Cookie.setCookie(
        "govuk_pay_cookie_policy",
        '{"analytics":false}'
      );

      expect(document.cookie).toEqual(
        'govuk_pay_cookie_policy={"analytics":false}'
      );
    });

    it("sets allowed cookie with expiry date as an option", () => {
      const cookieExpiryDays = 10;
      const cookieString = window.GovUkPay.Cookie.setCookie(
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
    it("returns null if consent cookie not present", () => {
      expect(window.GovUkPay.Cookie.getConsentCookie()).toEqual(null);
    });

    it("returns consent cookie object if present", () => {
      document.cookie = 'govuk_pay_cookie_policy={"analytics":false}; domain=.example.org';

      expect(window.GovUkPay.Cookie.getConsentCookie()).toEqual({analytics: false,});
    });
  });

  describe("setConsentCookie", () => {
    it("changes existing cookie value to false", () => {
      document.cookie = 'govuk_pay_cookie_policy={"analytics":true}; domain=.example.org';

      window.GovUkPay.Cookie.setConsentCookie({analytics: false});

      expect(window.GovUkPay.Cookie.getCookie('govuk_pay_cookie_policy'))
          .toEqual("{\"analytics\":false}");
    });

    it("deletes existing analytics cookies", () => {
      document.cookie = 'govuk_pay_cookie_policy={"analytics":true}; domain=.example.org'
      document.cookie = '_ga=ga1; domain=.example.org'
      document.cookie = '_gid=gid1; domain=.example.org'
      document.cookie = '_gat_govuk_shared=shared; domain=.example.org'

      window.GovUkPay.Cookie.setConsentCookie({analytics: false});

      expect(window.GovUkPay.Cookie.getCookie("govuk_pay_cookie_policy"))
          .toEqual("{\"analytics\":false}");
      // Make sure those analytics cookies are definitely gone
      expect(window.GovUkPay.Cookie.getCookie("_ga")).toEqual(null);
      expect(window.GovUkPay.Cookie.getCookie("_gid")).toEqual(null);
      expect(window.GovUkPay.Cookie.getCookie("_gat_govuk_shared")).toEqual(null);
    });

    it("changes existing cookie value to true", () => {
      document.cookie = 'govuk_pay_cookie_policy={"analytics":false}; domain=.example.org'

      window.GovUkPay.Cookie.setConsentCookie({analytics: true});

      expect(window.GovUkPay.Cookie.getCookie('govuk_pay_cookie_policy'))
          .toEqual("{\"analytics\":true}");
    });
  });

  describe("getCookieDomain", () => {
    it(`when hostname has www, it replaces with a '.'`, () => {
      delete window.location;
      window.location = { hostname: "www.example.org" };

      expect(window.GovUkPay.Cookie.getCookieDomain()).toEqual(".example.org");
    });
  });
});

function clearCookies() {
  Object.keys(jsCookie.get()).forEach(function (cookieName) {
    var neededAttributes = {
      domain: '.example.org'
    };
    jsCookie.remove(cookieName, neededAttributes);
  });
}