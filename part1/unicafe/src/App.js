import React, { useState } from 'react'

const Heading = ({ text }) => <h1>{text}</h1>

const ButtonComponent = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Buttons = ({ clicks, setClicks }) => {
  const handleGoodClick = () =>
    setClicks({ ...clicks, good: clicks.good + 1, all: clicks.all + 1 })

  const handleNeutralClick = () =>
    setClicks({ ...clicks, neutral: clicks.neutral + 1, all: clicks.all + 1 })

  const handleBadClick = () =>
    setClicks({ ...clicks, bad: clicks.bad + 1, all: clicks.all + 1 })
  return (
    <>
      <ButtonComponent text='good' handleClick={handleGoodClick} />
      <ButtonComponent text='neutral' handleClick={handleNeutralClick} />
      <ButtonComponent text='bad' handleClick={handleBadClick} />
    </>
  )
}

const StatisticsComponent = ({ value, text }) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>

  )
}

const Statistics = ({ clicks }) => {
  const handlePositivePercent = () => clicks.good * 100 / clicks.all
  const handleAverage = () => ((clicks.good * 1) + (clicks.neutral * 0) + (clicks.bad * -1)) / clicks.all
  if (clicks.all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <table>
      <StatisticsComponent value={clicks.good} text='good' />
      <StatisticsComponent value={clicks.neutral} text='neutral' />
      <StatisticsComponent value={clicks.bad} text='bad' />
      <StatisticsComponent value={clicks.all} text='all' />
      <StatisticsComponent value={handleAverage()} text='average' />
      <StatisticsComponent value={handlePositivePercent() + " %"} text='positive' />
    </table>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [clicks, setClicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
  })
  return (
    <div>
      <Heading text='give feedback' />
      <Buttons clicks={clicks} setClicks={setClicks} />
      <Heading text='statistics ' />
      <Statistics clicks={clicks} setClicks={setClicks} />
    </div>
  )
}

export default App