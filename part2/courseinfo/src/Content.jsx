
const Content = ({parts})=>{
  
    return(
      <>
      {parts.map((part, index) => (
          <Part key={index} part={part} />
        ))}
      </>
    )
  }
  
  const Part = ({part})=>{
    return(
      <>
        <p>{part.name} {part.exercises}</p>
      </>
    )
  }
  
  const Total= ({parts})=>{
    const exercises = parts.map((part,index)=>(part.exercises))
    const sum = exercises.reduce((acc, element) => acc + element, 0);
  
    return(
      <>
          <p><b>Total of {sum} exercises</b></p>
      </>
    )
  }
  
  
  const Header = ({name})=>{
      return(
        <>
          <h1>{name}</h1>
        </>
  
          )
  }
  
  
  
  
  const Course = ({course})=>{
      return(
        <>
          <Header name = {course.name}/>
          <Content parts= {course.parts}/>
          <Total parts={course.parts}/>
        </>
      )
  }

export default Course  