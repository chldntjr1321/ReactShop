import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
//import { changeAge } from './../store/userSlice.jsx';
import { countUp, deleteItem } from '../store/cartSlice.jsx';

function Cart() {
  let state = useSelector((state) => state);
  let cart = useSelector((state) => state.cart);
  let dispatch = useDispatch();

  return (
    <div>
      {state.user.name} 님의 장바구니
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
            <th>상품 삭제</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((a, i) => (
            //return이랑 중괄호는 동시에 생략 가능
            <tr key={i}>
              <td>{cart[i].id}</td>
              <td>{cart[i].name}</td>
              <td>{cart[i].count}</td>
              <td>
                <button
                  onClick={() => {
                    dispatch(countUp(cart[i].id));
                  }}
                >
                  +
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    dispatch(deleteItem(cart[i].id));
                  }}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
