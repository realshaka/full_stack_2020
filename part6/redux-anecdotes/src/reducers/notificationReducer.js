let id = 0

const reducer = (state = '', action) => {
  console.log('action: ', action)
  switch (action.type) {
    case 'SET_NOTI': {
      id = action.data[1]
      state = action.data[0]
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
    clearTimeout(id)
    const newID = setTimeout(() => {
      dispatch(setNotiNull())
    }, time * 1000)
    dispatch({
      type: 'SET_NOTI',
      data: [noti, newID]
    })

  }
}

export const setNotiNull = () => {
  return {
    type: 'SET_NOTI_NULL'
  }
}
export default reducer