import { Button } from 'ui/basic/button'
import { ShippingBillFormValues } from '../models/model'

interface ShippingBillFormNavigationProps {
  activeTab: string
  getValues: () => ShippingBillFormValues
  onCancel: () => void
  onPrevious: (values: ShippingBillFormValues, activeTab: string, setActiveTab: (tab: string) => void) => void
  onSaveAndNext: (values: ShippingBillFormValues, activeTab: string, setActiveTab: (tab: string) => void) => void
  setActiveTab: (tab: string) => void
}

export function ShippingBillFormNavigation({
  activeTab,
  getValues,
  onCancel,
  onPrevious,
  onSaveAndNext,
  setActiveTab
}: ShippingBillFormNavigationProps) {
  return (
    <div className="flex flex-wrap justify-between gap-2 border-t border-gray-200 pt-4">
      <Button variant="outline" type="button" onClick={onCancel}>
        Cancel
      </Button>
      <div className="flex gap-2">
        {activeTab !== 'details' && (
          <Button variant="outline" type="button" onClick={() => onPrevious(getValues(), activeTab, setActiveTab)}>
            Previous
          </Button>
        )}
        {activeTab !== 'documents' ? (
          <Button
            type="button"
            onClick={(event) => {
              event.preventDefault()
              onSaveAndNext(getValues(), activeTab, setActiveTab)
            }}
          >
            Save & Next
          </Button>
        ) : (
          <Button type="submit">Save changes</Button>
        )}
      </div>
    </div>
  )
}
