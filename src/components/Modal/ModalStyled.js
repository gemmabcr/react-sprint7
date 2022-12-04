import styled from 'styled-components'

export const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.5);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const WrapperModal = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
  max-width: 400px;
  padding: 1rem;
  position: relative;
  width: 100%;
`;

export const ContentModal = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  padding: 0 1rem;
`;
