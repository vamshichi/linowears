import { AdminHeader } from "@/components/admin/admin-header"
import { NewsletterManager } from "@/components/admin/newsletter-manager"

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-serif text-3xl">Newsletter Subscribers</h1>
        </div>
        <NewsletterManager />
      </div>
    </div>
  )
}
