import { AdminHeader } from "@/components/admin/admin-header"
import { InventoryManager } from "@/components/admin/inventory-manager"

export default function InventoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-serif text-3xl">Inventory Management</h1>
        </div>
        <InventoryManager />
      </div>
    </div>
  )
}
