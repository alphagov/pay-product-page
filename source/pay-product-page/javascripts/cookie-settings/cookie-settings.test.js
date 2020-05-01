/**
 * @jest-environment jsdom
 */
const JsCookie = require("js-cookie");
const testCookiePageTemplate = require("./test-cookie-page-template");

const formInputsForMock = jest.fn((param) => {
  // Return the form input objects
  let inputs = [];
  if (param === "on") {
    inputs = [{ checked: true, value: "on" }, { value: "off" }];
  } else if (param === "off") {
    inputs = [{ checked: true, value: "off" }, { value: "on" }];
  } else if (param === "neither") {
    inputs = [{ value: "on" }, { value: "off" }];
  }
  return inputs;
});

const mockSubmitEvent = jest.fn((param) => {
  const submitEvent = jest.fn();
  submitEvent.target = jest.fn();
  submitEvent.preventDefault = jest.fn();
  submitEvent.target.querySelectorAll = jest.fn();
  submitEvent.target.querySelectorAll.mockImplementation(() => {
    return formInputsForMock(param);
  });
  return submitEvent;
});

describe("Cookie settings", () => {
  beforeEach(() => {
    window.GovUkPay = window.GovUkPay || {};
    window.GovUkPay.InitAnalytics = {};
    window.GovUkPay.InitAnalytics.InitialiseAnalytics = jest.fn();

    require("../helpers/cookie/cookie-functions");
    require("./cookie-settings");

    JsCookie.remove("govuk_pay_cookie_policy");

    document.body.innerHTML = testCookiePageTemplate;
    document.querySelector(".pay-cookie-settings-alert--error").style.display = "none";
    document.querySelector(".pay-cookie-settings-alert--success").style.display = "none";
    // expire analytics cookie explictly, as cookies are not cleared in jest environment during the tests
    document.cookie = "govuk_pay_cookie_policy=;expires=Thu, 01 Jan 1970 00:00:00 UTC;domain=.example.org";
  });

  describe("initialising the component", () => {
    it("hides the cookie banner if present", () => {
      window.GovUkPay.CookieSettings.checkForFormAndInit();

      expect(
        document.querySelector("#pay-cookie-banner").style.display
      ).toEqual("none");
    });

    describe("without existing analytics", () => {
      it("does not hide the warning message", () => {
        window.GovUkPay.CookieSettings.checkForFormAndInit();

        expect(
          document.querySelector(".pay-cookie-settings-alert--warning").style
            .display
        ).not.toEqual("none");
      });
    });

    describe("with existing analytics", () => {
      it("hides the warning message", () => {
        JsCookie.set("govuk_pay_cookie_policy", `{"analytics": true}`);
        window.GovUkPay.CookieSettings.checkForFormAndInit();

        expect(
          document.querySelector(".pay-cookie-settings-alert--warning").style
            .display
        ).toEqual("none");
      });
    });

    describe("initialising the Cookie Settings radio buttons", () => {
      it("when no cookie present - no radio buttons are checked", () => {
        window.GovUkPay.CookieSettings.checkForFormAndInit();

        expect(
          document.querySelector("input[name=cookies-analytics][value=on]")
            .checked
        ).toEqual(false);

        expect(
          document.querySelector("input[name=cookies-analytics][value=off]")
            .checked
        ).toEqual(false);
      });

      it("cookie with analytics=true - ON radio button is checked", () => {
        JsCookie.set("govuk_pay_cookie_policy", `{"analytics": true}`);
        window.GovUkPay.CookieSettings.checkForFormAndInit();

        expect(
          document.querySelector("input[name=cookies-analytics][value=on]")
            .checked
        ).toEqual(true);

        expect(
          document.querySelector("input[name=cookies-analytics][value=off]")
            .checked
        ).toEqual(false);
      });

      it("cookie with analytics=false - OFF radio button is checked", () => {
        JsCookie.set("govuk_pay_cookie_policy", `{"analytics": false}`);
        window.GovUkPay.CookieSettings.checkForFormAndInit();

        expect(
          document.querySelector("input[name=cookies-analytics][value=on]")
            .checked
        ).toEqual(false);

        expect(
          document.querySelector("input[name=cookies-analytics][value=off]")
            .checked
        ).toEqual(true);
      });
    });
  });

  describe("Submitting the form", () => {
    describe("with No selected", () => {
      let submitEvent;
      beforeEach(() => {
        submitEvent = mockSubmitEvent("off");
      });

      it("sets consent cookie", () => {
        window.GovUkPay.CookieSettings.submitSettingsForm(submitEvent);

        expect(submitEvent.preventDefault).toHaveBeenCalled();
        const consentCookie = JsCookie.get("govuk_pay_cookie_policy");
        const consentCookieJson = JSON.parse(consentCookie);
        expect(consentCookieJson).toEqual({
          analytics: false,
        });
      });

      it("does not initialise Analytics", () => {
        window.GovUkPay.CookieSettings.submitSettingsForm(submitEvent);
        expect(
          window.GovUkPay.InitAnalytics.InitialiseAnalytics
        ).not.toHaveBeenCalled();
      });

      it("shows confirmation message and hides other messages", () => {
        window.GovUkPay.CookieSettings.submitSettingsForm(submitEvent);

        expect(
          document.querySelector(".pay-cookie-settings-alert--warning").style
            .display
        ).toEqual("none");
        expect(
          document.querySelector(".pay-cookie-settings-alert--error").style
            .display
        ).toEqual("none");
        expect(
          document.querySelector(".pay-cookie-settings-alert--success").style
            .display
        ).toEqual("block");
      });
    });

    describe("with Yes selected", () => {
      let submitEvent;
      beforeEach(() => {
        submitEvent = mockSubmitEvent("on");
      });

      it("sets consent cookie", () => {
        window.GovUkPay.CookieSettings.submitSettingsForm(submitEvent);

        expect(submitEvent.preventDefault).toHaveBeenCalled();
        const consentCookie = JsCookie.get("govuk_pay_cookie_policy");
        const consentCookieJson = JSON.parse(consentCookie);
        expect(consentCookieJson).toEqual({
          analytics: true,
        });
      });

      it("initialises Analytics", () => {
        window.GovUkPay.CookieSettings.submitSettingsForm(submitEvent);
        expect(
          window.GovUkPay.InitAnalytics.InitialiseAnalytics
        ).toHaveBeenCalled();
      });

      it("shows confirmation message and hides other messages", () => {
        window.GovUkPay.CookieSettings.submitSettingsForm(submitEvent);

        expect(
          document.querySelector(".pay-cookie-settings-alert--warning").style
            .display
        ).toEqual("none");
        expect(
          document.querySelector(".pay-cookie-settings-alert--error").style
            .display
        ).toEqual("none");
        expect(
          document.querySelector(".pay-cookie-settings-alert--success").style
            .display
        ).toEqual("block");
      });
    });

    describe("with nothing selected", () => {
      let submitEvent;
      beforeEach(() => {
        submitEvent = mockSubmitEvent("neither");
      });

      it("does not set consent cookie", () => {
        window.GovUkPay.CookieSettings.submitSettingsForm(submitEvent);

        expect(submitEvent.preventDefault).toHaveBeenCalled();
        const consentCookie = JsCookie.get("govuk_pay_cookie_policy");
        expect(consentCookie).toBeUndefined();
      });

      it("does not initialise Analytics", () => {
        window.GovUkPay.CookieSettings.submitSettingsForm(submitEvent);
        expect(
          window.GovUkPay.InitAnalytics.InitialiseAnalytics
        ).not.toHaveBeenCalled();
      });

      it("shows error message", () => {
        window.GovUkPay.CookieSettings.submitSettingsForm(submitEvent);

        expect(
          document.querySelector(".pay-cookie-settings-alert--warning").style
            .display
        ).not.toEqual("none");
        expect(
          document.querySelector(".pay-cookie-settings-alert--error").style
            .display
        ).toEqual("block");
        expect(
          document.querySelector(".pay-cookie-settings-alert--success").style
            .display
        ).not.toEqual("block");
      });
    });

    describe("after changing cookie settings - sets the back link in the success alert", () => {
        let submitEvent;
        beforeEach(() => {
            submitEvent = mockSubmitEvent("on");
        });
  
        it("when there is no referrer, it does NOT show a back link", () => {
            Object.defineProperty(window.document, 'referrer', { value: null, configurable: true })
          window.GovUkPay.CookieSettings.submitSettingsForm(submitEvent);
  
          expect(
            document.querySelector(".pay-cookie-settings__prev-page").style
              .display
          ).toEqual("none");
        });

        it("when there is a referrer, it does show a back link", () => {
            Object.defineProperty(window.document, 'referrer', { value: "http://www.example.org/page1", configurable: true })  
          window.GovUkPay.CookieSettings.submitSettingsForm(submitEvent);
  
          expect(
            document.querySelector(".pay-cookie-settings__prev-page").style
              .display
          ).toEqual("block");

          expect(
            document.querySelector(".pay-cookie-settings__prev-page").href
          ).toEqual("http://www.example.org/page1");
        });

        it("when the referrer is the same page, do not show back link", () => {
            Object.defineProperty(window.document, 'referrer', { value: "http://www.example.org/", configurable: true
         })  
          window.GovUkPay.CookieSettings.submitSettingsForm(submitEvent);
  
          expect(
            document.querySelector(".pay-cookie-settings__prev-page").style
              .display
          ).toEqual("none");

        });
      });
  });
});
