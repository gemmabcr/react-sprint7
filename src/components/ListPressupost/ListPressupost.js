import React from 'react'
import { ItemList } from './ListPressupostStyled'
import { ListContainer } from '../../pages/Pressupost/PressupostStyled'
import { formatWebFunction } from '../../pages/Pressupost/PressupostFunctions'

const ListPressupost = ({ title, listPressupost }) => {
  return (
    <ListContainer>
      <h4>{ title }</h4>
      { listPressupost.length === 0 &&
        <small>Todavía no hay ningún presupuesto guardado</small>
      }
      { listPressupost.length > 0 && listPressupost.map(item =>
        <ItemList key={ item.id }>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <p>{ item.title }, de { item.client }</p>
            <small>{ item.date }</small>
          </div>
          { item.products.length > 0 &&
            <div>
              <p>Productos</p>
              <ul>
                { item.products.map(product =>
                  <div key={product.name}>
                    <li>{ product.name }: { product.price }€</li>
                    { product.id === 'web' && item.webFunctions.length > 0 &&
                      <ul>
                        { item.webFunctions.map(webFunction => {
                          if (webFunction.number > 0) {
                            return (
                              <li key={ webFunction.id }>
                                { webFunction.number } { formatWebFunction(webFunction.name) }: = { webFunction.number*30}€
                              </li>
                            )
                          }
                          return ''
                        }) }
                      </ul>
                    }
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