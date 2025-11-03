import { AdminHeader } from "@/components/admin/admin-header"
import { CustomerManager } from "@/components/admin/customer-manager"

export default function CustomersPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-serif text-3xl">Customer Management</h1>
        </div>
        <CustomerManager />
      </div>
    </div>
  )
}
