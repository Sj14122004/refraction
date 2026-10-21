
import { useState } from 'react'
import { navigate } from 'core/routing'
import { toast } from 'core/toast-manager'
import { routes } from '@/shared/route-paths'
import { saveBill } from '../demo-store'
import { shippingBillService } from '../services/shipping-bill-service'
import { SavedBill, ShippingBillFormValues } from '../models/model'

interface UseShippingBillActionsProps {
  bill?: SavedBill
}

export function useShippingBillActions({ bill }: UseShippingBillActionsProps) {
  const [draftId, setDraftId] = useState<number | undefined>(bill?.id)

  function saveDraft(values: ShippingBillFormValues) {
    const saved = saveBill(values, draftId)
    setDraftId(saved.id)
    return saved
  }

  async function handleSave(values: ShippingBillFormValues) {
    try {
      const saved = saveDraft(values)

      try {
        await shippingBillService.upsert(values)
      } catch (error) {
        console.log('Backend API sync notice (saved locally):', error)
      }

      toast.success(bill ? 'Shipping bill updated' : 'Shipping bill created')
      navigate(routes.toShippingBillEdit(saved.id))
    } catch (error) {
      console.error('Error saving shipping bill:', error)
      toast.error('Failed to save shipping bill')
    }
  }

  function handlePrevious(values: ShippingBillFormValues, activeTab: string, setActiveTab: (tab: string) => void) {
    saveDraft(values)
    setActiveTab(activeTab === 'documents' ? 'invoices' : 'details')
  }

  function handleSaveAndNext(
    values: ShippingBillFormValues,
    activeTab: string,
    setActiveTab: (tab: string) => void
  ) {
    const saved = saveDraft(values)
    toast.success('Details saved')
    setActiveTab(activeTab === 'details' ? 'invoices' : 'documents')
    return saved
  }

  function handleCancel() {
    navigate(routes.dashboard)
  }

  return {
    draftId,
    saveDraft,
    handleSave,
    handlePrevious,
    handleSaveAndNext,
    handleCancel
  }
}
