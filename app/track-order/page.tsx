import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TrackOrderForm } from "@/components/orders/track-order-form"

export default function TrackOrderPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-bold mb-2">Track Your Order</h1>
            <p className="text-muted-foreground">Enter your order number to track your shipment</p>
          </div>

          <TrackOrderForm />
        </div>
      </main>

      <Footer />
    </div>
  )
}
