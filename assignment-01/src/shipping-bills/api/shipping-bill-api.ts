import { ShippingBillFormValues } from '../models/model'
import { toHttpShippingBillPayload } from './shipping-bill-mappers'

const BASE_URL = import.meta.env.VITE_API_URL || ''
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN || ''}`
}

export const shippingBillApi = {
  async list(): Promise<unknown> {
    const response = await fetch(`${BASE_URL}/api/shipping-bills`, {
      method: 'GET',
      headers: DEFAULT_HEADERS
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch shipping bills: ${response.status} ${response.statusText}`)
    }

    return response.json()
  },

  async getFlatFile(id: string | number): Promise<unknown> {
    const response = await fetch(`${BASE_URL}/api/shipping-bills/${id}/flat-file`, {
      method: 'GET',
      headers: DEFAULT_HEADERS
    })

    if (!response.ok) {
      throw new Error(`Failed to get flat file: ${response.status} ${response.statusText}`)
    }

    const contentType = response.headers.get('content-type') || ''

    return contentType.includes('application/json') ? response.json() : response.text()
  },

  async downloadFlatFile(id: string | number): Promise<Response> {
    return fetch(`${BASE_URL}/api/shipping-bills/${id}/flat-file`, {
      method: 'GET',
      headers: {
        Accept: '*/*',
        Authorization: DEFAULT_HEADERS.Authorization
      }
    })
  },

  async upsert(values: ShippingBillFormValues): Promise<unknown> {
    const payload = toHttpShippingBillPayload(values)
    const response = await fetch(`${BASE_URL}/api/shipping-bills`, {
      method: 'POST',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error(`Failed to save shipping bill: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }
}
