
import { routes } from '@/shared/route-paths'
import { navigate } from 'core/routing'
import { Button } from 'ui/basic/button'

export function ShippingBillNotFound() {
  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">Shipping bill not found</h1>
      <Button onClick={() => navigate(routes.dashboard)}>Back to list</Button>
    </div>
  )
}
