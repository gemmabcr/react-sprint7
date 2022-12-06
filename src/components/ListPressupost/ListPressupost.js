import React from 'react'
import { ListContainer } from '../../pages/Pressupost/PressupostStyled'
import ItemList from '../ItemList/ItemList'

const ListPressupost = ({ title, listPressupost }) => {

  const [searchPresu, setSearchPresu] = React.useState('')

  function searchChange (event) {
    setSearchPresu(event.target.value)
  }

  function unfilteredConditions () {
    return listPressupost.length > 0 && searchPresu === ''
  }

  function filteredConditions () {
    return listPressupost.length > 0 && searchPresu !== ''
  }

  function filteredList () {
    return listPressupost.filter(item => {
      const title = item.title
      const lowerTitle = title.toLowerCase()
      const lowerSearch = searchPresu.toLowerCase()
      return lowerTitle.includes(lowerSearch)
    })
  }

  return (
    <ListContainer>
      <h4>{ title }</h4>
      { listPressupost.length === 0 &&
        <small>Todavía no hay ningún presupuesto guardado</small>
      }
      <input
        id={ 'searchPresu' }
        name={ 'searchPresu' }
        placeholder='Search for...'
        value={ searchPresu }
        onChange={ searchChange }
      />
      { unfilteredConditions() && listPressupost.map(item =>
        <ItemList
          item={ item }
          key={ item.id }
        />
      )}
      { filteredConditions() && filteredList().map(item =>
        <ItemList
          item={ item }
          key={ item.id }
        />
      ) }
    </ListContainer>
  )
}

export default ListPressupost