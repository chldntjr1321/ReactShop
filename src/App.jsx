import { lazy, Suspense, useEffect, useState } from 'react';
import './App.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import data from './data.jsx';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
// import Detail from './routes/Detail.jsx';
// import Cart from './routes/Cart.jsx';
const Detail = lazy(() => import('./routes/Detail.jsx'));
const Cart = lazy(() => import('./routes/Cart.jsx'));

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [morebtn, setMoreBtn] = useState(true);
  let [btncount, setBtncount] = useState(0);
  let [loadingUI, setLoadingUI] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('watched')) {
      return;
    } else localStorage.setItem('watched', JSON.stringify([]));
  }, []);

  let result = useQuery({
    queryKey: ['작명'],
    queryFn: () => {
      return axios
        .get('https://codingapple1.github.io/userdata.json')
        .then((a) => {
          console.log('요청됨');
          return a.data;
        });
    },
  });

  return (
    <div className="App">
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/">Woo's Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate('/');
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/detail/0');
              }}
            >
              Details
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/cart');
              }}
            >
              Cart
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {result.isLoading && '로딩중'}
            {result.error && '에러남'}
            {result.data && result.data.name}
          </Nav>
        </Container>
      </Navbar>

      {/* 링크 생성하는 방법 중 하나? */}
      {/* <Link to="/">홈</Link>
      <Link to="/detail">상세페이지</Link> */}

      <Suspense fallback={<div>로딩중임</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="main-bg"></div>

                <Container>
                  <Row>
                    {shoes.map(function (a, i) {
                      return (
                        <Goods
                          shoes={shoes[i]}
                          i={i}
                          navigate={navigate}
                          key={i}
                        />
                      );
                    })}
                  </Row>
                </Container>
                {loadingUI == true ? <Loading /> : null}
                {morebtn == true ? (
                  <button
                    onClick={() => {
                      if (btncount >= 2) {
                        alert('상품이 더이상 없습니다!');
                        setMoreBtn(false);
                        return;
                      }
                      let count = btncount + 1;
                      setBtncount(count);
                      setLoadingUI(true);
                      axios
                        .get(
                          'https://codingapple1.github.io/shop/data' +
                            (count + 1) +
                            '.json'
                        )
                        .then((result) => {
                          let newShoes = [...shoes, ...result.data];
                          setShoes(newShoes);
                          setLoadingUI(false);
                        })
                        .catch(() => {
                          setLoadingUI(false);
                          console.log('실패함');
                        });
                    }}
                  >
                    더보기
                  </button>
                ) : null}
              </>
            }
          />

          <Route path="/detail/:id" element={<Detail shoes={shoes} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<div>없는 페이지요</div>} />
          <Route path="/about" element={<About />}>
            <Route path="member" element={<div>멤버임</div>} />
            <Route path="location" element={<div>로케이션임</div>} />
          </Route>
          <Route path="/event" element={<Event />}>
            <Route path="one" element={<div>첫 주문 시 양배추즙 서비스</div>} />
            <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

function Goods({ shoes, i, navigate }) {
  return (
    <Col
      sm={4}
      onClick={() => {
        navigate('/detail/' + i);
      }}
    >
      <img
        src={'https://codingapple1.github.io/shop/shoes' + (i + 1) + '.jpg'}
        width="80%"
      />
      <h5>{shoes.title}</h5>
      <p>{shoes.price}</p>
    </Col>
  );
}

function Loading() {
  return (
    <div>
      <h4>로딩 중입니다아ㅏㅏ</h4>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  );
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  );
}

export default App;
