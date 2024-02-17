const Header = (props) => {
  return(
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return(
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  return(
    <div>
      <Part part={props.partsAndExercises[0].part} exercises={props.partsAndExercises[0].exercises}/>
      <Part part={props.partsAndExercises[1].part} exercises={props.partsAndExercises[1].exercises}/>
      <Part part={props.partsAndExercises[2].part} exercises={props.partsAndExercises[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  return(
    <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
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

  return (
    <div>
      <Header course={course}/>
      <Content 
        partsAndExercises={[{ part: part1, exercises: exercises1 }, {part: part2, exercises: exercises2}, {part: part3, exercises: exercises3}]} 
       />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
    </div>
  )
}

export default App