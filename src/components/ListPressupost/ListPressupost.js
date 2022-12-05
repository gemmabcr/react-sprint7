import React from 'react'
import { ItemList } from './ListPressupostStyled'
import { FlexColumn } from '../../pages/Pressupost/PressupostStyled'

const ListPressupost = ({ title, listPressupost }) => {
  return (
    <FlexColumn>
      <h4>{ title }</h4>
      { listPressupost.length > 0 && listPressupost.map(item =>
        <ItemList key={ item.id }>
          <p>{ item.title }, de { item.client }</p>
          { item.products.length > 0 &&
            <p>{ JSON.stringify(item.products) }</p>
          }
          { item.webFunctions.length > 0 &&
            <p>{ JSON.stringify(item.webFunctions) }</p>
          }
          <p>Precio total: { item.totalPrice }</p>
          <p>{ item.date }</p>
        </ItemList>
      )}
    </FlexColumn>
  )
}

export default ListPressupost