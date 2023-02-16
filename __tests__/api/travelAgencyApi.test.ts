/** Api */
import travelAgencyApi from '../../src/api/travelAgencyApi'

describe('Testing on travelAgencyApi', () => {
  test('It should have the default settings', () => {
    expect(travelAgencyApi.defaults.baseURL).toBe(
      process.env.VITE_REACT_APP_API_URL
    )
  })
})
