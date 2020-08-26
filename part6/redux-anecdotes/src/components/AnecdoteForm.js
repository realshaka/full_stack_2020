import React from 'react'
import { useDispatch } from 'react-redux'
import { createQuote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addQuote = (event) => {
    event.preventDefault()
    const quote = event.target.quote.value
    event.target.quote.value = ''
    dispatch(createQuote(quote))
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