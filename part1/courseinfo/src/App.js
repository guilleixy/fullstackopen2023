const Header = ({course}) => {
  return (
    <h1>{course}</h1>
  )
}

const Part = ({part}) => {
  return(
    <p>
      {part.part}: {part.exercises} exercises
    </p>
  )
}

const Content = ({partsAndExercises}) => {
  return(
    <div>
      {partsAndExercises.map((part, index) => (
        <Part part = {part} key={index}/>
      ))}
    </div>
  )
}

const Total = ({partsAndExercises}) => {
  const totalExercises = partsAndExercises.reduce((sum, part) => sum + part.exercises, 0);

  //reduce is used to iterate through an array an reduce it to an unique value

  return (
    <p>Number of exercises {totalExercises}</p>
  );
}

const App = () => {
  const course = 'Half Stack application development'

  const partsAndExercises = [
    {
      part: 'Fundamentals of React',
      exercises: 10
    },
    {
      part: 'Using props to pass data',
      exercises: 7
    },
    {
      part: 'State of a component',
      exercises: 14
    }
  ];

  return (
    <div>
      <Header course = {course} />

      <Content partsAndExercises = {partsAndExercises}/>
      
      <Total  partsAndExercises = {partsAndExercises}/>
    </div>
  )
}

export default App