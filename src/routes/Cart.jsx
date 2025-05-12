import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeName } from './../store';

function Cart() {
  let state = useSelector((state) => state);
  let cart = useSelector((state) => state.cart);
  let dispacth = useDispatch();

  return (
    <div>
      {state.user}의 장바구니
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((a, i) => (
            //return이랑 중괄호는 동시에 생략 가능
            <tr key={i}>
              <td>1</td>
              <td>{cart[i].name}</td>
              <td>{cart[i].count}</td>
              <td>
                <button
                  onClick={() => {
                    dispacth(changeName());
                  }}
                >
                  +
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
