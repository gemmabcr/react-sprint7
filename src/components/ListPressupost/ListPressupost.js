import React from 'react'
import { ItemList } from './ListPressupostStyled'
import { ListContainer } from '../../pages/Pressupost/PressupostStyled'

const ListPressupost = ({ title, listPressupost }) => {
  return (
    <ListContainer>
      <h4>{ title }</h4>
      { listPressupost.length === 0 &&
        <small>Todavía no hay ningún presupuesto guardado</small>
      }
      { listPressupost.length > 0 && listPressupost.map(item =>
        <ItemList key={ item.id }>
          <p>{ item.date }</p>
          <p>{ item.title }, de { item.client }</p>
          { item.products.length > 0 &&
            <div>
              <p>Productos</p>
              <ul>
                { item.products.map(product =>
                  <div key={product.name}>
                    <li>{ product.name }: { product.price }€</li>
                    { product.id === 'web' && item.webFunctions.length > 0 && item.webFunctions.map(webFunction =>
                      <ul key={webFunction.id}>
                        <li>{ webFunction.name }: { webFunction.number } = { webFunction.number*30}€</li>
                      </ul>
                    ) }
                  </div>
                ) }
              </ul>

            </div>
          }
          <p>Precio total: { item.totalPrice }€</p>
        </ItemList>
      )}
    </ListContainer>
  )
}

export default ListPressupost