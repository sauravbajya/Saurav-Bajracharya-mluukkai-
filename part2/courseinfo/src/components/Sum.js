import React from 'react'

const Sum = ({ courseParts }) => {
  const total = courseParts
    .map((exercise) => exercise.exercises)
    .reduce((sum, exercise) => sum + exercise, 0)
  return (
    <>
      <h4>total of {total} exercises</h4>
    </>
  )
}
export default Sum
