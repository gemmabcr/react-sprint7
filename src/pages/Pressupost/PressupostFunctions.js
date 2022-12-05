import { products, titlePresu, webFunctions } from '../../data'

export function getFormData () {
  if (localStorage.getItem('products') === null) {
    return products
  }
  return JSON.parse(localStorage.getItem('products'))
}

export function getWebFormData () {
  if (localStorage.getItem('webFunctions') === null) {
    return webFunctions
  }
  return JSON.parse(localStorage.getItem('webFunctions'))
}

export function getTitleFormData () {
  if (localStorage.getItem('titleFormData') === null) {
    return titlePresu
  }
  return JSON.parse(localStorage.getItem('titleFormData'))
}

export function getListData () {
  if (localStorage.getItem('listPressupost') === null) {
    return []
  }
  return JSON.parse(localStorage.getItem('listPressupost'))
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

export function getFormToSubmit (listPressupost, titleFormData, formData, total, webFormData) {
  const namePressupost = titleFormData.find(item => item.id === 'title')
  const nameClient = titleFormData.find(item => item.id === 'client')
  const selectedItems = formData.filter(item => item.selected)
  const webOption = selectedItems.find(item => item.id === 'web')
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
