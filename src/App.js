import React from 'react'

const App = () => {
  const title = '¿Qué quieres hacer?'
  const [total, setTotal] = React.useState(0)
  const [formData, setFormData] = React.useState([
    {
      id: 'web',
      name: 'Pàgina web',
      price: 500,
      selected: false
    },
    {
      id: 'seo',
      name: 'Consultoria SEO',
      price: 300,
      selected: false
    },
    {
      id: 'ads',
      name: 'Campanya de Google Ads',
      price: 200,
      selected: false
    }
  ])

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
          newFormData.push(updatedOption)
        } else {
          newFormData.push(option)
        }
      }
      countTotal(newFormData)
      return newFormData
    })
  }

  function countTotal(formData){
    const selectedItems = formData.filter(item => item.selected)
    setTotal(prevTotal => {
      let total = 0
      if (selectedItems.length > 0) {
        for (let option of selectedItems) {
          total += option.price
        }
      }
      return total
    })

  }

  return (
    <>
      <p>{ title }</p>
      { formData.map(item =>
        <div key={ item.id }>
          <input type='checkbox' id={ item.id } name={ item.id } value={ item.id } onChange={ handleChange } />
          <label htmlFor={ item.id }>{ item.name } ({ item.price }€)</label>
        </div>
      ) }
      <p>Total: { total }</p>
    </>
  )
}

export default App
