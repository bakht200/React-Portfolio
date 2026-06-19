export const INDUSTRY_CATEGORIES = [
  { id: 'healthcare', label: 'Healthcare & HIPAA' },
  { id: 'ai-products', label: 'AI Products' },
  { id: 'hrms', label: 'HRMS & HCM' },
  { id: 'fintech', label: 'Fintech' },
  { id: 'ecommerce', label: 'E-Commerce' },
  { id: 'inventory', label: 'Inventory & Ops' },
]

export const FILTER_CATEGORIES = [
  { id: 'all', label: 'All' },
  ...INDUSTRY_CATEGORIES,
]

export const COLLAPSED_ITEM_COUNT = 3

export function getCategoryLabel(categoryId) {
  return (
    INDUSTRY_CATEGORIES.find((category) => category.id === categoryId)?.label ??
    categoryId
  )
}
