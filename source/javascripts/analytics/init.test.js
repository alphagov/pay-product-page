/**
 * @jest-environment jsdom
 */

jest.mock('./analytics')

beforeAll(() => {
  require('./init')
  window.GovUkPay.Analytics = {
    LoadGoogleAnalytics: jest.fn(),
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
  })
})
