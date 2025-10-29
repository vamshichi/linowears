import { AdminHeader } from "@/components/admin/admin-header"
import { ContentManager } from "@/components/admin/content-manager"

export default function AdminContentPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      <AdminHeader />
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Content Management</h1>
          <p className="text-muted-foreground">Manage homepage hero, features, and site settings</p>
        </div>
        <ContentManager />
      </div>
    </div>
  )
}
