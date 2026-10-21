
import { useForm } from 'core/form'
import { billSchema } from '../validation/bill-schema'
import { emptyBill, SavedBill } from '../models/model'

export function useShippingBillEditor(bill?: SavedBill) {
  const formCtx = useForm(billSchema, {
    defaultValues: bill?.values ?? emptyBill(),
  })

  const { setValue, formState } = formCtx.hooks
  const values = formCtx.hooks.watch()

  return {
    formCtx,
    setValue,
    formState,
    values,
  }
}
