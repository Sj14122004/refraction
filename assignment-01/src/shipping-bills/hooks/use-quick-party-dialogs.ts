
import { useState } from 'react'
import { QuickAdd, QuickBranch } from '../components/quick-party-dialogs'

export function useQuickPartyDialogs() {
  const [quickAdd, setQuickAdd] = useState<QuickAdd | null>(null)
  const [quickBranch, setQuickBranch] = useState<QuickBranch | null>(null)

  function openExporter() {
    setQuickAdd({ kind: 'exporter' })
  }

  function openConsignee() {
    setQuickAdd({ kind: 'business', role: 'consignee' })
  }

  function openBusiness(role: QuickAdd extends infer T ? any : never, invoiceIndex?: number, itemIndex?: number) {
    setQuickAdd({ kind: 'business', role, invoiceIndex, itemIndex })
  }

  function openExporterBranch(ownerId: number) {
    setQuickBranch({ kind: 'exporter', ownerId, branchName: 'exporterBranchId' })
  }

  function openConsigneeBranch(ownerId: number) {
    setQuickBranch({ kind: 'business', ownerId, branchName: 'consigneeBranchId' })
  }

  function openBusinessBranch(ownerId: number, branchName: QuickBranch['branchName']) {
    setQuickBranch({ kind: 'business', ownerId, branchName })
  }

  function closeAdd() {
    setQuickAdd(null)
  }

  function closeBranch() {
    setQuickBranch(null)
  }

  return {
    quickAdd,
    quickBranch,
    openExporter,
    openConsignee,
    openBusiness,
    openExporterBranch,
    openConsigneeBranch,
    openBusinessBranch,
    closeAdd,
    closeBranch
  }
}
