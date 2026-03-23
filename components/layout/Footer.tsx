export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-600">
            © {currentYear} Claro. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Privacy
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Terms
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
