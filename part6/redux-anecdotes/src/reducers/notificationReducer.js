const reducer = (state = '', action) => {
  console.log('action: ', action)
  switch (action.type) {
    case 'SET_NOTI': {
      state = action.data
      return state
    }

    case 'SET_NOTI_NULL': {
      return ''
    }

    default: return state
  }

}

export const setNoti = (noti, time) => {
  return async dispatch => {
    await dispatch({
      type: 'SET_NOTI',
      data: noti
    })
    setTimeout(() => {
      dispatch({
        type: 'SET_NOTI_NULL'
      })
    }, 5000)
  }
}

export const setNotiNull = () => {
  return {
    type: 'SET_NOTI_NULL'
  }
}
export default reducer