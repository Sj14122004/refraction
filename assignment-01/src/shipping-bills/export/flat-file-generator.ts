import { SavedBill } from '../models/model'

export function generateFlatFileContent(bill: SavedBill): string {
  const lines: string[] = []
  const values = bill as SavedBill & Record<string, unknown>

  lines.push(`SHIPPING BILL NO: ${bill.id}`)
  lines.push(`EXPORTER: ${values.exporterName ?? ''}`)
  lines.push(`DATE: ${values.date ?? ''}`)
  lines.push('')

  return lines.join('\n')
}
