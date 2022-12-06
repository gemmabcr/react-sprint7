import React from 'react'
import { ListContainer } from './ListBudgetStyled'
import ItemList from '../ItemList/ItemList'
import { filteredConditions, filteredList, unfilteredConditions } from './ListBudgetFunctions'

const ListBudget = ({ title, listBudget }) => {
  const [searchBudget, setSearchBudget] = React.useState('')
  const emptyListText = 'Todavía no hay ningún presupuesto guardado'

  return (
    <ListContainer>
      <h4>{ title }</h4>
      { listBudget.length === 0 &&
        <small>{ emptyListText }</small>
      }
      <input
        id={ 'searchBudget' }
        name={ 'searchBudget' }
        placeholder='Search for...'
        value={ searchBudget }
        onChange={ (event) => setSearchBudget(event.target.value) }
      />
      { unfilteredConditions(listBudget, searchBudget) &&
        listBudget.map(item =>
          <ItemList
            item={ item }
            key={ item.id }
          />
      )}
      { filteredConditions(listBudget, searchBudget) &&
        filteredList(listBudget, searchBudget).map(item =>
          <ItemList
            item={ item }
            key={ item.id }
          />
      ) }
    </ListContainer>
  )
}

export default ListBudget