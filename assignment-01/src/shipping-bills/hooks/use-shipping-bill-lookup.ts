
import { useDemoData } from '../demo-store'
import { shippingBillService } from '../services/shipping-bill-service'

export function useShippingBillLookup(id?: string) {
  const { bills } = useDemoData()

  const bill = id
    ? bills.find((item) => item.id === Number(id)) || shippingBillService.getById(id)
    : undefined

  return {
    bill,
    isNotFound: Boolean(id && !bill),
  }
}
