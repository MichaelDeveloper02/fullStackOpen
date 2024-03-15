
// Course
import Course from "./Content.jsx"


const App = () => {
    const course = {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1,
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2,
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4
        }
      ],
    }
  
    const nodejs = {
      id: 1,
      name: 'NodeJS',
      parts: [
        {
          name: 'Fundamentals of Node',
          exercises: 7,
          id: 1,
        },
        {
          name: 'Routing',
          exercises: 3,
          id: 2,
        },
        
      ],
    }
  


    return(
      <>
        <Course course={course} />
        <Course course={nodejs} />
      </>
    ) 
  }
  
  export default App