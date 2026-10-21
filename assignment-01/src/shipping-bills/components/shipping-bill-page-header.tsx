interface ShippingBillPageHeaderProps {
  billId?: number
  onBack: () => void
}

export function ShippingBillPageHeader({ billId, onBack }: ShippingBillPageHeaderProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <button className="mb-2 text-sm text-gray-500 hover:underline" onClick={onBack}>
          ← Shipping bills
        </button>
        <h1 className="text-2xl font-semibold text-gray-950">
          {billId != null ? `Edit shipping bill #${billId}` : 'New shipping bill'}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Enter the everyday details first. Open advanced sections only when needed.
        </p>
      </div>
    </div>
  )
}
