import React from 'react'
import { saveToLocal } from '../service/dataService'
import { FlexColumn, FlexRow } from '../pages/Pressupost/PressupostStyled'

const FormPressupost = ({ title, formData, setFormData, onNewSubmit, total }) => {

  function handleNewChange (event) {
    const { name, value, type } = event.target
    setFormData(prevState => {
      const updatedForm = []
      for (let option of prevState){
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
      saveToLocal('formData', updatedForm)
      return updatedForm
    })
    resetWeb()
  }

  function resetWeb() {
    const webOption = formData.find(item => item.id === 'web')
    if (!webOption.selected) {
      setFormData(prevState => {
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
        saveToLocal('formData', updatedForm)
        return updatedForm
      })
    }
  }

  function checkWeb () {
    const webOption = formData.find(item => item.id === 'web')
    return !!webOption.selected
  }

  function disabledButton () {
    let disabled = false
    const checkboxesOptions = formData.filter(item => item.selected )
    if (checkboxesOptions.every(item => !item.selected)) {
      disabled = true
    }
    const namePressupost = formData.find(item => item.id === 'title')
    const nameClient = formData.find(item => item.id === 'client')
    if (namePressupost.value === '' || nameClient.value === '') {
      disabled = true
    }
    return disabled
  }

  return (
    <FlexColumn>
      <h4>{ title }</h4>
      <form>
        { formData.map(item =>
          <div key={ item.id }>
            { item.webConditional && checkWeb() &&
              <FlexRow key={ item.id }>
                <label htmlFor={ item.id }>
                  - { item.name } <small>(*30€)</small>
                </label>
                <input
                  type={ item.type }
                  id={ item.id }
                  name={ item.id }
                  value={ item.value }
                  onChange={ handleNewChange }
                />
                <small>Total: { item.value * 30 }€</small>
              </FlexRow>
            }
            { item.webConditional === undefined &&
              <FlexRow key={ item.id }>
                <label htmlFor={ item.id }>
                  { item.name }<small>{ item.price ? ` (${item.price}€)` : '' }</small>
                </label>
                <input
                  type={ item.type }
                  id={ item.id }
                  name={ item.id }
                  value={ item.value }
                  checked={ item.type === 'checkbox' ? item.selected : null}
                  onChange={ handleNewChange }
                />
              </FlexRow>
            }
          </div>
        ) }
        <p>Total: { total }€</p>
        <button
          disabled={ disabledButton() }
          onClick={ () => onNewSubmit() }
        >
          Guardar
        </button>
      </form>
    </FlexColumn>
  )
}

export default FormPressupost