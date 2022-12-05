import React from 'react'
import CreatePressupost from '../../components/CreatePressupost/CreatePressupost'
import { PressupostContainer } from './PressupostStyled'
import ListPressupost from '../../components/ListPressupost/ListPressupost'
import Modal from '../../components/Modal/Modal'

const Pressupost = () => {
  const title = '¿Qué quieres hacer?'
  const listTitle = 'Listado de presupuestos'
  const [infoModal, setInfoModal] = React.useState(false)
  const [titleModal, setTitleModal] = React.useState('')

  return (
    <PressupostContainer>
      <CreatePressupost
        title={ title }
        setTitleModal={ setTitleModal }
        setInfoModal={ setInfoModal }
      />
      <ListPressupost
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
