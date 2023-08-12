import { useState } from 'react'

const Header = (props) => {
  return(
    <h2>{props.text}</h2>
  )
}

const Button = (props) => {

  const handleButton = () => {
    props.set(props.state + 1);
  }

  return(
    <button onClick={handleButton}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.state}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad, total, average, positivePercentage }) => {
  return (
    <>
      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            <StatisticLine text="good" state={good} />
            <StatisticLine text="neutral" state={neutral} />
            <StatisticLine text="bad" state={bad} />
            <StatisticLine text="all" state={total} />
            <StatisticLine text="average" state={average} />
            <StatisticLine text="positive" state={`${positivePercentage}%`} />
          </tbody>
        </table>
      )}
    </>
  );
};


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad;
  const average = (good - bad) / total || 0;
  const positivePercentage = (good / total) * 100 || 0; //to prevent NaN

  return (
    <div>
      <Header text="give feedback"/>
      <Button text = "good" set = {setGood} state={good}/>
      <Button text = "neutral" set = {setNeutral} state={neutral}/>
      <Button text = "bad" set = {setBad} state={bad}/>
      <Header text="statistics"/>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positivePercentage={positivePercentage}
      />
    </div>
  )
}

export default App