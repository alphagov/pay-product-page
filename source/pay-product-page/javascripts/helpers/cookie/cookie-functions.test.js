/**
 * @jest-environment jsdom
 */

describe('Cookie settings', () => {
  beforeAll(() => {
    require('./cookie-functions')
  })

  describe('getCookie', () => {
    afterEach(() => {
      // Delete _ga cookie
      document.cookie = '_ga=;expires=Thu, 01 Jan 1970 00:00:00 UTC'
    })

    it('returns null if no cookie present', async () => {
      expect(window.GovPay.Cookie.getCookie('_ga')).toEqual(null)
    })

    it('returns cookie if present', async () => {
      window.GovPay.Cookie.setCookie('_ga', 'foo')
      expect(window.GovPay.Cookie.getCookie('_ga')).toEqual('foo')
    })
  })

  describe('setCookie', () => {
    afterEach(() => {
      // Delete test cookies
      document.cookie = 'myCookie=;expires=Thu, 01 Jan 1970 00:00:00 UTC'
      document.cookie = 'gov_pay_cookie_policy=;expires=Thu, 01 Jan 1970 00:00:00 UTC'
    })

    it('doesnt set a cookie with a value if not a recognised name', async () => {
      window.GovPay.Cookie.setCookie('myCookie', 'myValue')

      expect(document.cookie).toEqual('')
    })

    it('allows deletion of any cookie even if not recognised', async () => {
      window.GovPay.Cookie.setCookie('myCookie', null)

      expect(document.cookie).toEqual('myCookie=null')
    })

    it('sets allowed cookie with no options', async () => {
      window.GovPay.Cookie.setCookie('gov_pay_cookie_policy', '{"analytics":false}')

      expect(document.cookie).toEqual('gov_pay_cookie_policy={"analytics":false}')
    })

    it('sets allowed cookie with options', async () => {
      window.GovPay.Cookie.setCookie('gov_pay_cookie_policy', '{"analytics":false}', { days: 100 })

      // Annoyingly JS can't retrieve expiry date directly from document.cookie, this is all we can assert
      expect(document.cookie).toEqual('gov_pay_cookie_policy={"analytics":false}')
    })
  })

  describe('getConsentCookie', () => {
    afterEach(() => {
      // Delete consent cookie
      document.cookie = 'gov_pay_cookie_policy=;expires=Thu, 01 Jan 1970 00:00:00 UTC'
    })

    it('returns null if consent cookie not present', async () => {
      expect(window.GovPay.Cookie.getConsentCookie()).toEqual(null)
    })

    it('returns consent cookie object if present', async () => {
      document.cookie = 'gov_pay_cookie_policy={"analytics":false}'

      expect(window.GovPay.Cookie.getConsentCookie()).toEqual({ analytics: false })
    })
  })

  describe('setConsentCookie', () => {
    afterEach(() => {
      // Delete consent cookie
      document.cookie = 'gov_pay_cookie_policy=;expires=Thu, 01 Jan 1970 00:00:00 UTC'
    })

    describe('to false', () => {
      it('changes existing cookie value to false', async () => {
        document.cookie = 'gov_pay_cookie_policy={"analytics":true};'

        window.GovPay.Cookie.setConsentCookie({ analytics: false })

        expect(document.cookie).toEqual('gov_pay_cookie_policy={"analytics":false}')
      })

      it('deletes existing analytics cookies', async () => {
        document.cookie = '_ga=test;_gid=test;_gat_govuk_shared=test'

        window.GovPay.Cookie.setConsentCookie({ analytics: false })

        expect(document.cookie).toEqual('gov_pay_cookie_policy={"analytics":false}')
        // Make sure those analytics cookies are definitely gone
        expect(window.GovPay.Cookie.getCookie('_ga')).toEqual(null)
        expect(window.GovPay.Cookie.getCookie('_gid')).toEqual(null)
        expect(window.GovPay.Cookie.getCookie('_gat_govuk_shared')).toEqual(null)
      })
    })

    describe('to true', () => {
      it('sets existing cookie policy cookie to true', async () => {
        document.cookie = 'gov_pay_cookie_policy={"analytics":false};'

        window.GovPay.Cookie.setConsentCookie({ analytics: true })

        expect(document.cookie).toEqual('gov_pay_cookie_policy={"analytics":true}')
      })
    })
  })
})
