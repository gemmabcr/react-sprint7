import { newFormData } from '../../data'

export function getFromLocal(key, parse = false) {
  if (parse) {
    return JSON.parse(localStorage.getItem(key))
  }
  return localStorage.getItem(key)
}

export function saveToLocal(name, value) {
  localStorage.setItem(name, JSON.stringify(value))
}

export function gettingData (key, data) {
  if (getFromLocal(key) === null) {
    return data
  }
  return getFromLocal(key, true)
}

export function getNewFormData () {
  const key = 'newFormData'
  return gettingData(key, newFormData)
}

export function getListData () {
  const key = 'listPressupost'
  return gettingData(key, [])
}

export function findWebOption (selectedItems) {
  return selectedItems.find(item => item.id === 'web')
}

export function calculateTotal (options, data) {
  let total = 0
  if (options.length > 0) {
    for (let option of options) {
      total += option.price
    }
    const webOption = data.find(item => item.id === 'web')
    if (!!webOption.selected) {
      const webFunctionalities = data.filter(item => item.webConditional)
      for (let functionality of webFunctionalities) {
        const totalFunctionality = functionality.value * 30
        total += totalFunctionality
      }
    }
  }
  return total
}

export function format (inputDate) {
  let date = inputDate.getDate()
  let month = inputDate.getMonth() + 1
  let year = inputDate.getFullYear()

  date = date
    .toString()
    .padStart(2, '0')

  month = month
    .toString()
    .padStart(2, '0')

  return `${date}/${month}/${year}`
}

export function getSubmitData (data, list, total) {
  const budget = data.find(item => item.id === 'title')
  const client = data.find(item => item.id === 'client')
  const selectedItems = data.filter(item => item.selected)
  const webOption = findWebOption(selectedItems)
  let webFunctionalities = []
  if (webOption !== undefined) {
    const pages = data.find(item => item.id === 'pages')
    const languages = data.find(item => item.id === 'languages')
    webFunctionalities = [pages, languages]
  }
  return {
    id: list.length,
    title: budget.value,
    client: client.value,
    products: selectedItems,
    webFunctions: webFunctionalities,
    totalPrice: total,
    date: format(new Date())
  }
}