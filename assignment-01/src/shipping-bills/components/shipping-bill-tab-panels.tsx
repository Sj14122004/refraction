
import { ShippingBillFormValues, Business, Exporter } from '../models/model'
import { useShippingBillFieldArrays } from '../hooks/use-shipping-bill-field-arrays'
import { useShippingBillParties } from '../hooks/use-shipping-bill-parties'
import { ShipmentDetailsSection } from './shipment-details-section'
import { InvoiceListSection } from './invoice-list-section'
import { ContainerAndPackingSection } from './container-and-packing-section'
import { SupportingDocumentsAndLicenses } from './supporting-documents-and-licenses'
import { PersistentTab } from './persistent-tab'

interface ShippingBillTabPanelsProps {
  formCtx: any
  activeTab: string
  exporters: Exporter[]
  businesses: Business[]
  values: ShippingBillFormValues
  marksAndNumbersOptions: any
  marksAndNumbersLoading: boolean
  onQuickAddExporter: () => void
  onQuickAddConsignee: () => void
  onAddExporterBranch: (ownerId: number) => void
  onAddConsigneeBranch: (ownerId: number) => void
  openBusiness: (role: any, invoiceIndex: number, itemIndex?: number) => void
  openBusinessBranch: (ownerId: number, branchName: any) => void
}

export function ShippingBillTabPanels({
  formCtx,
  activeTab,
  exporters,
  businesses,
  values,
  marksAndNumbersOptions,
  marksAndNumbersLoading,
  onQuickAddExporter,
  onQuickAddConsignee,
  onAddExporterBranch,
  onAddConsigneeBranch,
  openBusiness,
  openBusinessBranch
}: ShippingBillTabPanelsProps) {
  const { control } = formCtx.hooks
  const {
    invoices,
    addInvoice,
    removeInvoice,
    containers,
    addContainer,
    removeContainer,
    packingRanges,
    addPackingRange,
    removePackingRange
  } = useShippingBillFieldArrays({ control })

  const { consigneeOptions } = useShippingBillParties({ businesses, values })

  return (
    <>
      <PersistentTab value="details" activeTab={activeTab} className="space-y-4">
        <ShipmentDetailsSection
          formCtx={formCtx}
          values={values}
          exporters={exporters}
          consigneeOptions={consigneeOptions}
          containersLength={containers.length}
          marksAndNumbersOptions={marksAndNumbersOptions}
          marksAndNumbersLoading={marksAndNumbersLoading}
          onQuickAddExporter={onQuickAddExporter}
          onQuickAddConsignee={onQuickAddConsignee}
          onAddExporterBranch={onAddExporterBranch}
          onAddConsigneeBranch={onAddConsigneeBranch}
        />
      </PersistentTab>

      <PersistentTab value="invoices" activeTab={activeTab} className="space-y-4">
        <InvoiceListSection
          formCtx={formCtx}
          invoices={invoices}
          values={values}
          businesses={businesses}
          addInvoice={addInvoice}
          removeInvoice={removeInvoice}
          onQuickAdd={openBusiness}
          onAddBranch={openBusinessBranch}
        />
      </PersistentTab>

      <PersistentTab value="documents" activeTab={activeTab} className="space-y-4">
        <ContainerAndPackingSection
          formCtx={formCtx}
          containers={containers}
          packingRanges={packingRanges}
          addContainer={addContainer}
          removeContainer={removeContainer}
          addPackingRange={addPackingRange}
          removePackingRange={removePackingRange}
        />
        <SupportingDocumentsAndLicenses formCtx={formCtx} />
      </PersistentTab>
    </>
  )
}
