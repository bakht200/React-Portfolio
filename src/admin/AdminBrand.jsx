import logoFallback from '../assets/HG icon.svg'
import { useContent } from '../content/ContentContext'
import { resolveContentAsset } from '../content/resolveAsset'

export default function AdminBrand({ className = '' }) {
  const { content } = useContent()
  const logoSrc = resolveContentAsset(content.site?.logoAsset) || logoFallback

  return (
    <div className={`admin-brand${className ? ` ${className}` : ''}`}>
      <img className="admin-brand-logo" src={logoSrc} alt="" width={32} height={32} />
      <span className="admin-brand-title">Admin</span>
    </div>
  )
}
