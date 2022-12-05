import { products, titlePresu, webFunctions } from '../../data'

export function getFromLocal(key, parse = false) {
  if (parse) {
    return JSON.parse(localStorage.getItem(key))
  }
  return localStorage.getItem(key)
}

export function saveToLocal(name, value) {
  localStorage.setItem(name, JSON.stringify(value))
}

export function getFormData () {
  const key = 'products'
  if (getFromLocal(key) === null) {
    return products
  }
  return getFromLocal(key, true)
}

export function getWebFormData () {
  const key = 'webFunctions'
  if (getFromLocal(key) === null) {
    return webFunctions
  }
  return getFromLocal(key, true)
}

export function getTitleFormData () {
  const key = 'titleFormData'
  if (getFromLocal(key) === null) {
    return titlePresu
  }
  return getFromLocal(key, true)
}

export function getListData () {
  const key = 'listPressupost'
  if (getFromLocal(key) === null) {
    return []
  }
  return getFromLocal(key, true)
}

export function getNewTitleData (prevState, name, value) {
  const newFormData = []
  for (let option of prevState){
    if (option.id === name) {
      const updatedOption = {
        ...option,
        value: value
      }
      newFormData.push(updatedOption)
    } else {
      newFormData.push(option)
    }
  }
  return newFormData
}

export function getNewProductsData (prevFormData, name) {
  const newFormData = []
  for (let option of prevFormData){
    if (option.id === name) {
      const updatedOption = {
        ...option,
        selected: !option.selected
      }
      newFormData.push(updatedOption)
    } else {
      newFormData.push(option)
    }
  }
  return newFormData
}

export function findWebOption (selectedItems) {
  return selectedItems.find(item => item.id === 'web')
}

export function calculateTotal (selectedItems, webOption, totalWebFunctions) {
  let total = 0
  for (let option of selectedItems) {
    total += option.price
  }
  if (webOption !== undefined) {
    total += totalWebFunctions
  }
  return total
}

export function getFormToSubmit (listPressupost, titleFormData, formData, total, webFormData) {
  const namePressupost = titleFormData.find(item => item.id === 'title')
  const nameClient = titleFormData.find(item => item.id === 'client')
  const selectedItems = formData.filter(item => item.selected)
  const webOption = findWebOption(selectedItems)
  let webFunctionalities = []
  if (webOption !== undefined) {
    webFunctionalities = webFormData
  }
  return {
    id: listPressupost.length,
    title: namePressupost.value,
    client: nameClient.value,
    products: selectedItems,
    webFunctions: webFunctionalities,
    totalPrice: total,
    date: format(new Date())
  }
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
