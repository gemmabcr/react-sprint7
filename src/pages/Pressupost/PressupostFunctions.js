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

export function format(inputDate) {
  let date, month, year;

  date = inputDate.getDate();
  month = inputDate.getMonth() + 1;
  year = inputDate.getFullYear();

  date = date
    .toString()
    .padStart(2, '0');

  month = month
    .toString()
    .padStart(2, '0');

  return `${date}/${month}/${year}`;
}
