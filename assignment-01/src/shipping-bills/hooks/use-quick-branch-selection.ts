
import { useCallback } from 'react'
import { Branch, ShippingBillFormValues } from '../models/model'
import { QuickBranch } from '../components/quick-party-dialogs'

interface UseQuickBranchSelectionProps {
  setValue: (name: any, value: any, options?: any) => void
  quickBranch: QuickBranch | null
}

export function useQuickBranchSelection({ setValue, quickBranch }: UseQuickBranchSelectionProps) {
  const handleQuickBranchSaved = useCallback(
    (branch: Branch) => {
      if (!quickBranch) return

      setValue(quickBranch.branchName, String(branch.id), { shouldValidate: true })
    },
    [quickBranch, setValue]
  )

  return { handleQuickBranchSaved }
}
