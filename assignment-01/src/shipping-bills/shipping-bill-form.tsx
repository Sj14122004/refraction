
import { routes } from '@/shared/route-paths'
import { Form } from 'core/form/components'
import { navigate, useParams } from 'core/routing'
import { Tabs, TabsList, TabsTrigger } from 'ui/interactive/tabs'
import { useDemoData } from './demo-store'
import { useMarksAndNumbers } from './hooks/use-marks-and-numbers'
import { useQuickPartySelection } from './hooks/use-quick-party-selection'
import { useQuickBranchSelection } from './hooks/use-quick-branch-selection'
import { useQuickPartyDialogs } from './hooks/use-quick-party-dialogs'
import { useShippingBillTabs } from './hooks/use-shipping-bill-tabs'
import { useShippingBillActions } from './hooks/use-shipping-bill-actions'
import { useShippingBillEditor } from './hooks/use-shipping-bill-editor'
import { useShippingBillLookup } from './hooks/use-shipping-bill-lookup'
import { useShippingBillValidation } from './error-handling/use-shipping-bill-validation'
import { SavedBill } from './models/model'
import { WorkflowSteps } from './components/workflow-steps'
import { ShippingBillPageHeader } from './components/shipping-bill-page-header'
import { ShippingBillFormNavigation } from './components/shipping-bill-form-navigation'
import { QuickPartyDialogs } from './components/quick-party-dialogs'
import { ShippingBillTabPanels } from './components/shipping-bill-tab-panels'
import { ShippingBillNotFound } from './components/shipping-bill-not-found'

function BillEditor({ bill }: { bill?: SavedBill }) {
  const { exporters, businesses } = useDemoData()
  const { formCtx, setValue, formState, values } = useShippingBillEditor(bill)
  const { activeTab, setActiveTab } = useShippingBillTabs()

  const {
    quickAdd,
    quickBranch,
    openExporter,
    openConsignee,
    openBusiness,
    openExporterBranch,
    openConsigneeBranch,
    openBusinessBranch,
    closeAdd,
    closeBranch,
  } = useQuickPartyDialogs()

  useShippingBillValidation({
    submitCount: formState.submitCount,
    errors: formState.errors,
    onTabChange: setActiveTab,
  })

  const { handleSave, handlePrevious, handleSaveAndNext } = useShippingBillActions({ bill })
  const { handleQuickSaved } = useQuickPartySelection({ setValue, quickAdd })
  const { handleQuickBranchSaved } = useQuickBranchSelection({ setValue, quickBranch })

  const {
    options: marksAndNumbersOptions,
    isLoading: marksAndNumbersLoading,
  } = useMarksAndNumbers({
    exporterId: values.exporterId,
    setValue,
  })

  return (
    <div className="space-y-5">
      <ShippingBillPageHeader billId={bill?.id} onBack={() => navigate(routes.dashboard)} />
      <WorkflowSteps />

      <Form ctx={formCtx} handleSubmit={handleSave} className="space-y-5">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(String(value))}>
          <TabsList className="flex w-full justify-start overflow-x-auto">
            <TabsTrigger value="details">1. Details</TabsTrigger>
            <TabsTrigger value="invoices">2. Invoices &amp; goods</TabsTrigger>
            <TabsTrigger value="documents">3. Others</TabsTrigger>
          </TabsList>

          <ShippingBillTabPanels
            formCtx={formCtx}
            activeTab={activeTab}
            exporters={exporters}
            businesses={businesses}
            values={values}
            marksAndNumbersOptions={marksAndNumbersOptions}
            marksAndNumbersLoading={marksAndNumbersLoading}
            onQuickAddExporter={openExporter}
            onQuickAddConsignee={openConsignee}
            onAddExporterBranch={openExporterBranch}
            onAddConsigneeBranch={openConsigneeBranch}
            openBusiness={openBusiness}
            openBusinessBranch={openBusinessBranch}
          />
        </Tabs>

        <ShippingBillFormNavigation
          activeTab={activeTab}
          getValues={formCtx.hooks.getValues}
          onCancel={() => navigate(routes.dashboard)}
          onPrevious={handlePrevious}
          onSaveAndNext={handleSaveAndNext}
          setActiveTab={setActiveTab}
        />
      </Form>

      <QuickPartyDialogs
        quickAdd={quickAdd}
        quickBranch={quickBranch}
        onCloseAdd={closeAdd}
        onSavedAdd={handleQuickSaved}
        onCloseBranch={closeBranch}
        onSavedBranch={handleQuickBranchSaved}
      />
    </div>
  )
}

export default function ShippingBillPage() {
  const { id } = useParams<{ id?: string }>()
  const { bill, isNotFound } = useShippingBillLookup(id)

  if (isNotFound) return <ShippingBillNotFound />

  return <BillEditor key={id ?? 'new'} bill={bill} />
}
