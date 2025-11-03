"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, AlertTriangle, Package } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface InventoryItem {
  id: string
  product: {
    id: string
    name: string
    sku: string | null
  }
  size: string | null
  color: string | null
  stock: number
  lowStockThreshold: number
}

export function InventoryManager() {
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    fetchInventory()
  }, [])

  const fetchInventory = async () => {
    try {
      const res = await fetch("/api/admin/inventory")
      if (res.ok) {
        const data = await res.json()
        setInventory(data)
      }
    } catch (error) {
      console.error("Failed to fetch inventory:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateStock = async (variantId: string, newStock: number) => {
    try {
      const res = await fetch(`/api/admin/inventory/${variantId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock: newStock }),
      })

      if (res.ok) {
        toast({
          title: "Success",
          description: "Stock updated successfully",
        })
        fetchInventory()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update stock",
        variant: "destructive",
      })
    }
  }

  const filteredInventory = inventory.filter((item) =>
    item.product.name.toLowerCase().includes(search.toLowerCase()) ||
    item.product.sku?.toLowerCase().includes(search.toLowerCase())
  )

  const lowStockItems = inventory.filter(
    (item) => item.stock <= item.lowStockThreshold
  )

  if (loading) {
    return <div className="text-center py-8">Loading inventory...</div>
  }

  return (
    <div className="space-y-6">
      {lowStockItems.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-amber-800 mb-2">
            <AlertTriangle className="h-5 w-5" />
            <h3 className="font-semibold">Low Stock Alert</h3>
          </div>
          <p className="text-sm text-amber-700">
            {lowStockItems.length} item(s) are running low on stock
          </p>
        </div>
      )}

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by product name or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Variant</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInventory.map((item) => {
              const isLowStock = item.stock <= item.lowStockThreshold
              return (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.product.name}
                  </TableCell>
                  <TableCell>{item.product.sku || "N/A"}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {item.size && <div>Size: {item.size}</div>}
                      {item.color && <div>Color: {item.color}</div>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      {item.stock}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.stock === 0
                          ? "destructive"
                          : isLowStock
                          ? "secondary"
                          : "default"
                      }
                    >
                      {item.stock === 0
                        ? "Out of Stock"
                        : isLowStock
                        ? "Low Stock"
                        : "In Stock"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <UpdateStockDialog
                      item={item}
                      onUpdate={updateStock}
                    />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function UpdateStockDialog({
  item,
  onUpdate,
}: {
  item: InventoryItem
  onUpdate: (variantId: string, newStock: number) => void
}) {
  const [open, setOpen] = useState(false)
  const [stock, setStock] = useState(item.stock)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Update Stock
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Stock</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="font-medium">{item.product.name}</p>
            <p className="text-sm text-muted-foreground">
              {item.size && `Size: ${item.size}`}
              {item.color && ` • Color: ${item.color}`}
            </p>
          </div>
          <div className="space-y-2">
            <Label>New Stock Quantity</Label>
            <Input
              type="number"
              value={stock}
              onChange={(e) => setStock(parseInt(e.target.value) || 0)}
              min="0"
            />
          </div>
          <Button
            onClick={() => {
              onUpdate(item.id, stock)
              setOpen(false)
            }}
            className="w-full"
          >
            Update Stock
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
