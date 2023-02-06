/**
 * @jest-environment jsdom
 */

const defaultConfig = {
  trackingId: "UA-12345",
  cookieDomain: "www.example.org",
  anonymizeIp: true,
  displayFeaturesTask: null,
  transport: "beacon",
  expires: 365,
};

beforeAll(() => {
  require("./analytics");
  // add the script GA looks for in the document
  document.body.appendChild(document.createElement("script"));
});

beforeEach(() => {
  // Set up mock
  window.ga = jest.fn();

  window.GovUkPay.Analytics.SetupAnalytics(defaultConfig);
});

afterEach(() => {
  window.ga.mockClear();
});

describe("analytics component", () => {
  it("init creates script element", () => {
    expect(window.ga.mock.calls).toEqual([
      [
        "create",
        "UA-12345",
        "www.example.org",
      ],
      ["set", "anonymizeIp", true],
      ["set", "displayFeaturesTask", null],
      ["set", "transport", "beacon"],
    ]);
  });

  it("setup google analytics", () => {
    expect(window.GoogleAnalyticsObject).not.toBeDefined();
    window.GovUkPay.Analytics.LoadGoogleAnalytics();
    expect(window.GoogleAnalyticsObject).toEqual("ga");
  });

  describe("sends data to Google Analytics when", () => {
    beforeAll(() => {
      jest.spyOn(window, "location", "get").mockImplementation(() => {
        return {
          pathname: "/test-page",
          search: "",
          href: "/test-page",
        };
      });
    });

    it("trackPageView sends pageview event", () => {
      window.ga.mockClear();

      window.GovUkPay.Analytics.TrackPageview();

      expect(window.ga.mock.calls[0]).toEqual([
        "send",
        "pageview",
        "/test-page",
      ]);
    });
  });

  describe("sanitises personal data when", () => {
    beforeAll(() => {
      jest.spyOn(window, "location", "get").mockImplementation(() => {
        return {
          pathname: "/search",
          search: "?q=email@example.com",
          href: "/search?q=email@example.com",
        };
      });
    });

    it("trackPageView sends a pageview event", () => {
      window.ga.mockClear();

      window.GovUkPay.Analytics.TrackPageview();

      expect(window.ga.mock.calls[0]).toEqual([
        "send",
        "pageview",
        "/search?q=email@example.com",
      ]);
    });
  });
});
