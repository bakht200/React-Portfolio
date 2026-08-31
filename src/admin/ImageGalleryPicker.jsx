import { useEffect, useRef, useState } from 'react'
import { useContent } from '../content/ContentContext'
import { collectContentImages } from '../content/collectContentImages'
import { ASSET_MAP, resolveContentAsset } from '../content/resolveAsset'
import { listPortfolioImages, uploadPortfolioImage } from '../content/supabaseApi'

export default function ImageGalleryPicker({ label, value, onChange, folder = 'about', hint }) {
  const { content } = useContent()
  const inputRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [loadingGallery, setLoadingGallery] = useState(true)
  const [error, setError] = useState('')
  const [gallery, setGallery] = useState([])

  const previewSrc = value ? resolveContentAsset(value) : null

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoadingGallery(true)
      try {
        const uploaded = await listPortfolioImages()
        const fromContent = collectContentImages(content).map((key) => ({
          path: key,
          url: resolveContentAsset(key),
          name: key.split('/').pop() || key,
        }))
        const bundled = Object.keys(ASSET_MAP).map((key) => ({
          path: key,
          url: resolveContentAsset(key),
          name: key,
        }))

        const merged = new Map()
        ;[...uploaded, ...fromContent, ...bundled].forEach((item) => {
          if (item.url) merged.set(item.url, item)
        })

        if (!cancelled) setGallery([...merged.values()])
      } catch (err) {
        if (!cancelled) setError(err.message || 'Could not load gallery')
      } finally {
        if (!cancelled) setLoadingGallery(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [content])

  const handleUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const url = await uploadPortfolioImage(file, folder)
      onChange(url)
      setGallery((prev) => [{ path: url, url, name: file.name }, ...prev])
    } catch (err) {
      setError(err.message || 'Upload failed')
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  return (
    <div className="admin-gallery-field">
      <span className="admin-gallery-label">{label}</span>
      {hint ? <p className="admin-field-hint">{hint}</p> : null}

      {previewSrc ? (
        <div className="admin-gallery-selected">
          <img src={previewSrc} alt="" />
          <span className="admin-gallery-selected-label">Current selection</span>
        </div>
      ) : null}

      <div className="admin-gallery-actions">
        <input
          ref={inputRef}
          type="file"
          accept="image/*,.svg"
          hidden
          disabled={uploading}
          onChange={handleUpload}
        />
        <button
          type="button"
          className="admin-btn admin-btn--primary admin-btn--sm"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? 'Uploading…' : 'Upload new image'}
        </button>
      </div>

      <p className="admin-gallery-heading">Choose from gallery</p>
      {loadingGallery ? (
        <p className="admin-upload-hint">Loading gallery…</p>
      ) : gallery.length === 0 ? (
        <p className="admin-upload-hint">No images yet — upload one above.</p>
      ) : (
        <div className="admin-gallery-grid">
          {gallery.map((item) => {
            const selected = value === item.path || value === item.url
            return (
              <button
                key={item.url}
                type="button"
                className={`admin-gallery-item${selected ? ' admin-gallery-item--selected' : ''}`}
                title={item.name}
                onClick={() => onChange(item.url)}
              >
                <img src={item.url} alt="" />
              </button>
            )
          })}
        </div>
      )}

      {error ? <span className="admin-error">{error}</span> : null}
    </div>
  )
}
