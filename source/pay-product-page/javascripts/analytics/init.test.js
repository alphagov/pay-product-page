/**
 * @jest-environment jsdom
 */

jest.mock('./analytics')

beforeAll(() => {
  // add the script GA looks for in the document
  document.body.appendChild(document.createElement('script'))

  // pretend we're on the /privacy-notice page
  jest.spyOn(window, 'location', 'get').mockImplementation(() => {
    return {
      pathname: '/privacy-notice',
      search: ''
    }
  })

  require('./init')
  window.GovUkPay.Analytics = {
    LoadGoogleAnalytics: jest.fn(),
    SetupAnalytics: jest.fn(),
    TrackPageview: jest.fn(),
  }
    
})

describe('InitialiseAnalytics component', () => {

  describe('If initAnalytics has not yet been called', () => {
    beforeEach(() => {
      InitialiseAnalytics()
    })

    it('the Google Analytics libraries will have been loaded', () => {
      expect(window.GovUkPay.Analytics.LoadGoogleAnalytics).toHaveBeenCalled()
    })

    it('the Analytics tracker will have been configured', () => {
      expect(window.GovUkPay.Analytics.SetupAnalytics).toHaveBeenCalledWith(
        expect.objectContaining({
          // Do not assert cookieDomain or trackingId for now
          anonymizeIp: true,
          displayFeaturesTask: null,
          transport: 'beacon',
          expires: 365
        })
      )
    })

    it('fires an initial trackPageview', () => {
      expect(window.GovUkPay.Analytics.TrackPageview).toHaveBeenCalled()
    })
  })
})
