
import { useMemo } from 'react'
import { Business, ShippingBillFormValues } from '../models/model'

interface UseShippingBillPartiesProps {
  businesses: Business[]
  values: ShippingBillFormValues
}

export function useShippingBillParties({ businesses, values }: UseShippingBillPartiesProps) {
  const consigneeOptions = useMemo(
    () =>
      businesses.filter(
        (business) => business.isConsignee || String(business.id) === values.consigneeId
      ),
    [businesses, values.consigneeId]
  )

  return { consigneeOptions }
}
