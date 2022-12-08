import React from 'react'
import { ListContainer } from './ListBudgetStyled'
import ItemList from '../ItemList/ItemList'
import { emptyList, searchedData } from './ListBudgetFunctions'
import { FlexRow } from '../../pages/Pressupost/PressupostStyled'

const ListBudget = ({ title, listBudget }) => {
  const [searchBudget, setSearchBudget] = React.useState('')
  const [filterItem, setFilterItem] = React.useState('')
  const emptyListText = 'Todavía no hay ningún presupuesto guardado'

  return (
    <ListContainer>
      <h4>{ title }</h4>
      { emptyList(listBudget) &&
        <small>{ emptyListText }</small>
      }
      { !emptyList(listBudget) &&
        <>
          <input
            id='searchBudget'
            name='searchBudget'
            placeholder='Search for...'
            value={searchBudget}
            onChange={ (event) => setSearchBudget(event.target.value) }
          />
          <FlexRow>
            <button
              onClick={() => setFilterItem('')}
            >
              reset orden
            </button>
            <button
              onClick={() => setFilterItem('recent')}
            >
              más recientes
            </button>
            <button
              onClick={() => setFilterItem('oldest')}
            >
              más antiguas
            </button>
            <button
              onClick={() => setFilterItem('alfabetic')}
            >
              alfabeticamente
            </button>
          </FlexRow>
          { searchedData(listBudget, filterItem, searchBudget).map(item =>
              <ItemList
                item={item}
                key={item.id}
              />
          )}
        </>
      }
    </ListContainer>
  )
}

export default ListBudget