import { getSession } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import prisma from "@/lib/prisma"

export async function SavedMeasurements() {
  const session = await getSession()

  if (!session) {
    return null
  }

  const measurements = await prisma.customMeasurement.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" },
  })

  if (!measurements || measurements.length === 0) {
    return null
  }

  return (
    <div className="mb-8">
      <h2 className="font-serif text-2xl mb-4">Your Saved Measurements</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {measurements.map((measurement) => (
          <Card key={measurement.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{measurement.name}</CardTitle>
                  <CardDescription>Saved on {new Date(measurement.createdAt).toLocaleDateString()}</CardDescription>
                </div>
                {measurement.isDefault && <Badge variant="secondary">Default</Badge>}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Chest:</span>{" "}
                  <span className="font-medium">{measurement.chest}"</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Waist:</span>{" "}
                  <span className="font-medium">{measurement.waist}"</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Shoulder:</span>{" "}
                  <span className="font-medium">{measurement.shoulder}"</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Sleeve:</span>{" "}
                  <span className="font-medium">{measurement.sleeveLength}"</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Length:</span>{" "}
                  <span className="font-medium">{measurement.shirtLength}"</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Neck:</span>{" "}
                  <span className="font-medium">{measurement.neck}"</span>
                </div>
              </div>
              {measurement.notes && <p className="mt-3 text-sm text-muted-foreground italic">{measurement.notes}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
