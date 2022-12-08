export function webFunctionsConditions (item, data) {
  if (item.webConditional) {
    const webOption = data.find(item => item.id === 'web')
    return !!webOption.selected
  }
  return false
}

export function disabledButton (data) {
  let disabled = false
  const checkboxesOptions = data.filter(item => item.selected )
  if (checkboxesOptions.every(item => !item.selected)) {
    disabled = true
  }
  const namePressupost = data.find(item => item.id === 'title')
  const nameClient = data.find(item => item.id === 'client')
  if (namePressupost.value === '' || nameClient.value === '') {
    disabled = true
  }
  return disabled
}
