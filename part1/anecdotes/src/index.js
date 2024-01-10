import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Title =({title})=> {
  return(
    <div>
      <h1>{title}</h1>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.click}>{props.text}</button>
  )
}

const Anecdotes = ({anecdote,votes})=>{
  return(
    <div>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  )
}


const App = (props) => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
  

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));



  const ClickFunction = ()=>{
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const Vote = ()=>{
    const copy = { ...votes}
    copy[selected] += 1;
    setVotes(copy) 
  }

  var mayor = [];

  const MostVotes = ()=>{

    const copy = {...votes}

    const entries = Object.entries(copy);
    mayor = [entries[0][0], entries[0][1], 0]
    
    entries.forEach(([key, value, index]) => {
      if (value > mayor[1]) {
        mayor = [key, value];
      }
    });

  }

  MostVotes()
  return (
    <div>
      <Title title="Anecdote of the day"/>
      <Anecdotes anecdote={anecdotes[selected]} votes={votes[selected]}/>
      <Button click={Vote} text="Vote" />
      <Button click={ClickFunction} text="Next anecdote"/>


      <Title title="Anecdote with most votes"/>
      <Anecdotes anecdote={anecdotes[mayor[0]]} votes={votes[mayor[0]]}/>


    </div>
  )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)