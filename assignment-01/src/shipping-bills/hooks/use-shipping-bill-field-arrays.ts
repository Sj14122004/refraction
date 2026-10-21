
import { useFieldArray } from 'core/form'
import { emptyInvoice } from '../models/model'

interface UseShippingBillFieldArraysProps {
  control: Parameters<typeof useFieldArray>[0]['control']
}

export function useShippingBillFieldArrays({ control }: UseShippingBillFieldArraysProps) {
  const {
    fields: invoices,
    append: addInvoice,
    remove: removeInvoice
  } = useFieldArray({ control, name: 'invoices' })

  const {
    fields: containers,
    append: addContainer,
    remove: removeContainer
  } = useFieldArray({ control, name: 'containers' })

  const {
    fields: packingRanges,
    append: addPackingRange,
    remove: removePackingRange
  } = useFieldArray({ control, name: 'packingRanges' })

  return {
    invoices,
    addInvoice: () => addInvoice(emptyInvoice()),
    removeInvoice,
    containers,
    addContainer: () => addContainer({ containerNumber: '' }),
    removeContainer,
    packingRanges,
    addPackingRange: () => addPackingRange({ packingNumberFrom: '', packingNumberTo: '' }),
    removePackingRange
  }
}
