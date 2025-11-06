import { CustomFitForm } from "@/components/custom-fit/custom-fit-form"
import { SavedMeasurements } from "@/components/custom-fit/saved-measurements"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function CustomFitPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl mb-4 text-foreground">Custom Fit Service</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get the perfect fit with our custom tailoring service. Provide your measurements and we'll create a shirt
              that fits you perfectly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-serif text-xl mb-4">How It Works</h3>
              <ol className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="font-semibold text-foreground">1.</span>
                  <span>Provide your measurements using our detailed guide</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-foreground">2.</span>
                  <span>Save multiple measurement profiles for different fits</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-foreground">3.</span>
                  <span>Select your custom fit option when ordering</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-foreground">4.</span>
                  <span>Receive your perfectly tailored shirt in 2-3 weeks</span>
                </li>
              </ol>
            </div>

            <div className="bg-card p-6 rounded-lg border">
              <h3 className="font-serif text-xl mb-4">Measurement Guide</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <strong className="text-foreground">Chest:</strong> Measure around the fullest part of your chest
                </div>
                <div>
                  <strong className="text-foreground">Waist:</strong> Measure around your natural waistline
                </div>
                <div>
                  <strong className="text-foreground">Shoulder:</strong> Measure from shoulder point to shoulder point
                </div>
                <div>
                  <strong className="text-foreground">Sleeve:</strong> Measure from shoulder to wrist with arm slightly
                  bent
                </div>
                <div>
                  <strong className="text-foreground">Length:</strong> Measure from back of neck to desired hem length
                </div>
                <div>
                  <strong className="text-foreground">Neck:</strong> Measure around the base of your neck
                </div>
              </div>
            </div>
          </div>

          <SavedMeasurements />
          <CustomFitForm />
        </div>
      </div>
      <Footer />
    </div>
  )
}
