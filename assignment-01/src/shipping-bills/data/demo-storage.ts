import { DEMO_BUSINESSES, DEMO_EXPORTERS } from './demo-party-seed'
import { DEMO_BILLS } from './demo-bill-seed'
import { ShippingBillFormValues } from '../models/model'
import type { Business, Exporter, SavedBill } from '../models/model'

export interface DemoData {
  exporters: Exporter[]
  businesses: Business[]
  bills: SavedBill[]
}

const storageKey = 'export-software-shipping-bills-v2'

export const demoSeed: DemoData = {
  exporters: DEMO_EXPORTERS,
  businesses: DEMO_BUSINESSES,
  bills: DEMO_BILLS
}

export function loadDemoData(): DemoData {
  try {
    const raw = localStorage.getItem(storageKey)

    if (raw) {
      const parsed = JSON.parse(raw) as DemoData

      if (
        Array.isArray(parsed.exporters) &&
        Array.isArray(parsed.businesses) &&
        Array.isArray(parsed.bills)
      ) {
        const existingExporterIds = new Set(parsed.exporters.map((e) => e.id))
        const missingExporters = demoSeed.exporters.filter((e) => !existingExporterIds.has(e.id))

        const existingBusinessIds = new Set(parsed.businesses.map((b) => b.id))
        const missingBusinesses = demoSeed.businesses.filter((b) => !existingBusinessIds.has(b.id))

        return {
          exporters: [...parsed.exporters, ...missingExporters],
          businesses: [...parsed.businesses, ...missingBusinesses],
          bills: parsed.bills.map((bill) => ({
            ...bill,
            values: {
              ...bill.values,
              packingRanges: (bill.values as Partial<ShippingBillFormValues>).packingRanges ?? []
            }
          }))
        }
      }
    }
  } catch {
    // Use sample data when local storage is unavailable or invalid.
  }

  return demoSeed
}

export function persistDemoData(data: DemoData) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(data))
  } catch {
    // Keep the in-memory demo usable when storage is disabled.
  }
}