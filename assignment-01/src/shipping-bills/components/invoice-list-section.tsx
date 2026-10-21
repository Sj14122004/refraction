
import { Button } from 'ui/basic/button'
import { InvoiceEditor } from './invoice-editor'
import { emptyInvoice, Business, ShippingBillFormValues } from '../models/model'
import type { BillFormContext } from '../shared/shared-types'

interface InvoiceListSectionProps {
  formCtx: BillFormContext
  invoices: { id: string }[]
  values: ShippingBillFormValues
  businesses: Business[]
  addInvoice: () => void
  removeInvoice: (index: number) => void
  onQuickAdd: (role: any, invoiceIndex: number, itemIndex?: number) => void
  onAddBranch: (ownerId: number, branchName: any) => void
}

export function InvoiceListSection({
  formCtx,
  invoices,
  values,
  businesses,
  addInvoice,
  removeInvoice,
  onQuickAdd,
  onAddBranch
}: InvoiceListSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold">Invoices & goods</h2>
          <p className="text-sm text-gray-500">One invoice and one item are ready to fill in.</p>
        </div>
        <Button variant="outline" onClick={addInvoice}>
          + Add invoice
        </Button>
      </div>
      {invoices.map((field, index) => (
        <InvoiceEditor
          key={field.id}
          formCtx={formCtx}
          index={index}
          invoice={values.invoices[index] ?? emptyInvoice()}
          businesses={businesses}
          onQuickAdd={(role, invoiceIndex, itemIndex) => onQuickAdd(role, invoiceIndex, itemIndex)}
          onAddBranch={(ownerId, branchName) => onAddBranch(ownerId, branchName)}
          onRemove={() => removeInvoice(index)}
          canRemove={invoices.length > 1}
        />
      ))}
    </div>
  )
}
