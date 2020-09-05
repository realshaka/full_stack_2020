import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'

import { setNoti } from '../reducers/notificationReducer'
import { voteUp } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {

  /* const anecdotes = useSelector(state => {
    const filter = state.filter.toLowerCase().trim()
    return state.anecdotes.filter(quote => quote.content.toLowerCase().trim().includes(filter))
  })
 */
  const filter = props.filter.toLowerCase().trim()
  const anecdotes = props.anecdotes.filter(quote => quote.content.toLowerCase().trim().includes(filter))

  anecdotes.sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()

 /*  const vote = (quote) => {
    dispatch(voteUp(quote))
    dispatch(setNoti(`you voted '${quote.content}'`, 5000))
  } */

  const vote = (quote) => {
    props.voteUp(quote)
    props.setNoti(`you voted '${quote.content}'`, 5)
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
            }}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  // sometimes it is useful to console log from mapStateToProps
  console.log('state now:', state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const ConnectedQuotes = connect(mapStateToProps, {setNoti, voteUp})(AnecdoteList)

export default ConnectedQuotes
