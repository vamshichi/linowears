"use client"

import Link from "next/link"
import { useState } from "react"
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
  Menu,
  X,
  Home,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true)

  const menuItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/products", icon: Package, label: "Products" },
    { href: "/admin/categories", icon: FolderTree, label: "Categories" },
    { href: "/admin/collections", icon: Grid3x3, label: "Collections" },
    { href: "/admin/orders", icon: ShoppingCart, label: "Orders" },
    { href: "/admin/coupons", icon: Tag, label: "Coupons" },
    { href: "/admin/inventory", icon: Warehouse, label: "Inventory" },
    { href: "/admin/content", icon: FileText, label: "Content" },
    { href: "/admin/customers", icon: Users, label: "Customers" },
    { href: "/admin/newsletter", icon: Mail, label: "Newsletter" },
  ]

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen border-r border-border bg-background transition-all duration-300 flex flex-col",
        isOpen ? "w-64" : "w-20"
      )}
    >
      {/* Header / Logo Section */}
      <div className="flex items-center justify-between px-4 h-16 border-b">
        <div className="flex items-center space-x-2 ">
           <Image
                  src="/logo/blacklogo.png"  // change to your image path
                  alt="Linowears"
                  width={120}
                  height={50}
                  className="my-15 py-5"
                />
          {/* <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
            ADMIN
          </span> */}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-1">
        {menuItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
          >
            <Icon className="h-5 w-5 mr-3" />
            {isOpen && <span>{label}</span>}
          </Link>
        ))}
      </nav>

      {/* Footer Section */}
      <div className="border-t p-4 flex flex-col gap-2">
        <Button variant="ghost" size="sm" className="w-full flex items-center justify-start">
          <Settings className="h-5 w-5 mr-2" />
          {isOpen && "Settings"}
        </Button>

        <Button variant="outline" asChild size="sm" className="w-full flex items-center justify-start">
          <Link href="/" className="flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            {isOpen && "View Store"}
          </Link>
        </Button>
      </div>
    </aside>
  )
}
