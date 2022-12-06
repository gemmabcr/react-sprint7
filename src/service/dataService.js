import { newFormData } from '../data'

export const localData = 'formData'
export const localList = 'listBudget'

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
  return gettingData(localData, newFormData)
}

export function getListData () {
  return gettingData(localList, [])
}
