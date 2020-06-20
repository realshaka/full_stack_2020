import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Statistic = (props) => {
  return (
    <div>
      {props.text} {props.value}
    </div>
  )
}

const Statistics = (props) => {
  if(props.sum === 0) {
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
      <Statistic text="good" value={props.good}/>
      <Statistic text="neutral" value={props.neutral}/>
      <Statistic text="bad" value={props.bad}/>
      <Statistic text="all" value={props.sum}/>
      <Statistic text="average" value={props.avg}/>
      <Statistic text="positive" value={props.positiveRate}/>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)
const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const sum = good  + neutral + bad
  const avg = (good - bad) / sum || 0
  const positiveRate = (good / sum) + "%" || 0

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button onClick = {() => setGood(good + 1)} text="good"/>
        <Button onClick = {() => setNeutral(neutral + 1)} text="neutral" />
        <Button onClick = {() => setBad(bad + 1)} text="bad"/>
        <Statistics good={good} 
                    neutral={neutral} 
                    bad={bad} 
                    sum={sum} 
                    avg={avg} 
                    positiveRate={positiveRate}/>
      </div>
    </div>
  )
}

ReactDOM.render(<App/>,
  document.getElementById('root')
);

