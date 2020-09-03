const reducer = (state = '', action) => {
  console.log('action: ', action)
  switch (action.type) {
    case 'SET_NOTI':{
      state = action.data
      return state
    }
    
    default: return state
  }

}

export const setNoti = (noti) => {
  return {
    type: 'SET_NOTI',
    data: noti
  }
}
export default reducer