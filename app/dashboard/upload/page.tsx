'use client'

import { motion } from 'framer-motion'
import { Upload, FileText, X, AlertCircle } from 'lucide-react'
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [summary, setSummary] = useState<string | null>(null)

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
    setIsLoading(true)
    setApiError(null)
    
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze document')
      }

      setSummary(data.summary)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze document. Please try again.'
      setApiError(errorMessage)
      console.error('Analysis error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setSelectedFile(null)
    setSummary(null)
    setFileError(null)
    setApiError(null)
  }


  return (
    <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl mx-auto">
      {/* Header */}
      <motion.div variants={item} className="mb-8">
        <h1 className="text-display text-3xl text-white mb-1">Upload Document</h1>
        <p className="text-sm text-text-dim">Upload a document for AI-powered analysis. Supported: PDF, DOCX, TXT</p>
      </motion.div>

      {/* Show upload form if no summary yet */}
      {!summary && (
        <>
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
                  disabled={isLoading}
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
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                    Analyzing your document...
                  </>
                ) : (
                  <>
                    <Upload size={16} />
                    Analyze Document
                  </>
                )}
              </motion.button>
            </motion.div>
          )}

          {/* Errors */}
          {(apiError || fileError) && (
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
              {apiError || fileError}
            </motion.div>
          )}
        </>
      )}

      {/* Summary Results */}
      {summary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Summary Card */}
          <motion.div
            variants={item}
            className="p-6 rounded-xl"
            style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <h2 className="text-xl font-semibold text-white mb-6">Analysis Results</h2>
            <div className="prose prose-invert max-w-none text-sm text-text-secondary space-y-4">
              {summary.split('\n\n').map((section, idx) => (
                <div key={idx}>
                  {section.includes('##') ? (
                    <>
                      <h3 className="text-base font-semibold text-white mt-4 mb-2">
                        {section.split('\n')[0].replace(/^#+\s*/, '')}
                      </h3>
                      <p className="text-sm text-text-secondary whitespace-pre-wrap">
                        {section.split('\n').slice(1).join('\n').trim()}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-text-secondary whitespace-pre-wrap">{section}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Upload Another Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleReset}
            className="w-full py-3 rounded-lg bg-accent-emerald text-black font-semibold text-sm flex items-center justify-center gap-2 transition-all"
            style={{ boxShadow: '0 0 20px rgba(5, 150, 105, 0.15)' }}
          >
            <Upload size={16} />
            Upload Another Document
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  )
}
