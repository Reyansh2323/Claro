import Link from 'next/link'
import { Button } from '@/components/shared/Button'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Claro</span>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="secondary" size="md">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="primary" size="md">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Transform Complex Documents Into Clear Insights
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Claro reads tax returns, contracts, insurance policies, and more,
              then explains them in plain English with actionable next steps and
              important deadlines highlighted.
            </p>
            <div className="flex gap-4">
              <Link href="/signup">
                <Button variant="primary" size="lg">
                  Get Started Free
                </Button>
              </Link>
              <a href="#features">
                <Button variant="secondary" size="lg">
                  Learn More
                </Button>
              </a>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-200 to-indigo-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-7xl">📄</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Why Claro?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '📝',
                title: 'Plain English Summaries',
                description:
                  'Get a clear explanation of what your document means for you personally',
              },
              {
                icon: '🔢',
                title: 'Key Numbers Extracted',
                description:
                  'Important figures, dates, and amounts are highlighted and organized',
              },
              {
                icon: '✅',
                title: 'Action Items & Deadlines',
                description:
                  'Know exactly what to do next and when, prioritized by urgency',
              },
              {
                icon: '⚠️',
                title: 'Risk Alerts',
                description:
                  'Flags inconsistencies, missing information, and opportunities',
              },
              {
                icon: '💬',
                title: 'Ask Questions',
                description:
                  'Chat about your documents to clarify confusing sections',
              },
              {
                icon: '📊',
                title: 'Track Over Time',
                description:
                  'Build a profile and get alerts when deadlines approach or conflicts arise',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="card text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to understand your documents better?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands who use Claro to simplify their financial and legal
            life.
          </p>
          <Link href="/signup">
            <Button variant="secondary" size="lg">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 Claro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
