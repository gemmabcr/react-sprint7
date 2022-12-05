import { products, titlePresu } from '../../data'

export function getFormData() {
  if (localStorage.getItem('products') === null) {
    return products
  }
  return JSON.parse(localStorage.getItem('products'))
}

export function getTitleFormData() {
  if (localStorage.getItem('titleFormData') === null) {
    return titlePresu
  }
  return JSON.parse(localStorage.getItem('titleFormData'))
}