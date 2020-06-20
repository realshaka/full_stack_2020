import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Statistic = (props) => {
  if(props.sum == 0) {
    return (
      <div>
        <h1>Statistic</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>Statistic</h1>
      <p>all {props.sum}</p>
      <p>average {props.avg}</p>
      <p>positive {props.positiveRate}%</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const sum = good  + neutral + bad
  const avg = (good - bad) / sum || 0
  const positiveRate = good / sum || 0

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <button onClick = {() => setGood(good + 1)}>good</button>
        <button onClick = {() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick = {() => setBad(bad + 1)}>bad</button>
        <Statistic sum={sum} avg={avg} positiveRate={positiveRate}/>
      </div>
    </div>
  )
}

ReactDOM.render(<App/>,
  document.getElementById('root')
);

