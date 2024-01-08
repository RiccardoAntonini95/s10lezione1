import { Component } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'

const headerAuth = {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTliZjkyZGUwZGQxZDAwMTgyZDE3MzQiLCJpYXQiOjE3MDQ3MjA2ODUsImV4cCI6MTcwNTkzMDI4NX0.FMB9-4UP4aGTvZNZwyRowLKitFA64t8Q8gQ2gt6sQF0"}

class CommentArea extends Component {
  state = {
    comments: [],
    start: true,
    isLoading: false,
    isError: false,
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.asin !== this.props.asin) {
      this.setState({
        start: false,
        isLoading : true,
      })
			this.getBooks();
		}
  }

  getBooks = async () => {
    try {
      let response = await fetch(
        'https://striveschool-api.herokuapp.com/api/comments/' +
          this.props.asin,
        {
          headers: headerAuth
        }
      )
      console.log(response)
      console.log("l'asin dalla fetch è:", this.props.asin)
      if (response.ok) {
        let comments = await response.json()
        this.setState({ comments: comments, isLoading: false, isError: false })
      } else {
        console.log('error')
        this.setState({ isLoading: false, isError: true })
      }
    } catch (error) {
      console.log(error)
      this.setState({ isLoading: false, isError: true })
    }
  }

  render() {
    return (
      <div className="text-center">
        {this.state.start && <p>Clicca su un libro per vedere i commenti:</p>}
        {this.state.isLoading && <Loading />}
        {this.state.isError && <Error />}
        <AddComment asin={this.props.asin} />
        <CommentList commentsToShow={this.state.comments} />
      </div>
    )
  }
}

export default CommentArea
