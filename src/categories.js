import { getContentSnapshot } from './content/contentStore'

export function getCategories() {
  return getContentSnapshot().categories
}

export function getFilterCategories() {
  return [{ id: 'all', label: 'All' }, ...getCategories()]
}

export function getCollapsedItemCount() {
  return getContentSnapshot().collapsedItemCount ?? 3
}

/** @deprecated use getCategories() */
export const INDUSTRY_CATEGORIES = getCategories()

/** @deprecated use getFilterCategories() */
export const FILTER_CATEGORIES = getFilterCategories()

/** @deprecated use getCollapsedItemCount() */
export const COLLAPSED_ITEM_COUNT = getCollapsedItemCount()

export function getCategoryLabel(categoryId) {
  return getCategories().find((category) => category.id === categoryId)?.label ?? categoryId
}
