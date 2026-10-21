import type { ReactNode } from 'react'

interface PersistentTabProps {
  value: string
  activeTab: string
  children: ReactNode
  className?: string
}

// Keep fields registered while another tab is open so the full form validates on submit.
export function PersistentTab({ value, activeTab, children, className }: PersistentTabProps) {
  return (
    <div role="tabpanel" hidden={activeTab !== value} className={`mt-3 ${className ?? ''}`}>
      {children}
    </div>
  )
}
