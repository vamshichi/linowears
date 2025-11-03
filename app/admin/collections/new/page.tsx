export default function NewCollectionPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="font-serif text-3xl mb-8">Create New Collection</h1>
      <CollectionForm />
    </div>
  )
}

import { CollectionForm } from "@/components/admin/collection-form"
