import { useState } from 'react';
import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import data from './data.jsx';
import { Routes, Route, Link } from 'react-router-dom';
import Detail from './Detail.jsx';

function App() {
  let [shoes] = useState(data);

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Woo's Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/detail">Details</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* 링크 생성하는 방법 중 하나? */}
      {/* <Link to="/">홈</Link>
      <Link to="/detail">상세페이지</Link> */}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>
              <Container>
                <Row>
                  {shoes.map(function (a, i) {
                    return <Goods shoes={shoes[i]} i={i} />;
                  })}
                </Row>
              </Container>
            </>
          }
        />
        <Route path="/detail" element={<Detail />} />
      </Routes>
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
