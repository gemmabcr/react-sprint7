import styled from 'styled-components'

export const PressupostContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
  padding: 1rem;
`

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem;
`

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`