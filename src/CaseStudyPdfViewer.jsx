import { useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

export default function CaseStudyPdfViewer({ fileUrl, title }) {
  const containerRef = useRef(null)
  const [numPages, setNumPages] = useState(0)
  const [pageWidth, setPageWidth] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const updateWidth = () => {
      const styles = window.getComputedStyle(container)
      const paddingX =
        parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight)
      setPageWidth(Math.max(container.clientWidth - paddingX, 280))
    }

    updateWidth()

    const observer = new ResizeObserver(updateWidth)
    observer.observe(container)
    window.addEventListener('resize', updateWidth)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateWidth)
    }
  }, [])

  return (
    <div className="case-study-pdf-viewer">
      <div className="case-study-pdf-toolbar">
        <p className="case-study-pdf-label">{title}</p>
        {numPages > 0 && (
          <span className="case-study-pdf-count">{numPages} pages</span>
        )}
      </div>

      <div className="case-study-pdf-pages" ref={containerRef}>
        <Document
          file={fileUrl}
          onLoadSuccess={({ numPages: total }) => {
            setNumPages(total)
            setError(null)
          }}
          onLoadError={(loadError) => {
            setError(loadError.message || 'Unable to load PDF.')
          }}
          loading={
            <div className="case-study-pdf-status">Loading document…</div>
          }
          error={
            <div className="case-study-pdf-status case-study-pdf-status--error">
              {error || 'Unable to load PDF.'}
            </div>
          }
        >
          {pageWidth &&
            Array.from({ length: numPages }, (_, index) => (
              <div className="case-study-pdf-page" key={`page-${index + 1}`}>
                <Page
                  pageNumber={index + 1}
                  width={pageWidth}
                  renderTextLayer
                  renderAnnotationLayer
                />
              </div>
            ))}
        </Document>
      </div>
    </div>
  )
}
