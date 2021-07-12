import React, { useState } from 'react'

const DisplayComponent = ({text}) => <div>{text}</div>
const Display1 = ({selected, votes, anecdotes}) =>{
  return(
    <div>
      <DisplayComponent text={anecdotes[selected]} />
      <DisplayComponent text={'has '+ votes[selected] + ' votes'}/>
    </div>
  )
}

const Display2 = ({selected, votes, anecdotes}) =>{
  if(!votes.every(item => item === 0)){
   const  highVote = votes.findIndex(item => item === Math.max(...votes))
    return(
      <div>
        <DisplayComponent text={anecdotes[highVote]} />
        <DisplayComponent text={'has '+ votes[highVote] + ' votes'}/>
      </div>
    )
  }
  return(
    <div>
      Anecdotes are not voted yet.
    </div>
  )

}


const ButtonComponent= ({text, handleClick}) => <button onClick={handleClick}>{text}</button>
const Button = ({selected, setSelected, anecdotes, votes, setVotes}) =>{
  const handleRandomDote = () => setSelected(Math.floor(Math.random() * anecdotes.length))
  const handleVoteDote = () =>{
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    setVotes(copyVotes)
  }
  return(
    <div>
      <ButtonComponent text="vote" handleClick={handleVoteDote} />
      &nbsp;
      <ButtonComponent text="next anecdote" handleClick={handleRandomDote} />
    </div>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length + 1).join('0').split('').map(parseFloat))


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Display1 selected={selected} votes={votes} anecdotes={anecdotes}/>
      <Button selected={selected} setSelected={setSelected} votes={votes} setVotes={setVotes} anecdotes={anecdotes}/>
      <h1>Anecdote with most votes </h1>
      <Display2 selected={selected} votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

export default App