
// import './App.css';

import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Tittles = (props)=>{
  return(
    <h1>{props.tittle}</h1>
  )
}

const Buttons = (props)=>{
  return(
    <button onClick={props.onCLick}>{props.tittle}</button>
  )
}  

const Statitics = (props)=>{
  const sum = props.good + props.neutral + props.bad

  const average =()=>{
    let average = 0
    average = (props.good * 1 + props.neutral * 0 + props.bad * (-1))/sum
    return average
  }

  const Positive = () => {
    return `${parseFloat((props.good / sum) * 100)} %`;
  };

    if (sum === 0){
      return (
        <div>
          <p>No feedback given</p>
        </div>
      )
    } 
    return (
      <table>
        <tbody>
          <StatisticLine text='good' value={props.good} />
          <StatisticLine text='neutral' value={props.neutral} />
          <StatisticLine text='bad' value={props.bad} />
          <StatisticLine text='all' value={sum} />
          <StatisticLine text='average' value={average()} />
          <StatisticLine text='positive' value={Positive()}/>
        </tbody>
      </table>
    )
}


const StatisticLine = (props)=>{
  return (
    <tr>
      <td>{props.text}</td> 
      <td>{props.value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increase = (value,status)=>{
    status(value + 1)

  }

  return (
    <div>
      <Tittles tittle="Give feedback" />
      <div>
        <Buttons state={setGood} value={good} tittle="Good" onCLick={()=>{increase(good,setGood)} }/>
        <Buttons state={setNeutral} value={neutral} tittle="Neutral" onCLick={()=>{increase(neutral,setNeutral)}} />
        <Buttons state={setBad} value={bad} tittle="Bad" onCLick={()=>{increase(bad,setBad)}} />
      </div>
      <Tittles tittle = "Statistics"/>
      <div>
        {/* <Statitics tittle="Good" value={good}/>
        <Statitics tittle="Neutral" value={neutral}/>
        <Statitics tittle="bad" value={bad}/>
        <Statitics tittle="All" value={all()}/> */}
        <Statitics good={good} neutral={neutral} bad={bad}/>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)




export default App;
