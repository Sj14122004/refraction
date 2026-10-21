
import { Tabs, TabsList, TabsTrigger } from 'ui/interactive/tabs'

interface ShippingBillTabsProps {
  activeTab: string
  onTabChange: (value: string) => void
}

export function ShippingBillTabs({ activeTab, onTabChange }: ShippingBillTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={(value) => onTabChange(String(value))}>
      <TabsList className="flex w-full justify-start overflow-x-auto">
        <TabsTrigger value="details">1. Details</TabsTrigger>
        <TabsTrigger value="invoices">2. Invoices & goods</TabsTrigger>
        <TabsTrigger value="documents">3. Others</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
