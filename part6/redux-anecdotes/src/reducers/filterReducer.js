const reducer = (state = '', action) => {
  console.log('action: ', action)
  switch (action.type) {
    case 'SET_FILTER':
      return state = action.filter
    
    default: return state
  }
}

export const filterText = (text) => {
  return {
    type: 'SET_FILTER',
    filter: text
  }
}

export default reducer