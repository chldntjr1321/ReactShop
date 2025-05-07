import { useState } from 'react';
import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import data from './data.jsx';

function App() {
  let [shoes] = useState(data);

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Woo's Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Best Seller✨</Nav.Link>
            <Nav.Link href="#features">New Item👀</Nav.Link>
            <Nav.Link href="#pricing">Reviews✏️</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="main-bg"></div>
      <Container>
        <Row>
          {shoes.map(function (a, i) {
            return <Goods shoes={shoes[i]} i={i} />;
          })}
        </Row>
      </Container>
    </div>
  );
}

function Goods(props) {
  return (
    <Col sm>
      <img
        src={
          'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'
        }
        width="80%"
      />
      <h5>{props.shoes.title}</h5>
      <p>{props.shoes.price}</p>
    </Col>
  );
}

export default App;
