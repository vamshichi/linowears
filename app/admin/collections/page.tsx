export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Suspense } from "react"
import { CollectionManager } from "@/components/admin/collection-manager"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { AdminSidebar } from "@/components/admin/admin-header"

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 bg-muted/30 transition-all duration-300 md:ml-64 ml-20 mx-10 mt-10">
        <div className="flex items-center justify-between mb-8 mx-10">
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

        <div className="mx-10">
          <Suspense fallback={<div>Loading collections...</div>}>
            <CollectionManager />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
