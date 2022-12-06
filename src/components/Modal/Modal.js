import React, { Fragment } from 'react'
import { ContentModal, Overlay, WrapperModal } from './ModalStyled'

const Modal = ({ show, setShow, titleModal }) => {
  return (
    <Fragment>
      {show &&
        <Overlay onClick={ () => setShow(false) }>
          <WrapperModal>
            <ContentModal>
              <h5>En este componente indica el { titleModal } que quiere para su página web</h5>
            </ContentModal>
          </WrapperModal>
        </Overlay>
      }
    </Fragment>
  )
}

export default Modal
