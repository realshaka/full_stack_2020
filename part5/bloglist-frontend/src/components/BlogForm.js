import React from 'react'

const BlogForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
				<div>
					title: <input name = "title" value={props.title} onChange={props.handleBlogChange}/>
				</div>
				<div>
					author: <input name = "author" value={props.author} onChange={props.handleBlogChange}/>
				</div>
        <div>
					url: <input name = "url" value={props.url} onChange={props.handleBlogChange}/>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
		</form>
  )
}

export default BlogForm