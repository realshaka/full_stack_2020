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

  const vote = (id) => {
    dispatch(voteUp(id))
    console.log('vote', id)
  }

  const popNoti = (notification) => {
    dispatch(setNoti('You voted \'' + notification + '\''))
    setTimeout(
      () => {
        dispatch(setNoti(''))
      }, 5000
    )
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
              vote(anecdote.id)
              popNoti(anecdote.content)
            }}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
