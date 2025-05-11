import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Nav from 'react-bootstrap/Nav';

// let YellowBtn = styled.button`
//   background: ${(props) => props.bg};
//   color: ${(props) => (props.bg == 'blue' ? 'white' : 'black')};
//   padding: 10px;
// `;

function Detail(props) {
  let { id } = useParams();
  let findId = props.shoes.find(function (x) {
    return x.id == id;
  });
  let [alert, setAlert] = useState(true);
  let [input, setInput] = useState('');
  let [tab, setTab] = useState(0);

  useEffect(() => {
    let a = setTimeout(() => {
      setAlert(false);
    }, 2000);
    return () => {
      clearTimeout(a);
    };
  }, []);
  useEffect(() => {
    {
      isNaN(input) ? window.alert('그러지마세요') : null;
    }
  }, [input]);

  return (
    <div className="container">
      {alert == true ? (
        <div className="alert alert-warning">2초 이내 구매시 할인</div>
      ) : null}
      {/* <YellowBtn bg="blue">버튼</YellowBtn>
      <YellowBtn bg="orange">버튼</YellowBtn> */}
      <div className="row">
        <div className="col-md-6">
          <img
            src={
              'https://codingapple1.github.io/shop/shoes' +
              (findId.id + 1) +
              '.jpg'
            }
            width="100%"
          />
        </div>
        <input
          style={{ width: '50%', display: 'block', margin: '0 auto' }}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <div className="col-md-6">
          <h4 className="pt-5">{findId.title}</h4>
          <p>{findId.content}</p>
          <p>{findId.price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            eventKey="link0"
            onClick={() => {
              setTab(0);
            }}
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link1"
            onClick={() => {
              setTab(1);
            }}
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="link2"
            onClick={() => {
              setTab(2);
            }}
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} />
    </div>
  );
}
function TabContent({ tab }) {
  // if (tab == 0) {
  //   return <div>내용0</div>;
  // } else if (tab == 1) {
  //   return <div>내용1</div>;
  // } else if (tab == 2) {
  //   return <div>내용2</div>;
  // }
  return [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab];
}

export default Detail;
