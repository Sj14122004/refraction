
import { useState } from 'react'

export type ShippingBillTab = 'details' | 'invoices' | 'documents'

const SHIPPING_BILL_TABS: ShippingBillTab[] = ['details', 'invoices', 'documents']

export function useShippingBillTabs() {
  const [activeTab, setActiveTabState] = useState<ShippingBillTab>('details')

  function setActiveTab(tab: string) {
    if (SHIPPING_BILL_TABS.includes(tab as ShippingBillTab)) {
      setActiveTabState(tab as ShippingBillTab)
    }
  }

  function goToNextTab() {
    const currentIndex = SHIPPING_BILL_TABS.indexOf(activeTab)
    if (currentIndex < SHIPPING_BILL_TABS.length - 1) {
      setActiveTabState(SHIPPING_BILL_TABS[currentIndex + 1])
    }
  }

  function goToPreviousTab() {
    const currentIndex = SHIPPING_BILL_TABS.indexOf(activeTab)
    if (currentIndex > 0) {
      setActiveTabState(SHIPPING_BILL_TABS[currentIndex - 1])
    }
  }

  return { activeTab, setActiveTab, goToNextTab, goToPreviousTab }
}
