import { GlobalNavbar } from '@/components/layout/GlobalNavbar'
import { Hero } from '@/components/landing/Hero'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { Footer } from '@/components/layout/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">
      <GlobalNavbar />
      <main className="pt-16 fade-in-page">
        <Hero />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  )
}
