import React from 'react';
import ReactDOM from 'react-dom';


const Header = (props) => {
  console.log(props)
  return (
      <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <Part name = {props.parts[0]["name"]} exercises = {props.parts[0]["exercises"]} />
      <Part name = {props.parts[1].name} exercises = {props.parts[1].exercises} />
      <Part name = {props.parts[2].name} exercises = {props.parts[2].exercises} />

    </div>
    
  )
}

const Part = (part) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Total = (props) => {
  var total = sum(props.parts)
  return (
    <p>Number of exercises {total}</p>
  )
}

function sum(array) {
  var sum = 0
  array.forEach(element => {
    sum += element.exercises    
  });
  return sum;
}

//export default index;

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts} />
      <Total parts={parts} />    
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
