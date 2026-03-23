'use client'

import { useRouter } from 'next/navigation'
import { FileUploader } from '@/components/upload/FileUploader'
import { useUpload } from '@/hooks/useUpload'

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
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Upload Document
        </h1>
        <p className="text-gray-600">
          Upload a document for AI-powered analysis. Supported formats: PDF, DOCX, TXT
        </p>
      </div>

      <div className="card">
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

        <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">
            What happens next?
          </h3>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>✓ Your document is uploaded securely</li>
            <li>✓ Our AI analyzes it in real-time</li>
            <li>✓ Results are ready in seconds (usually 2-5s)</li>
            <li>✓ You can ask follow-up questions</li>
            <li>✓ Your data is stored securely and never shared</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
