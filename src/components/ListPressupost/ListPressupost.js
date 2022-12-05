import React from 'react'
import {ItemList, ItemListHeader} from './ListPressupostStyled'
import { ListContainer } from '../../pages/Pressupost/PressupostStyled'
import { checkWebFunctions, getWebFunctionData } from './ListPressupostFunctions'

const ListPressupost = ({ title, listPressupost }) => {
  return (
    <ListContainer>
      <h4>{ title }</h4>
      { listPressupost.length === 0 &&
        <small>Todavía no hay ningún presupuesto guardado</small>
      }
      { listPressupost.length > 0 && listPressupost.map(item =>
        <ItemList key={ item.id }>
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
                    <li>{ product.name }: { product.price }€</li>
                    { checkWebFunctions(product, item) &&
                      <ul>
                        { item.webFunctions.map(webFunction =>
                          getWebFunctionData(webFunction)
                        ) }
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