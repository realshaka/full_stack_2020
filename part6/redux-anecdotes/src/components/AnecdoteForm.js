import React from 'react'
import { useDispatch } from 'react-redux'
import { createQuote } from '../reducers/anecdoteReducer'
import { setNoti } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addQuote = (event) => {
    event.preventDefault()
    const quote = event.target.quote.value
    event.target.quote.value = ''
    if (quote !== '') {
      dispatch(createQuote(quote))
      popNoti(quote)
    }
  }

  const popNoti = (quote) => {
    dispatch(setNoti('You create \'' + quote + '\''))
    setTimeout(
      () => {
        dispatch(setNoti(''))
      }, 5000
    )
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addQuote}>
        <div><input name='quote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>


  )
}

export default AnecdoteForm