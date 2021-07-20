import React from 'react'
import Part from './Part'

const Content = ({ courseParts }) => {
  return (
    <>
      {courseParts.map((part) => (
        <div key={part.id}>
          <Part partName={part.name} partExercise={part.exercises} />
        </div>
      ))}
    </>
  )
}

export default Content
