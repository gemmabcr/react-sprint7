import React from 'react'
import CreatePressupost from '../../components/CreatePressupost/CreatePressupost'
import { PressupostContainer } from './PressupostStyled'
import ListPressupost from '../../components/ListPressupost/ListPressupost'

const Pressupost = () => {
  const title = '¿Qué quieres hacer?'
  const listTitle = 'Listado de presupuestos'

  return (
    <PressupostContainer>
      <CreatePressupost
        title={ title }
      />
      <ListPressupost
        title={ listTitle }
      />
    </PressupostContainer>
  )
}

export default Pressupost
