export function unfilteredConditions (list, search) {
  return list.length > 0 && search === ''
}

export function filteredConditions (list, search) {
  return list.length > 0 && search !== ''
}

export function filteredList (list, search) {
  return list.filter(item => {
    const title = item.title
    const lowerTitle = title.toLowerCase()
    const lowerSearch = search.toLowerCase()
    return lowerTitle.includes(lowerSearch)
  })
}
