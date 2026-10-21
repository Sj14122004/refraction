import { shippingBillApi } from '../api/shipping-bill-api'
import { normalizeApiBills } from '../api/shipping-bill-mappers'
import { API_SEED_SHIPPING_BILLS } from '../data/demo-seed'
import { createFlatFileBlob, getDownloadFilename, triggerBlobDownload } from '../export/flat-file-download'
import { generateFlatFileContent } from '../export/flat-file-generator'
import { SavedBill, ShippingBillFormValues } from '../models/model'

let internalBills: SavedBill[] = normalizeApiBills(API_SEED_SHIPPING_BILLS)

export const shippingBillService = {
  getInitialBills(): SavedBill[] {
    return internalBills
  },

  getById(id: string | number): SavedBill | undefined {
    return internalBills.find((bill) => String(bill.id) === String(id))
  },

  async list(): Promise<SavedBill[]> {
    try {
      const data = await shippingBillApi.list()
      const normalized = normalizeApiBills(data)

      if (normalized.length > 0) {
        internalBills = normalized
        return normalized
      }
    } catch {
      // Fall back to the in-memory seed records when the API is unavailable.
    }

    return internalBills
  },

  async getFlatFile(id: string | number) {
    return shippingBillApi.getFlatFile(id)
  },

  async downloadFlatFile(
    id: string | number,
    billData?: SavedBill,
    fallbackFilename?: string
  ): Promise<{ source: 'api' | 'local' }> {
    let filename = fallbackFilename || `shipping_bill_${id}.sb`

    try {
      const response = await shippingBillApi.downloadFlatFile(id)

      if (response.ok) {
        const contentType = response.headers.get('content-type') || ''
        const disposition = response.headers.get('content-disposition')

        filename = getDownloadFilename(disposition, filename)

        let blob: Blob

        if (contentType.includes('application/json')) {
          const json = await response.json()
          const content =
            typeof json === 'string' ? json : json.file || json.content || json.data || JSON.stringify(json, null, 2)

          blob = createFlatFileBlob(content)
        } else {
          blob = await response.blob()
        }

        triggerBlobDownload(blob, filename)
        return { source: 'api' }
      }
    } catch {
      // Fall back to local generation if the API is unavailable.
    }

    if (billData) {
      const flatFileContent = generateFlatFileContent(billData)
      const blob = createFlatFileBlob(flatFileContent)
      const safeJob = billData.values.jobNumber || billData.id

      triggerBlobDownload(blob, `shipping_bill_${safeJob}.sb`)
      return { source: 'local' }
    }

    throw new Error('Backend server is offline and no local bill data was found.')
  },

  async upsert(values: ShippingBillFormValues) {
    return shippingBillApi.upsert(values)
  }
}
