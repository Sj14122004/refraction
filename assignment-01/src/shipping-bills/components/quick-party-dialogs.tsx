import { BranchDialog, PartyDialog } from '../party-dialogs'
import { Branch, Business, Exporter } from '../models/model'
import type { BranchPath } from '../shared/shared-types'

export interface QuickAdd {
  kind: 'exporter' | 'business'
  role?: 'consignee' | 'buyer' | 'thirdParty' | 'itemThirdParty'
  invoiceIndex?: number
  itemIndex?: number
}

export interface QuickBranch {
  kind: 'exporter' | 'business'
  ownerId: number
  branchName: BranchPath
}

interface QuickPartyDialogsProps {
  quickAdd: QuickAdd | null
  quickBranch: QuickBranch | null
  onCloseAdd: () => void
  onSavedAdd: (party: Exporter | Business) => void
  onCloseBranch: () => void
  onSavedBranch: (branch: Branch) => void
}

export function QuickPartyDialogs({
  quickAdd,
  quickBranch,
  onCloseAdd,
  onSavedAdd,
  onCloseBranch,
  onSavedBranch
}: QuickPartyDialogsProps) {
  return (
    <>
      {quickAdd && (
        <PartyDialog
          key={`${quickAdd.kind}-${quickAdd.role ?? 'exporter'}-${quickAdd.invoiceIndex ?? 0}`}
          kind={quickAdd.kind}
          initialRole={quickAdd.role === 'itemThirdParty' ? 'thirdParty' : quickAdd.role}
          onClose={onCloseAdd}
          onSaved={onSavedAdd}
        />
      )}
      {quickBranch && (
        <BranchDialog
          key={`${quickBranch.kind}-${quickBranch.ownerId}`}
          kind={quickBranch.kind}
          ownerId={quickBranch.ownerId}
          onClose={onCloseBranch}
          onSaved={onSavedBranch}
        />
      )}
    </>
  )
}
