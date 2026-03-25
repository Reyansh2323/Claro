'use client'

import { useRouter } from 'next/navigation'
import { FileUploader } from '@/components/upload/FileUploader'
import { useUpload } from '@/hooks/useUpload'
import { Card } from '@/components/ui/Card'
import { CheckCircle2 } from 'lucide-react'

export default function UploadPage() {
  const router = useRouter()
  const { uploadDocument, isLoading, error } = useUpload()

  const handleUpload = async (file: File) => {
    try {
      await uploadDocument(file)
      // Redirect to dashboard after successful upload
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
    } catch (err) {
      console.error('Upload error:', err)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-100 mb-2">
          Upload Document
        </h1>
        <p className="text-gray-600 dark:text-slate-300">
          Upload a document for AI-powered analysis. Supported formats: PDF, DOCX, TXT
        </p>
      </div>

      <Card>
        <FileUploader
          onUpload={handleUpload}
          isLoading={isLoading}
          maxSize={50 * 1024 * 1024}
        />

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="mt-8 p-6 rounded-lg border border-brand-border-soft bg-brand-surface-2">
          <h3 className="font-semibold text-brand-text mb-2">
            What happens next?
          </h3>
          <ul className="space-y-1 text-sm text-brand-muted">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-brand-primary mt-1" />
              <span>Your document is uploaded securely</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-brand-primary mt-1" />
              <span>Our AI analyzes it in real-time</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-brand-primary mt-1" />
              <span>Results are ready in seconds (usually 2-5s)</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-brand-primary mt-1" />
              <span>You can ask follow-up questions</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-brand-primary mt-1" />
              <span>Your data is stored securely and never shared</span>
            </li>
          </ul>
        </div>
      </Card>
    </div>
  )
}
