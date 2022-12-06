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
  const [newFormData, setNewFormData] = useState(getNewFormData())
  const [listPressupost, setListPressupost] = React.useState(() => getListData())
  const [total, setTotal] = useState(0)
  React.useEffect(() => {
    const selectedOptions = newFormData.filter(item => item.selected)
    setTotal(prevTotal => {
      let total = 0
      if (selectedOptions.length > 0) {
        for (let option of selectedOptions) {
          total += option.price
        }
        const webOption = newFormData.find(item => item.id === 'web')
        if (!!webOption.selected) {
          const webFunctionalities = newFormData.filter(item => item.webConditional)
          for (let functionality of webFunctionalities) {
            const totalFunctionality = functionality.value * 30
            total += totalFunctionality
          }
        }
      }
      return total
    })
  }, [newFormData])

  function onNewSubmit () {
    const namePressupost = newFormData.find(item => item.id === 'title')
    const nameClient = newFormData.find(item => item.id === 'client')
    const selectedItems = newFormData.filter(item => item.selected)
    const webOption = findWebOption(selectedItems)
    let webFunctionalities = []
    if (webOption !== undefined) {
      const pages = newFormData.find(item => item.id === 'pages')
      const languages = newFormData.find(item => item.id === 'languages')
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
    saveToLocal('newFormData', importedData)
    setNewFormData(importedData)
  }

  function openModal (name) {
    setTitleModal(name)
    setInfoModal(true)
  }

  return (
    <PressupostContainer>
      <FormPressupost
        title={ title }
        newFormData={ newFormData }
        setNewFormData={ setNewFormData }
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
