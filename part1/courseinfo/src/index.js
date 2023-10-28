import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props)=>{
  return(
    <h1>{props.course}</h1>
  )
}

const Part = (props)=>{
  return(
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Content = (props)=> {
  return (
    <div>
      <Part part={props.info[0].part}  exercises={props.info[0].exercises}/>
      <Part part={props.info[1].part}  exercises={props.info[1].exercises}/>
      <Part part={props.info[2].part}  exercises={props.info[2].exercises}/>
    </div>
  )
}

const Total = (props)=>{
  return (
    <p>Number of exercises {props.info[0].exercises + props.info[1].exercises + props.info[2].exercises}</p>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const info = [
    {part: part1, exercises: exercises1},
    {part: part2, exercises: exercises2},
    {part: part3, exercises: exercises3}
  ] 
  return (
    <div>
      <Header course={course}/>

      <Content info={info}/>
      <Total info = {info}/>

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))