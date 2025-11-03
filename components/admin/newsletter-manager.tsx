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
import { Search, Download, Mail } from 'lucide-react'

interface Subscriber {
  id: string
  email: string
  isActive: boolean
  subscribedAt: string
}

export function NewsletterManager() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    fetchSubscribers()
  }, [])

  const fetchSubscribers = async () => {
    try {
      const res = await fetch("/api/admin/newsletter")
      if (res.ok) {
        const data = await res.json()
        setSubscribers(data)
      }
    } catch (error) {
      console.error("Failed to fetch subscribers:", error)
    } finally {
      setLoading(false)
    }
  }

  const exportSubscribers = () => {
    const csv = [
      ["Email", "Status", "Subscribed Date"],
      ...filteredSubscribers.map((sub) => [
        sub.email,
        sub.isActive ? "Active" : "Inactive",
        new Date(sub.subscribedAt).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `newsletter-subscribers-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
  }

  const filteredSubscribers = subscribers.filter((sub) =>
    sub.email.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return <div className="text-center py-8">Loading subscribers...</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={exportSubscribers} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="border rounded-lg p-4">
          <div className="text-2xl font-bold">{subscribers.length}</div>
          <div className="text-sm text-muted-foreground">Total Subscribers</div>
        </div>
        <div className="border rounded-lg p-4">
          <div className="text-2xl font-bold">
            {subscribers.filter((s) => s.isActive).length}
          </div>
          <div className="text-sm text-muted-foreground">Active</div>
        </div>
        <div className="border rounded-lg p-4">
          <div className="text-2xl font-bold">
            {subscribers.filter((s) => !s.isActive).length}
          </div>
          <div className="text-sm text-muted-foreground">Unsubscribed</div>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Subscribed Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubscribers.map((subscriber) => (
              <TableRow key={subscriber.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {subscriber.email}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={subscriber.isActive ? "default" : "secondary"}
                  >
                    {subscriber.isActive ? "Active" : "Unsubscribed"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(subscriber.subscribedAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredSubscribers.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No subscribers found
        </div>
      )}
    </div>
  )
}
