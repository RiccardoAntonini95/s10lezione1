import { Button, ListGroup } from 'react-bootstrap'

const headerAuth = {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTliZjkyZGUwZGQxZDAwMTgyZDE3MzQiLCJpYXQiOjE3MDQ3MjA2ODUsImV4cCI6MTcwNTkzMDI4NX0.FMB9-4UP4aGTvZNZwyRowLKitFA64t8Q8gQ2gt6sQF0"}


const SingleComment = ({ comment }) => {
  const deleteComment = async (asin) => {
    try {
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments/' + asin,
        {
          method: 'DELETE',
          headers: headerAuth
        }
      )
      if (response.ok) {
        alert('Comment was deleted successfully!')
      } else {
        alert('Error - comment was NOT deleted!')
      }
    } catch (error) {
      alert('Error - comment was NOT deleted!')
    }
  }

  return (
    <ListGroup.Item>
      {comment.comment}
      <Button
        variant="danger"
        className="ml-2"
        onClick={() => deleteComment(comment._id)}
      >
        Delete
      </Button>
    </ListGroup.Item>
  )
}

export default SingleComment
