export function emptyList (list) {
  return list.length === 0
}

export function filteredData (list, filter) {
  return [...list]
    .sort((a, b) => {
      if (filter === 'alfabetic') {
        return a.title.localeCompare(b.title)
      }
      if (filter === 'recent') {
        return new Date(b.date) - new Date(a.date)
      }
      if (filter === 'oldest') {
        return new Date(a.date) - new Date(b.date)
      }
      return a.id - b.id
    })
}

export function searchedData (list, filter, search) {
  const filteredArray = filteredData(list, filter)
  if (search === '') {
    return filteredArray
  }
  return filteredArray.filter(item => {
    const title = item.title
    const lowerTitle = title.toLowerCase()
    const lowerSearch = search.toLowerCase()
    return lowerTitle.includes(lowerSearch)
  })
}
