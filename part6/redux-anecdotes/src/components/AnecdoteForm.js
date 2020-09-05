import React from 'react'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux' 
import { createQuote } from '../reducers/anecdoteReducer'
import { setNoti } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addQuote = (event) => {
    event.preventDefault()
    const input = event.target.quote.value
    event.target.quote.value = ''
    if (input !== '') {
      props.createQuote(input)
      props.setNoti('You created \'' + input + '\'', 5)
    }
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

export default connect(null, {createQuote, setNoti} )(AnecdoteForm)