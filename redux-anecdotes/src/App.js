import React, { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import FilterAnecdote from './components/FilterAnecdote'
import { useDispatch } from 'react-redux'
import { initilizeAnecdotes } from './reducers/anecdoteReducer'


const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initilizeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <FilterAnecdote />
      <AnecdoteList />
     <AnecdoteForm />
    </div>
  )
}

export default App