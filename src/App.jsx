import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';

function App() {
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
    </div>
  );
}

export default App;
