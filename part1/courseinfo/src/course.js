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
  
    const parts = [
      {part: 'Fundamentals of React', exercises: 10},
      {part: 'Using props to pass data', exercises: 7},
      {part: 'State of a component', exercises:14}
    ] 
    return (
      <div>
        <Header course={course}/>
        <Content info={parts}/>
        <Total info = {parts}/>
  
      </div>
    )
  }

  export default App;
