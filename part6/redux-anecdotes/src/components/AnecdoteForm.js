import React from 'react'
import { useDispatch } from 'react-redux'
import { createQuote } from '../reducers/anecdoteReducer'
import { setNoti } from '../reducers/notificationReducer'
import quoteService from '../services/quotes'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addQuote = async (event) => {
    event.preventDefault()
    const input = event.target.quote.value
    event.target.quote.value = ''
    if (input !== '') {
      const newQuote = await quoteService.createNew(input)
      dispatch(createQuote(newQuote))
      popNoti(newQuote.content)
    }
  }

  const popNoti = (quote) => {
    dispatch(setNoti('You created \'' + quote + '\''))
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