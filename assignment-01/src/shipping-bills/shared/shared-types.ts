import { useForm } from 'core/form'
import type { Business, Exporter, ShippingBillFormValues } from '../models/model'

export type BillFormContext = ReturnType<typeof useForm<ShippingBillFormValues>>

export type BranchPath =
  | 'exporterBranchId'
  | 'consigneeBranchId'
  | `invoices.${number}.buyerBranchId`
  | `invoices.${number}.thirdPartyBranchId`
  | `invoices.${number}.items.${number}.itemThirdPartyBranchId`

export interface AsyncOption {
  value: string
  label: string
  sublabel?: string
}

export type PartyOwnerName =
  | 'exporterId'
  | 'consigneeId'
  | `invoices.${number}.buyerId`
  | `invoices.${number}.thirdPartyId`
  | `invoices.${number}.items.${number}.itemThirdPartyId`

export type PartyKind = 'exporter' | 'business'
export type Party = Exporter | Business