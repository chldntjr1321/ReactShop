import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

// let YellowBtn = styled.button`
//   background: ${(props) => props.bg};
//   color: ${(props) => (props.bg == 'blue' ? 'white' : 'black')};
//   padding: 10px;
// `;

function Detail(props) {
  let [count, setCount] = useState(0);
  let { id } = useParams();
  let findId = props.shoes.find(function (x) {
    return x.id == id;
  });
  let [alert, setAlert] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAlert(false);
    }, 2000);
  }, []);

  return (
    <div className="container">
      {alert == true ? (
        <div className="alert alert-warning">2초 이내 구매시 할인</div>
      ) : null}
      {count}
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        버튼
      </button>
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
        <div className="col-md-6">
          <h4 className="pt-5">{findId.title}</h4>
          <p>{findId.content}</p>
          <p>{findId.price}</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
