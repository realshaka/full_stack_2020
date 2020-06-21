import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const points = Array.apply(null, new Array(10)).map(Number.prototype.valueOf,0);
  const [copy, setPoints] = useState([...points])
  const voteClick = () => {
    copy[selected] += 1
    let newCopy = [...copy]
    setPoints([...copy])
    console.log(copy[selected])
  }
  return (
    <div>
      <p>{props.anecdotes[selected]}</p>
      <p>has {copy[selected]} votes</p>
      <button onClick={() => setSelected(Math.floor(Math.random() * 6))}>next anecdote</button>
      <button onClick={voteClick}>vote</button>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)