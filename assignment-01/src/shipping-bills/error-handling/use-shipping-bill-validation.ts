import { useEffect } from 'react'
import { toast } from 'core/toast-manager'

interface UseShippingBillValidationOptions {
  submitCount: number
  errors: object
  onTabChange: (tab: string) => void
}

export function useShippingBillValidation({
  submitCount,
  errors,
  onTabChange
}: UseShippingBillValidationOptions) {
  useEffect(() => {
    const validationErrors = errors as Record<string, unknown>

    if (!submitCount || !Object.keys(validationErrors).length) return

    console.log('Form validation errors on submit:', validationErrors)
    toast.error('Please check the required fields')

    const detailsFields = [
      'jobDate',
      'exporterId',
      'exporterBranchId',
      'consigneeId',
      'consigneeBranchId',
      'loadingPort',
      'finalDestinationPort'
    ]

    if (detailsFields.some((field) => field in validationErrors)) {
      onTabChange('details')
    } else if (validationErrors.invoices) {
      onTabChange('invoices')
    } else if (
      validationErrors.containers ||
      validationErrors.packingRanges ||
      validationErrors.documents ||
      validationErrors.licenses
    ) {
      onTabChange('documents')
    }
  }, [submitCount, errors, onTabChange])
}
