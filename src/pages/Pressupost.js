import React from 'react'
import Panell from '../components/Panell/Panell'
import { products } from '../data'

const Pressupost = () => {
  const title = '¿Qué quieres hacer?'
  const [total, setTotal] = React.useState(0)
  const [totalWebFunctions, setTotalWebFunctions] = React.useState(0)
  const [formData, setFormData] = React.useState(() => {
    if (localStorage.getItem('products') === null) {
      return products
    }
    return JSON.parse(localStorage.getItem('products'))
  })

  function handleChange(event){
    const { name } = event.target
    setFormData(prevFormData => {
      const newFormData = []
      for (let option of prevFormData){
        if (option.id === name) {
          const updatedOption = {
            ...option,
            selected: !option.selected
          }
          if (updatedOption.name === 'web' && !updatedOption.selected) {
            setTotalWebFunctions(0)
          }
          newFormData.push(updatedOption)
        } else {
          newFormData.push(option)
        }
      }
      localStorage.setItem('products', JSON.stringify(newFormData))
      return newFormData
    })
  }

  React.useEffect(() => {
    const selectedItems = formData.filter(item => item.selected)
    if (selectedItems.length > 0) {
      const webOption = selectedItems.find(item => item.id === 'web')
      setTotal(prevTotal => {
        let total = 0
        for (let option of selectedItems) {
          total += option.price
        }
        if (webOption !== undefined) {
          total += totalWebFunctions
        }
        return total
      })
    } else {
      setTotal(0)
    }
  }, [formData, totalWebFunctions])

  return (
    <>
      <p>{ title }</p>
      { formData.map(item =>
        <div key={ item.id }>
          <input
            type='checkbox'
            id={ item.id }
            name={ item.id }
            checked={ item.selected }
            onChange={ handleChange }
          />
          <label htmlFor={ item.id }>
            { item.name } ({ item.price }€)
          </label>
          { item.id === 'web' && item.selected &&
            <Panell
              totalWebFunctions={ totalWebFunctions }
              setTotalWebFunctions={ setTotalWebFunctions }
            />
          }
        </div>
      ) }
      <p>Total: { total }€</p>
    </>
  )
}

export default Pressupost
