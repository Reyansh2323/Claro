'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Upload, FileText, CheckCircle2, X, AlertCircle } from 'lucide-react'
import { useUpload } from '@/hooks/useUpload'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 18 } },
}

export default function UploadPage() {
  const router = useRouter()
  const { uploadDocument, isLoading, error } = useUpload()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)

  const maxSize = 50 * 1024 * 1024

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setFileError(null)
      if (rejectedFiles.length > 0) {
        setFileError('File type or size not supported.')
        return
      }
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        if (file.size > maxSize) {
          setFileError(`File exceeds ${maxSize / 1024 / 1024}MB limit`)
          return
        }
        setSelectedFile(file)
      }
    },
    [maxSize]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
    disabled: isLoading,
  })

  const handleUpload = async () => {
    if (!selectedFile) return
    try {
      await uploadDocument(selectedFile)
      setTimeout(() => router.push('/dashboard'), 1500)
    } catch (err) {
      console.error('Upload error:', err)
    }
  }

  const steps = [
    'Your document is uploaded securely',
    'Our AI analyzes it in real-time',
    'Results are ready in seconds (usually 2-5s)',
    'You can ask follow-up questions',
    'Your data is stored securely and never shared',
  ]

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl mx-auto">
      {/* Header */}
      <motion.div variants={item} className="mb-8">
        <h1 className="text-display text-3xl text-white mb-1">Upload Document</h1>
        <p className="text-sm text-text-dim">Upload a document for AI-powered analysis. Supported: PDF, DOCX, TXT</p>
      </motion.div>

      {/* Drop Zone */}
      <motion.div variants={item}>
        <div
          {...getRootProps()}
          className={`p-10 rounded-xl text-center cursor-pointer transition-all duration-300 ${
            isDragActive ? 'border-accent-cyan' : ''
          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          style={{
            background: isDragActive ? 'rgba(6, 182, 212, 0.05)' : 'rgba(255, 255, 255, 0.02)',
            border: `2px dashed ${isDragActive ? 'rgba(6, 182, 212, 0.4)' : 'rgba(255, 255, 255, 0.08)'}`,
          }}
        >
          <input {...getInputProps()} />
          <Upload size={32} className="text-text-dim mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-secondary mb-2 whitespace-pre-wrap">
            {isDragActive ? 'Drop file here...' : 'Click or drag file to upload'}
          </h3>
          <p className="text-sm text-text-dim">Supports internal or public documents up to 50MB</p>
        </div>
      </motion.div>

      {/* Selected File */}
      {selectedFile && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-5 rounded-xl"
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FileText size={18} className="text-accent-cyan" />
              <div>
                <p className="text-sm text-white font-medium">{selectedFile.name}</p>
                <p className="text-xs text-text-dim">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="p-1 rounded-md text-text-dim hover:text-white hover:bg-white/[0.04] transition-all"
            >
              <X size={16} />
            </button>
          </div>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleUpload}
            disabled={isLoading}
            className="w-full py-3 rounded-lg bg-accent-cyan text-black font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
            style={{ boxShadow: '0 0 20px rgba(6, 182, 212, 0.15)' }}
          >
            {isLoading ? (
              <span className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
            ) : (
              <>
                <Upload size={16} />
                Upload Document
              </>
            )}
          </motion.button>
        </motion.div>
      )}

      {/* Errors */}
      {(error || fileError) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-center gap-2 px-4 py-3 rounded-lg text-sm"
          style={{
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.20)',
            color: '#EF4444',
          }}
        >
          <AlertCircle size={16} />
          {error || fileError}
        </motion.div>
      )}

      {/* What Happens Next */}
      <motion.div
        variants={item}
        className="mt-8 p-6 rounded-xl"
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <h3 className="text-sm font-semibold text-white mb-4">What happens next?</h3>
        <ul className="space-y-2.5">
          {steps.map((step, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <CheckCircle2 size={14} className="text-accent-emerald mt-0.5 flex-shrink-0" />
              <span className="text-xs text-text-muted leading-relaxed">{step}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}
