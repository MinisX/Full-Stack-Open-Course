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
      {totalAmountOfFeedbacks === 0 
      ?
      (<div>No feedback given</div>)
      : 
      (<table>
        <tbody>
          <StatisticLine text='Good'value={good}/>
          <StatisticLine text='Neutral'value={neutral}/>
          <StatisticLine text='Bad'value={bad}/>
          <StatisticLine text='All'value={totalAmountOfFeedbacks}/>
          <StatisticLine text='Average'value={calculateAverage()}/>
          <StatisticLine text='Positive'value={calculatePositive()}/>
        </tbody>
      </table>)
      }
    </>
  )
}

const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addOneToState = (type) => {
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
      <Feedback onFeedbackClick={addOneToState}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App;