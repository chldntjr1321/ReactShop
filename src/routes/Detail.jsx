import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice.jsx';
import { useLike } from '../hooks/like.jsx';
import { useUser } from '../hooks/username.jsx';

function Detail(props) {
  let { id } = useParams();
  let findId = props.shoes.find(function (x) {
    return x.id == id;
  });
  let [alert, setAlert] = useState(true);
  let [input, setInput] = useState('');
  let [tab, setTab] = useState(0);
  let [fade2, setFade2] = useState('');
  let dispatch = useDispatch();

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
  useEffect(() => {
    let a = setTimeout(() => {
      setFade2('end');
    }, 100);

    return () => {
      clearTimeout(a);
      setFade2('');
    };
  }, []);
  useEffect(() => {
    let jsonObj = localStorage.getItem('watched');
    jsonObj = JSON.parse(jsonObj);
    jsonObj.push(findId.id);
    jsonObj = new Set(jsonObj);
    jsonObj = Array.from(jsonObj);
    localStorage.setItem('watched', JSON.stringify(jsonObj));
  }, []);

  let [like, addLike] = useLike();
  let name = useUser();

  return (
    <div className={`container start ${fade2}`}>
      {alert == true ? (
        <div className="alert alert-warning">2초 이내 구매시 할인</div>
      ) : null}
      {name}
      {like}
      <span
        onClick={() => {
          addLike();
        }}
      >
        ❤️
      </span>
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
          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch(
                addItem({
                  id: findId.id,
                  name: findId.title,
                  count: 1,
                })
              );
              window.alert('상품이 장바구니에 추가되었습니다!');
            }}
          >
            주문하기
          </button>
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
  let [fade, setFade] = useState('');
  useEffect(() => {
    let a = setTimeout(() => {
      setFade('end');
    }, 100);

    return () => {
      clearTimeout(a);
      setFade('');
    };
  }, [tab]);
  return (
    <div className={`start ${fade}`}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}
    </div>
  );
}

export default Detail;
