import { toast } from 'core/toast-manager'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { invoiceTotal, SavedBill } from '../models/model'
import { shippingBillService } from '../services/shipping-bill-service'

export function useShippingBillDashboard() {
  const [bills, setBills] = useState<SavedBill[]>(() => shippingBillService.getInitialBills())
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [downloadingId, setDownloadingId] = useState<number | null>(null)

  const fetchBills = useCallback(async () => {
    setIsLoading(true)
    try {
      const remoteBills = await shippingBillService.list()
      if (remoteBills && remoteBills.length > 0) {
        setBills(remoteBills)
        toast.success(`Loaded ${remoteBills.length} shipping bills`)
      }
    } catch (err: unknown) {
      console.warn('Backend API listing notice:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void fetchBills()
  }, [fetchBills])

  const handleDownloadFlatFile = useCallback(async (bill: SavedBill) => {
    try {
      setDownloadingId(bill.id)
      const res = await shippingBillService.downloadFlatFile(bill.id, bill)
      if (res.source === 'api') {
        toast.success('Flat file downloaded from backend API')
      } else {
        toast.success(`Flat file (.sb) generated and downloaded for #${bill.values.jobNumber || bill.id}`)
      }
    } catch (err: unknown) {
      console.warn('Flat file notice:', err)
      toast.error('Failed to generate flat file')
    } finally {
      setDownloadingId(null)
    }
  }, [])

  const filteredBills = useMemo(() => {
    const query = search.toLowerCase()
    return bills
      .filter((bill) => {
        const exporter = bill.values.exporterName || ''
        const consignee = bill.values.consigneeName || ''
        return [
          bill.id,
          bill.values.jobNumber,
          exporter,
          consignee,
          ...bill.values.invoices.map((invoice) => invoice.invoiceNumber)
        ]
          .join(' ')
          .toLowerCase()
          .includes(query)
      })
      .sort((a, b) => {
        const timeA = a.updated ? new Date(a.updated).getTime() : 0
        const timeB = b.updated ? new Date(b.updated).getTime() : 0
        return (isNaN(timeB) ? 0 : timeB) - (isNaN(timeA) ? 0 : timeA)
      })
  }, [bills, search])

  const uniqueExportersCount = useMemo(
    () => new Set(bills.map((bill) => bill.values.exporterName).filter(Boolean)).size,
    [bills]
  )

  const uniqueConsigneesCount = useMemo(
    () => new Set(bills.map((bill) => bill.values.consigneeName).filter(Boolean)).size,
    [bills]
  )

  const getInvoiceTotal = useCallback(
    (bill: SavedBill) => bill.values.invoices.reduce((sum, invoice) => sum + invoiceTotal(invoice), 0),
    []
  )

  return {
    bills,
    search,
    setSearch,
    isLoading,
    downloadingId,
    fetchBills,
    handleDownloadFlatFile,
    filteredBills,
    uniqueExportersCount,
    uniqueConsigneesCount,
    getInvoiceTotal
  }
}
