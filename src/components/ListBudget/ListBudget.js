import React from 'react'
import { FiltersHeader, ListContainer } from './ListBudgetStyled'
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
          <FiltersHeader>
            <FlexRow>
              <p>Sort by:</p>
              <select
                id='filterItem'
                name='name'
                value={filterItem}
                onChange={(event) => setFilterItem(event.target.value)}
              >
                <option value=''> - </option>
                <option value='recent'>Más recientes</option>
                <option value='oldest'>Más antiguas</option>
                <option value='alfabetic'>Alfabèticamente</option>
              </select>
              { filterItem !== '' &&
                <button
                  onClick={() => setFilterItem('')}
                >
                  reset orden
                </button>
              }
            </FlexRow>
            <input
              id='searchBudget'
              name='searchBudget'
              placeholder='Search for...'
              value={searchBudget}
              onChange={ (event) => setSearchBudget(event.target.value) }
            />
          </FiltersHeader>
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