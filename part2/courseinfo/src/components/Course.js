const Header = ({course}) => {
    return (
      <h2>{course}</h2>
    )
  }
  
  const Part = ({part}) => {
    return(
      <p>
        {part.name}: {part.exercises} exercises
      </p>
    )
  }
  
  const Content = ({partsAndExercises}) => {
    return(
      <div>
        {partsAndExercises.map((part) => (
          <Part part = {part} key={part.id}/>
        ))}
      </div>
    )
  }
  
  const Total = ({partsAndExercises}) => {
    const totalExercises = partsAndExercises.reduce((sum, part) => sum + part.exercises, 0);
  
    //reduce is used to iterate through an array an reduce it to an unique value
  
    return (
      <p><b>Total of {totalExercises} exercises</b></p>
    );
  }
  
  const Course = ({course}) => {
    return(
      <div>
        <Header course = {course.name} />
  
        <Content partsAndExercises = {course.parts}/>
        
        <Total  partsAndExercises = {course.parts}/>
      </div>  
    )
  }
  


export default Course