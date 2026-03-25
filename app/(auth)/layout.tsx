import { GlobalNavbar } from '@/components/layout/GlobalNavbar'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">
      <GlobalNavbar />
      <main className="mt-16 min-h-[calc(100vh-64px)] p-4 sm:p-8">{children}</main>
    </div>
  )
}
