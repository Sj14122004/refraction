
import { useCallback } from 'react'
import { QuickAdd } from '../components/quick-party-dialogs'
import { Branch, Business, Exporter, ShippingBillFormValues } from '../models/model'

interface UseQuickPartySelectionProps {
  setValue: (name: any, value: any, options?: any) => void
  quickAdd: QuickAdd | null
}

export function useQuickPartySelection({ setValue, quickAdd }: UseQuickPartySelectionProps) {
  const handleQuickSaved = useCallback(
    (party: Exporter | Business) => {
      const branchId = party.branches[0]?.id
      if (!quickAdd || !branchId) return

      if (quickAdd.kind === 'exporter') {
        setValue('exporterId', String(party.id), { shouldValidate: true })
        setValue('exporterBranchId', String(branchId), { shouldValidate: true })
      } else if (quickAdd.role === 'consignee') {
        setValue('consigneeId', String(party.id), { shouldValidate: true })
        setValue('consigneeBranchId', String(branchId), { shouldValidate: true })
      } else if (quickAdd.role === 'itemThirdParty' && quickAdd.invoiceIndex != null && quickAdd.itemIndex != null) {
        setValue(`invoices.${quickAdd.invoiceIndex}.items.${quickAdd.itemIndex}.itemThirdPartyId`, String(party.id), {
          shouldValidate: true
        })
        setValue(
          `invoices.${quickAdd.invoiceIndex}.items.${quickAdd.itemIndex}.itemThirdPartyBranchId`,
          String(branchId),
          { shouldValidate: true }
        )
      } else if (quickAdd.invoiceIndex != null) {
        const field = quickAdd.role === 'buyer' ? 'buyer' : 'thirdParty'
        setValue(`invoices.${quickAdd.invoiceIndex}.${field}Id`, String(party.id), { shouldValidate: true })
        setValue(`invoices.${quickAdd.invoiceIndex}.${field}BranchId`, String(branchId), { shouldValidate: true })
      }
    },
    [quickAdd, setValue]
  )

  return { handleQuickSaved }
}
