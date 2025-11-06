
import { AdminSidebar } from "@/components/admin/admin-header"
import { ContentManager } from "@/components/admin/content-manager"

export default function AdminContentPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <AdminSidebar />
      <div className="flex-1 bg-muted/30 transition-all duration-300 md:ml-64 ml-20 mx-10 mt-10">
        <div className="mb-8 mx-10">
          <h1 className="text-3xl font-bold mb-2">Content Management</h1>
          <p className="text-muted-foreground">Manage homepage hero, features, and site settings</p>
        </div>
        <div className="mx-10">
        <ContentManager />
        </div>
      </div>
    </div>
  )
}
