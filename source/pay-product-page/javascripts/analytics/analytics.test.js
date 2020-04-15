/**
 * @jest-environment jsdom
 */

const defaultConfig = {
  trackingId: 'UA-12345',
  cookieDomain: 'www.digitalmarketplace.service.gov.uk',
  anonymizeIp: true,
  displayFeaturesTask: null,
  transport: 'beacon',
  expires: 365
}

beforeAll(() => {
  require('./analytics')
  require('./pii')
  // add the script GA looks for in the document
  document.body.appendChild(document.createElement('script'))
})

beforeEach(() => {
  // Set up mock
  window.ga = jest.fn()

  window.GovPay.Analytics.SetupAnalytics(defaultConfig)
})

afterEach(() => {
  window.ga.mockClear()
})

describe('analytics component', () => {
  it('init creates script element', () => {
    expect(window.ga.mock.calls).toEqual([
      ['create', 'UA-12345', 'www.digitalmarketplace.service.gov.uk', { cookieExpires: 31536000 }],
      ['set', 'anonymizeIp', true],
      ['set', 'displayFeaturesTask', null],
      ['set', 'transport', 'beacon']
    ])
  })

  it('setup google analytics', () => {
    expect(window.GoogleAnalyticsObject).not.toBeDefined()
    window.GovPay.Analytics.LoadGoogleAnalytics()
    expect(window.GoogleAnalyticsObject).toEqual('ga')
  })

  describe('sends data to Google Analytics when', () => {
    beforeAll(() => {
      jest.spyOn(window, 'location', 'get').mockImplementation(() => {
        return {
          pathname: '/privacy-policy',
          search: '',
          href: '/privacy-policy'
        }
      })
    })

    it('trackPageView sends pageview event', () => {
      window.ga.mockClear()

      window.GovPay.Analytics.TrackPageview()

      expect(window.ga.mock.calls[0]).toEqual(['send', 'pageview', '/privacy-policy'])
    })

    it('trackEvent sends generic event', () => {
      window.ga.mockClear()

      window.GovPay.Analytics.TrackEvent('myCategory', 'myAction', { label: 'myLabel' })

      expect(window.ga.mock.calls[0]).toEqual([
        'send',
        'event',
        {
          eventAction: 'myAction',
          eventCategory: 'myCategory',
          eventLabel: 'myLabel'
        }
      ])
    })
  })

  describe('sanitises personal data when', () => {
    beforeAll(() => {
      jest.spyOn(window, 'location', 'get').mockImplementation(() => {
        return {
          pathname: '/search',
          search: '?q=email@example.com',
          href: '/search?q=email@example.com'
        }
      })
    })

    it('trackPageView sends a pageview event', () => {
      window.ga.mockClear()

      window.GovPay.Analytics.TrackPageview()

      expect(window.ga.mock.calls[0]).toEqual(['send', 'pageview', '/search?q=[email]'])
    })

    it('trackEvent sends an event', () => {
      window.ga.mockClear()

      window.GovPay.Analytics.TrackEvent('myCategory', 'myAction', { label: 'email@example.com' })

      expect(window.ga.mock.calls[0]).toEqual([
        'send',
        'event',
        {
          eventAction: 'myAction',
          eventCategory: 'myCategory',
          eventLabel: '[email]'
        }
      ])
    })

  })
})
