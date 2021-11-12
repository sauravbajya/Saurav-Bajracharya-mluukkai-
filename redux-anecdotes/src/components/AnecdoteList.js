import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteToId } from "../reducers/anecdoteReducer";
import { notify } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick}) => {
    return (
        <li >
            {anecdote.content} <br />
            has {anecdote.votes}
            <button onClick={handleClick}>vote</button>
        </li>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        return filter === 'ALL'
            ? anecdotes
            : anecdotes.filter(anecdote => anecdote.content.includes(filter))  
    })

    const voteID = (anecdote) => {
        dispatch(voteToId(anecdote))
        dispatch(notify(`you voted '${anecdote.content}'`,10))
    }
    
    return (
        <ul>
            {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={()=>voteID(anecdote)}
                />
      )}
        </ul>
    )
}

export default AnecdoteList