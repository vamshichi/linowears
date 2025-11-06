
import { AdminSidebar } from "@/components/admin/admin-header"
import { InventoryManager } from "@/components/admin/inventory-manager"

export default function InventoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 bg-muted/30 transition-all duration-300 md:ml-64 ml-20 mx-10 mt-10">
        <div className="flex justify-between items-center mb-8 mx-10">
          <h1 className="font-serif text-3xl">Inventory Management</h1>
        </div>
        <div className="mx-10">
        <InventoryManager />
        </div>
      </div>
    </div>
  )
}
