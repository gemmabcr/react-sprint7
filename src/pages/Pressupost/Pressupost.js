import React, { useState } from 'react'
import { PressupostContainer } from './PressupostStyled'
import ListPressupost from '../../components/ListPressupost/ListPressupost'
import Modal from '../../components/Modal/Modal'
import { findWebOption, format, getListData, getNewFormData, saveToLocal } from './PressupostFunctions'
import FormPressupost from '../../components/FormPressupost'
import { newFormData as importedData } from '../../data'

const Pressupost = () => {
  const title = '¿Qué quieres hacer?'
  const listTitle = 'Listado de presupuestos'
  const [infoModal, setInfoModal] = React.useState(false)
  const [titleModal, setTitleModal] = React.useState('')
  const [formData, setFormData] = useState(getNewFormData())
  const [listPressupost, setListPressupost] = React.useState(() => getListData())
  const [total, setTotal] = useState(0)

  React.useEffect(() => {
    const selectedOptions = formData.filter(item => item.selected)
    setTotal(prevTotal => {
      let total = 0
      if (selectedOptions.length > 0) {
        for (let option of selectedOptions) {
          total += option.price
        }
        const webOption = formData.find(item => item.id === 'web')
        if (!!webOption.selected) {
          const webFunctionalities = formData.filter(item => item.webConditional)
          for (let functionality of webFunctionalities) {
            const totalFunctionality = functionality.value * 30
            total += totalFunctionality
          }
        }
      }
      return total
    })
  }, [formData])

  function onNewSubmit () {
    const namePressupost = formData.find(item => item.id === 'title')
    const nameClient = formData.find(item => item.id === 'client')
    const selectedItems = formData.filter(item => item.selected)
    const webOption = findWebOption(selectedItems)
    let webFunctionalities = []
    if (webOption !== undefined) {
      const pages = formData.find(item => item.id === 'pages')
      const languages = formData.find(item => item.id === 'languages')
      webFunctionalities = [pages, languages]
    }
    const newListItem = {
      id: listPressupost.length,
      title: namePressupost.value,
      client: nameClient.value,
      products: selectedItems,
      webFunctions: webFunctionalities,
      totalPrice: total,
      date: format(new Date())
    }
    setListPressupost(prevList => {
      const newListData = [...prevList, newListItem]
      saveToLocal('listPressupost', newListData)
      return newListData
    })
    resetFormData()
  }

  function resetFormData () {
    saveToLocal('formData', importedData)
    setFormData(importedData)
  }

  function openModal (name) {
    setTitleModal(name)
    setInfoModal(true)
  }

  return (
    <PressupostContainer>
      <FormPressupost
        title={ title }
        formData={ formData }
        setFormData={ setFormData }
        onNewSubmit={ onNewSubmit }
        openModal={ openModal }
        total={ total }
      />
      <ListPressupost
        listPressupost={ listPressupost }
        title={ listTitle }
      />
      <Modal
        show={ infoModal }
        setShow={ setInfoModal }
        titleModal = { titleModal }
      />
    </PressupostContainer>
  )
}

export default Pressupost
