import React, { useState } from 'react'
import { PressupostContainer } from './PressupostStyled'
import ListBudget from '../../components/ListBudget/ListBudget'
import Modal from '../../components/Modal/Modal'
import { calculateTotal, getSubmitData } from './PressupostFunctions'
import FormBudget from '../../components/FormBudget/FormBudget'
import { newFormData as importedData } from '../../data'
import { getListData, getNewFormData, localData, localList, saveToLocal } from '../../service/dataService'

const Pressupost = () => {
  const title = '¿Qué quieres hacer?'
  const listTitle = 'Listado de presupuestos'
  const [infoModal, setInfoModal] = React.useState(false)
  const [titleModal, setTitleModal] = React.useState('')
  const [formData, setFormData] = useState(getNewFormData())
  const [listBudget, setListBudget] = React.useState(() => getListData())
  const [total, setTotal] = useState(0)

  React.useEffect(() => {
    const selectedOptions = formData.filter(item => item.selected)
    setTotal(calculateTotal(selectedOptions, formData))
  }, [formData])

  function onNewSubmit () {
    const newListItem = getSubmitData(formData, listBudget, total)
    setListBudget(prevList => {
      const newListData = [...prevList, newListItem]
      saveToLocal(localList, newListData)
      return newListData
    })
    resetFormData()
  }

  function resetFormData () {
    saveToLocal(localData, importedData)
    setFormData(importedData)
  }

  function openModal (name) {
    setTitleModal(name)
    setInfoModal(true)
  }

  return (
    <PressupostContainer>
      <FormBudget
        title={ title }
        formData={ formData }
        setFormData={ setFormData }
        onNewSubmit={ onNewSubmit }
        openModal={ openModal }
        total={ total }
      />
      <ListBudget
        listBudget={ listBudget }
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
