import { CollectionForm } from "@/components/admin/collection-form"
import prisma from "@/lib/prisma"
import { notFound } from 'next/navigation'

export default async function EditCollectionPage({
  params,
}: {
  params: { id: string }
}) {
  const collection = await prisma.collection.findUnique({
    where: { id: params.id },
    include: {
      products: {
        select: {
          id: true,
          name: true,
          images: true,
          price: true,
        },
      },
    },
  })

  if (!collection) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="font-serif text-3xl mb-8">Edit Collection</h1>
      <CollectionForm collection={collection} />
    </div>
  )
}
