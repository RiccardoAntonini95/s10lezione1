import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import MyNav from './components/MyNav'
import MyFooter from './components/MyFooter'
import MyJumbotron from './components/MyJumbotron'
import { Container, Row, Col } from 'react-bootstrap'
import BookList from './components/BookList'
import CommentArea from './components/CommentArea'
import fantasy from './data/fantasy.json'
import { Component } from 'react'

/*lo state si deve modificare al clic di un libro singolo, al clic singlebook mi deve passare l'asin qua e da qua lo mando a commentArea */
/* <SingleBook book={b} />   questo era sul padre di singlebook ovvero booklist */
/* {this.state.selected && <CommentArea asin={this.props.book.asin} />} questo era su single book*/

class App extends Component {
  state = {
    selectedAsin : undefined, //diventerà l'asin del libro che clicco su singlebook così posso passarlo a commentarea tramite prop, gli serve per fetch
  }

  getSingleAsin = singleAsin => {
    this.setState({
      selectedAsin : singleAsin
    })
  }

  render(){
    return(
      <Container>
      <MyNav />
      <MyJumbotron />
      <Row>
        <Col>
          <BookList books={fantasy} getSingleAsin={this.getSingleAsin} />
        </Col>
        <Col>
          <CommentArea asin={this.state.selectedAsin}/>
        </Col>
      </Row>
      <MyFooter />
    </Container>
    )
  }
}

export default App
