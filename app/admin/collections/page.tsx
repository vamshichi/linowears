import { Suspense } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { CollectionManager } from "@/components/admin/collection-manager"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-4xl mb-2">Collections</h1>
            <p className="text-muted-foreground">Manage product collections and featured sets</p>
          </div>
          <Link href="/admin/collections/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Collection
            </Button>
          </Link>
        </div>
        <Suspense fallback={<div>Loading collections...</div>}>
          <CollectionManager />
        </Suspense>
      </main>
    </div>
  )
}
