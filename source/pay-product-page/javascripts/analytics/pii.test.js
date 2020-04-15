/**
 * @jest-environment jsdom
 */
beforeAll(() => {
  // add the script GA looks for in the document
  document.body.appendChild(document.createElement('script'))
  require('./pii')
})

beforeEach(() => {
  // Set up mock
  window.ga = jest.fn()
})

afterEach(() => {
  window.ga.mockClear()
})

describe('stripPII', () => {
  it('strips email addresses from strings', () => {
    const results = window.GovPay.Pii.stripPII('this is an@email.com address')
    expect(results).toEqual('this is [email] address')
  })

  it('strips email addresses from objects', () => {
    const obj = {
      email: 'this is an@email.com address',
      another: 'key'
    }

    const strippedObj = {
      email: 'this is [email] address',
      another: 'key'
    }

    const results = window.GovPay.Pii.stripPII(obj)
    expect(results).toEqual(strippedObj)
  })

  it('strips email addresses from arrays', () => {
    const arr = [
      'this is an@email.com address',
      'this is another item'
    ]

    const strippedArr = [
      'this is [email] address',
      'this is another item'
    ]

    const results = window.GovPay.Pii.stripPII(arr)
    expect(results).toEqual(strippedArr)
  })
})
