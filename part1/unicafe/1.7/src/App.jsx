import { useState } from 'react'

const Feedback = ({onFeedbackClick}) => {
  return (
  <>
    <h1>Give feedback</h1>
    <button onClick={() => onFeedbackClick('good')}>good</button>
    <button onClick={() => onFeedbackClick('neutral')}>neutral</button>
    <button onClick={() => onFeedbackClick('bad')}>bad</button>
  </>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const totalAmountOfFeedbacks = good + neutral + bad;

  const calculateAverage = () => {
    return good-bad == 0 ? 0 : (Math.abs(good - bad)) / (totalAmountOfFeedbacks)
  }

  const calculatePositive = () => {
    return good < 1 ? 0 + '%' : good / totalAmountOfFeedbacks + '%';
  }

  return (
    <>
      <h1>Statistics</h1>
      <div>Good: {good}</div>
      <div>Neutral: {neutral}</div>
      <div>Bad: {bad}</div>
      <div>All: {totalAmountOfFeedbacks}</div>
      <div>Average: {calculateAverage()}</div>
      <div>Positive: {calculatePositive()}</div>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const onFeedbackClick = (type) => {
    switch (type) {
      case 'good':
        setGood(good + 1);
        break;
      case 'neutral':
        setNeutral(neutral + 1);
        break;
      case 'bad':
        setBad(bad + 1);
        break;
    }
  }

  return (
    <div>
      <Feedback onFeedbackClick={onFeedbackClick}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App;