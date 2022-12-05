import styled from 'styled-components'

export const PressupostContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
  height: 100vh;
`

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  max-height: inherit;
  overflow-y: scroll;
`

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  margin-bottom: 1rem;
`