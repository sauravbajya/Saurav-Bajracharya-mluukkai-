import React from 'react'
import Header from './Header'
import Content from './Content'
import Sum from './Sum'

const Course = ({ courses }) => {
  return (
    <>
      {courses.map((course) => (
        <div key={course.id}>
          <Header courseName={course.name} />
          <Content courseParts={course.parts} />
          <Sum courseParts={course.parts} />
        </div>
      ))}
    </>
  )
}

export default Course
