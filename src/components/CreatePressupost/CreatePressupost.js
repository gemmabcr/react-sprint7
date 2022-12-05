import React from 'react'
import Panell from '../Panell/Panell'
import {
  calculateTotal,
  findWebOption,
  getFormData,
  getFormToSubmit,
  getNewProductsData,
  getNewTitleData,
  getTitleFormData,
  getWebFormData,
   saveToLocal
} from '../../pages/Pressupost/PressupostFunctions'
import { FlexColumn, FlexRow } from '../../pages/Pressupost/PressupostStyled'

const CreatePressupost = ({ title, setTitleModal, setInfoModal, listPressupost, setListPressupost }) => {

  const [titleFormData, setTitleFormData] = React.useState(() => getTitleFormData())
  const [formData, setFormData] = React.useState(() => getFormData())
  const [webFormData, setWebFormData] = React.useState(() => getWebFormData())
  const [totalWebFunctions, setTotalWebFunctions] = React.useState(0)
  const [total, setTotal] = React.useState(0)

  function handleChange(event){
    const { name } = event.target
    setFormData(prevFormData => {
      const newFormData = getNewProductsData(prevFormData, name)
      const selectedWeb = newFormData.find(item => item.name === 'web' && !item.selected)
      if (selectedWeb) {
        setTotalWebFunctions(0)
      }
      saveToLocal('products', newFormData)
      return newFormData
    })
  }

  React.useEffect(() => {
    const selectedItems = formData.filter(item => item.selected)
    if (selectedItems.length > 0) {
      const webOption = findWebOption(selectedItems)
      setTotal(calculateTotal(selectedItems, webOption, totalWebFunctions))
    } else {
      setTotal(0)
    }
  }, [formData, totalWebFunctions])

  function handleTitleChange (event) {
    const { name, value } = event.target
    setTitleFormData(prevTitleFormData => {
      const newFormData = getNewTitleData(prevTitleFormData, name, value)
      saveToLocal('titleFormData', newFormData)
      return newFormData
    })
  }

  function onSubmitForm () {
    const formToSubmit = getFormToSubmit(listPressupost, titleFormData, formData, total, webFormData)
    setListPressupost(prevList => {
      const newListData = [...prevList, formToSubmit]
      saveToLocal('listPressupost', newListData)
      return newListData
    })
  }

  return (
    <FlexColumn>
      <h4>{ title }</h4>
      <form onSubmit={ onSubmitForm }>
        { titleFormData.map(item =>
          <FlexRow key={ item.id }>
            <label htmlFor={ item.id }>
              { item.name }
            </label>
            <input
              type='text'
              id={ item.id }
              name={ item.id }
              value={ item.value }
              onChange={ handleTitleChange }
            />
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
                webFormData={webFormData}
                setWebFormData={setWebFormData}
              />
            }
          </div>
        ) }
        <p>Total: { total }€</p>
        <button>Guardar</button>
      </form>
    </FlexColumn>
  )
}

export default CreatePressupost