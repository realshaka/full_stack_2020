import React from 'react'

const Header = ({ course }) => {
	return (
		<h1>{course.name}</h1>
	)
}

const Total = ({ course }) => {
	const sum = course.parts.reduce((sum, p) => {
		return sum + p.exercises
	}, 0)
	return (
		<p><b>Total of {sum} exercises</b></p>
	)
}

const Part = ({ part }) => {
	return (
		<p>
			{part.name} {part.exercises}
		</p>
	)
}

const Content = ({ course }) => {
	return (
		<div>
			{course.parts.map(part =>
				<Part key={part.id} part={part} />
			)}
		</div>
	)
}

const Course = ({ course }) => {
	return (
		<div>
			{course.map(c =>
				<div key={c.id}>
					<Header course={c} />
					<Content course={c} />
					<Total course={c} />
				</div>
			)}
		</div>
	)
}

export default Course 