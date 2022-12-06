import React from 'react'
import { FlexRow } from '../../pages/Pressupost/PressupostStyled'
import { saveToLocal } from '../../pages/Pressupost/PressupostFunctions'

const Panell = ({ setTitleModal, setInfoModal, webFormData, setWebFormData }) => {

  function symbolButton(name, symbol) {
    setWebFormData(prevFormData => {
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
      saveToLocal('webFunctions', newFormData)
      return newFormData
    })
  }

  function openModal (name) {
    setTitleModal(name)
    setInfoModal(true)
  }

  return (
    <div>
      {webFormData.map(item =>
        <div key={item.id}>
          <FlexRow>
            <button
              disabled={item.number === 0}
              onClick={() => symbolButton(item.id, '-')}
            >
              -
            </button>
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
        </div>
      )}
    </div>
  )
}

export default Panell