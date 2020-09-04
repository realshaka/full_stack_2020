import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { setNoti } from '../reducers/notificationReducer'
import { voteUp } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {

  const anecdotes = useSelector(state => {
    const filter = state.filter.toLowerCase().trim()
    return state.anecdote.filter(quote => quote.content.toLowerCase().trim().includes(filter))
  })

  anecdotes.sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()

  const vote = (quote) => {
    dispatch(voteUp(quote))
    dispatch(setNoti(`you voted '${quote.content}'`, 5000))
  }

  const popNoti = (notification) => {
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {
              vote(anecdote)
              popNoti(anecdote.content)
            }}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
