export function getFormInputChange(prevState, name, type, value) {
  const updatedForm = []
  for (let option of prevState) {
    if (option.id === name) {
      let updatedOption
      if (type === 'text') {
        updatedOption = {
          ...option,
          value: value
        }
      }
      if (type === 'checkbox') {
        updatedOption = {
          ...option,
          selected: !option.selected
        }
      }
      if (type === 'number') {
        updatedOption = {
          ...option,
          value: Number(value)
        }
      }
      updatedForm.push(updatedOption)
    } else {
      updatedForm.push(option)
    }
  }
  return updatedForm
}

export function getResetFormWeb(prevState) {
  const updatedForm = []
  for (let option of prevState) {
    if (option.webConditional) {
      let updatedOption = {
        ...option,
        value: 0
      }
      updatedForm.push(updatedOption)
    } else {
      updatedForm.push(option)
    }
  }
  return updatedForm
}

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
  const nameBudget = data.find(item => item.id === 'title')
  const nameClient = data.find(item => item.id === 'client')
  if (nameBudget.value === '' || nameClient.value === '') {
    disabled = true
  }
  return disabled
}
