import { useSyncExternalStore } from 'react'
import type { Branch, Business, Exporter, SavedBill, ShippingBillFormValues } from './models/model'
import { toShippingBillPayload } from './models/model'
import { loadDemoData, persistDemoData } from './data/demo-storage'
import type { DemoData } from './data/demo-storage'

let snapshot: DemoData = loadDemoData()
const listeners = new Set<() => void>()

function publish(next: DemoData) {
  snapshot = next
  persistDemoData(next)
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  return snapshot
}


export function getDemoData(): DemoData {
  return snapshot
}


export function useDemoData() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

export function getExporters(): Exporter[] {
  return snapshot.exporters
}

export function getBusinesses(): Business[] {
  return snapshot.businesses
}

export function getBills(): SavedBill[] {
  return snapshot.bills
}

export function getBillById(id: number): SavedBill | undefined {
  return snapshot.bills.find((bill) => bill.id === id)
}

export function saveBill(values: ShippingBillFormValues, id?: number): SavedBill {
  const payload = toShippingBillPayload(values)
  const now = new Date().toISOString()

  if (id !== undefined) {
    const existingBill = snapshot.bills.find((bill) => bill.id === id)

    if (existingBill) {
      const updatedBill: SavedBill = {
        ...existingBill,
        values,
        payload,
        updated: now
      }

      publish({
        ...snapshot,
        bills: snapshot.bills.map((bill) =>
          bill.id === id ? updatedBill : bill
        )
      })

      return updatedBill
    }
  }

  const nextId = Math.max(0, ...snapshot.bills.map((bill) => bill.id)) + 1

  const newBill: SavedBill = {
    id: nextId,
    created: now,
    updated: now,
    values,
    payload
  }

  publish({
    ...snapshot,
    bills: [...snapshot.bills, newBill]
  })

  return newBill
}

export function deleteBill(id: number) {
  publish({
    ...snapshot,
    bills: snapshot.bills.filter((bill) => bill.id !== id)
  })
}

export function getExporterById(id: number): Exporter | undefined {
  return snapshot.exporters.find((exporter) => exporter.id === id)
}

export function getBusinessById(id: number): Business | undefined {
  return snapshot.businesses.find((business) => business.id === id)
}

export function getBranchesByExporterId(exporterId: number): Branch[] {
  return getExporterById(exporterId)?.branches ?? []
}



export function saveExporter(exporter: Exporter): Exporter {
  const existing = snapshot.exporters.find((item) => item.id === exporter.id)

  const savedExporter: Exporter = {
    ...exporter,
    id: exporter.id || Math.max(0, ...snapshot.exporters.map((item) => item.id)) + 1
  }

  publish({
    ...snapshot,
    exporters: existing
      ? snapshot.exporters.map((item) =>
          item.id === existing.id ? savedExporter : item
        )
      : [...snapshot.exporters, savedExporter]
  })

  return savedExporter
}

export function saveBusiness(business: Business): Business {
  const existing = snapshot.businesses.find((item) => item.id === business.id)

  const savedBusiness: Business = {
    ...business,
    id: business.id || Math.max(0, ...snapshot.businesses.map((item) => item.id)) + 1
  }

  publish({
    ...snapshot,
    businesses: existing
      ? snapshot.businesses.map((item) =>
          item.id === existing.id ? savedBusiness : item
        )
      : [...snapshot.businesses, savedBusiness]
  })

  return savedBusiness
}



export function saveBranch(
  kind: 'exporter' | 'business',
  parentId: number,
  branch: Branch
): Branch {
  let savedBranch = branch

  if (kind === 'exporter') {
    publish({
      ...snapshot,
      exporters: snapshot.exporters.map((exporter) => {
        if (exporter.id !== parentId) return exporter

        const exists = exporter.branches.some((item) => item.id === branch.id)

        const branches = exists
          ? exporter.branches.map((item) =>
              item.id === branch.id ? branch : item
            )
          : [...exporter.branches, branch]

        return { ...exporter, branches }
      })
    })
  } else {
    publish({
      ...snapshot,
      businesses: snapshot.businesses.map((business) => {
        if (business.id !== parentId) return business

        const exists = business.branches.some((item) => item.id === branch.id)

        const branches = exists
          ? business.branches.map((item) =>
              item.id === branch.id ? branch : item
            )
          : [...business.branches, branch]

        return { ...business, branches }
      })
    })
  }

  return savedBranch
}

