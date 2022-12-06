import React from 'react'
import { ItemListContainer, ItemListHeader } from '../ListPressupost/ListPressupostStyled'

const ItemList = ({ item }) => {
  return (
    <ItemListContainer>
      <ItemListHeader>
        <p>{ item.title }, de { item.client }</p>
        <small>{ item.date }</small>
      </ItemListHeader>
      { item.products.length > 0 &&
        <div>
          <p>Productos</p>
          <ul>
            { item.products.map(product =>
              <div key={product.name}>
                <li>{ product.name } <small>({ product.price }€)</small></li>
              </div>
            ) }
            { item.webFunctions.map(product =>
              <div key={product.name}>
                <li>{ product.name }: { product.value } <small>({ product.value * 30 }€)</small></li>
              </div>
            ) }
          </ul>
        </div>
      }
      <p>Precio total: { item.totalPrice }€</p>
    </ItemListContainer>
  )
}

export default ItemList