import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  FileText,
  FolderTree,
  Grid3x3,
  Tag,
  Warehouse,
  Mail,
} from "lucide-react"

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/admin" className="flex items-center space-x-2">
          <span className="font-serif text-2xl font-bold tracking-tight">linowares</span>
          <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">ADMIN</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/admin"
            className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-2"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/admin/products"
            className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-2"
          >
            <Package className="h-4 w-4" />
            Products
          </Link>
          <Link
            href="/admin/categories"
            className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-2"
          >
            <FolderTree className="h-4 w-4" />
            Categories
          </Link>
          <Link
            href="/admin/collections"
            className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-2"
          >
            <Grid3x3 className="h-4 w-4" />
            Collections
          </Link>
          <Link
            href="/admin/orders"
            className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Orders
          </Link>
          <Link
            href="/admin/coupons"
            className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-2"
          >
            <Tag className="h-4 w-4" />
            Coupons
          </Link>
          <Link
            href="/admin/inventory"
            className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-2"
          >
            <Warehouse className="h-4 w-4" />
            Inventory
          </Link>
          <Link
            href="/admin/content"
            className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Content
          </Link>
          <Link
            href="/admin/customers"
            className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            Customers
          </Link>
          <Link
            href="/admin/newsletter"
            className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-2"
          >
            <Mail className="h-4 w-4" />
            Newsletter
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">View Store</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
