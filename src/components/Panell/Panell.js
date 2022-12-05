import React from 'react'
import { Panel, RowPanel, RowPanelTitle } from './PanellStyled'
import { webFunctions } from '../../data'
import { FlexRow } from '../../pages/Pressupost/PressupostStyled'

const Panell = ({ totalWebFunctions, setTotalWebFunctions, setTitleModal, setInfoModal }) => {
  const [formData, setFormData] = React.useState(() => {
    if (localStorage.getItem('webFunctions') === null) {
      return webFunctions
    }
    return JSON.parse(localStorage.getItem('webFunctions'))
  })

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
      localStorage.setItem('webFunctions', JSON.stringify(newFormData))
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
      localStorage.setItem('webFunctions', JSON.stringify(newFormData))
      return newFormData
    })
  }

  function openModal (name) {
    setTitleModal(name)
    setInfoModal(true)
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
          <FlexRow>
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
            <button
              onClick={(e) => openModal(item.name)}
            >
              Info
            </button>
          </FlexRow>
        </RowPanel>
      )}
      <p>Total funcionalidades: {totalWebFunctions}€</p>
    </Panel>
  )
}

export default Panell