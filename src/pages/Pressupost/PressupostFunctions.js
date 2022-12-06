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
