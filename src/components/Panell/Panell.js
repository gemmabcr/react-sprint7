import React from 'react'
import { Panel, RowPanel, RowPanelTitle } from './PanellStyled'

const Panell = ({ totalWebFunctions, setTotalWebFunctions }) => {
  const [formData, setFormData] = React.useState([
    {
      id: 'pages',
      name: 'Número de páginas',
      number: 0
    },
    {
      id: 'languages',
      name: 'Número de idiomas',
      number: 0
    }
  ])

  function symbolButton(name, symbol) {
    setFormData(prevFormData => {
      const newFormData = []
      for (let option of prevFormData) {
        if (option.id === name) {
          const operation = symbol === '+' ? 1 : -1
          const updatedOption = {
            ...option,
            number: option.number + operation
          }
          newFormData.push(updatedOption)
        } else {
          newFormData.push(option)
        }
      }
      return newFormData
    })
  }

  function handleChange(event) {
    const {name, value} = event.target
    setFormData(prevFormData => {
      const newFormData = []
      for (let option of prevFormData) {
        if (option.id === name) {
          const updatedOption = {
            ...option,
            number: Number(value)
          }
          newFormData.push(updatedOption)
        } else {
          newFormData.push(option)
        }
      }
      return newFormData
    })
  }

  React.useEffect(() => {
    const selectedInputs = formData.filter(item => item.number > 0)
    const numbersArray = selectedInputs.map(number => number.number)
    const total = numbersArray.reduce((partialSum, a) => partialSum + a, 0)
    setTotalWebFunctions(total * 30)
  }, [formData, setTotalWebFunctions])

  return (
    <Panel>
      {formData.map(item =>
        <RowPanel key={item.id}>
          <RowPanelTitle>
            <label htmlFor={item.id}>
              {item.name} (*30€)
            </label>
          </RowPanelTitle>
          <div>
            <button
              disabled={item.number === 0}
              onClick={() => symbolButton(item.id, '-')}
            >
              -
            </button>
            <input
              type='number'
              id={item.id}
              name={item.id}
              min={0}
              value={item.number}
              onChange={handleChange}
            />
            <button
              onClick={() => symbolButton(item.id, '+')}
            >
              +
            </button>
          </div>
        </RowPanel>
      )}
      <p>Total funcionalidades: {totalWebFunctions}€</p>
    </Panel>
  )
}

export default Panell