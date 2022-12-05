export function checkWebFunctions(product, item) {
  return product.id === 'web' && item.webFunctions.length > 0
}

export function getWebFunctionData (functionality) {
  if (functionality.number > 0) {
    return (
      <li key={ functionality.id }>
        { functionality.number } { formatWebFunction(functionality.name) }: = { functionality.number*30}€
      </li>
    )
  }
  return ''
}

export function formatWebFunction (name) {
  const splitedName = name.split(' ')
  const word = splitedName[2]
  return word.charAt(0).toUpperCase() + word.slice(1)
}
