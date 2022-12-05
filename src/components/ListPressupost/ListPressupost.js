import React from 'react'
import { ItemList } from './ListPressupostStyled'
import { FlexColumn } from '../../pages/Pressupost/PressupostStyled'

const ListPressupost = ({ title }) => {
  const [listPressupost, setListPressupost] = React.useState([
    {
      title: 'Presu1',
      client: 'Kimchilover',
      products: [],
      totalPrice: 500,
      date: 'Mon Dec 05 2022 14:33:56 GMT+0100'
    }
  ])

  return (
    <FlexColumn>
      <h4>{ title }</h4>
      { listPressupost.length > 0 && listPressupost.map(item =>
        <ItemList>
          <p>{ item.title }, de { item.client }</p>
          <p>{ JSON.stringify(item.products) }</p>
          <p>Precio total: { item.totalPrice }</p>
          <p>{ item.date }</p>
        </ItemList>
      )}
    </FlexColumn>
  )
}

export default ListPressupost