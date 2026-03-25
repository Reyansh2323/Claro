export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-brand-surface border-t border-brand-border py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-gray-600 dark:text-slate-400">
            © {currentYear} Claro. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm">
            {/* Links removed per request: Privacy, Terms, Support */}
          </div>
        </div>
      </div>
    </footer>
  )
}
