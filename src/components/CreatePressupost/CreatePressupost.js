import React from 'react'
import Panell from '../Panell/Panell'
import { getFormData, getTitleFormData } from '../../pages/Pressupost/PressupostFunctions'
import { FlexColumn, FlexRow } from '../../pages/Pressupost/PressupostStyled'

const CreatePressupost = ({ title, setTitleModal, setInfoModal }) => {
  const [total, setTotal] = React.useState(0)
  const [totalWebFunctions, setTotalWebFunctions] = React.useState(0)
  const [formData, setFormData] = React.useState(() => getFormData())
  const [titleFormData, setTitleFormData] = React.useState(() => getTitleFormData())

  function handleChange(event){
    const { name } = event.target
    setFormData(prevFormData => {
      const newFormData = []
      for (let option of prevFormData){
        if (option.id === name) {
          const updatedOption = {
            ...option,
            selected: !option.selected
          }
          if (updatedOption.name === 'web' && !updatedOption.selected) {
            setTotalWebFunctions(0)
          }
          newFormData.push(updatedOption)
        } else {
          newFormData.push(option)
        }
      }
      localStorage.setItem('products', JSON.stringify(newFormData))
      return newFormData
    })
  }

  React.useEffect(() => {
    const selectedItems = formData.filter(item => item.selected)
    if (selectedItems.length > 0) {
      const webOption = selectedItems.find(item => item.id === 'web')
      setTotal(prevTotal => {
        let total = 0
        for (let option of selectedItems) {
          total += option.price
        }
        if (webOption !== undefined) {
          total += totalWebFunctions
        }
        return total
      })
    } else {
      setTotal(0)
    }
  }, [formData, totalWebFunctions])

  function handleTitleChange(event){
    const { name, value } = event.target
    setTitleFormData(prevTitleFormData => {
      const newFormData = []
      for (let option of prevTitleFormData){
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
      localStorage.setItem('titleFormData', JSON.stringify(newFormData))
      return newFormData
    })
  }

  return (
    <FlexColumn>
      <h4>{ title }</h4>
      { titleFormData.map(item =>
        <FlexRow key={ item.id }>
          <input
            type='text'
            id={ item.id }
            name={ item.id }
            value={ item.value }
            onChange={ handleTitleChange }
          />
          <label htmlFor={ item.id }>
            { item.name }
          </label>
        </FlexRow>
      )}
      { formData.map(item =>
        <div key={ item.id }>
          <FlexRow>
            <input
              type='checkbox'
              id={ item.id }
              name={ item.id }
              checked={ item.selected }
              onChange={ handleChange }
            />
            <label htmlFor={ item.id }>
              { item.name } ({ item.price }€)
            </label>
          </FlexRow>
          { item.id === 'web' && item.selected &&
            <Panell
              totalWebFunctions={ totalWebFunctions }
              setTotalWebFunctions={ setTotalWebFunctions }
              setTitleModal={ setTitleModal }
              setInfoModal={ setInfoModal }
            />
          }
        </div>
      ) }
      <p>Total: { total }€</p>
    </FlexColumn>
  )
}

export default CreatePressupost