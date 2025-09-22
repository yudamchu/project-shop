import React from 'react';
import '../assets/css/CartPageStyle.css';
import { useSelector, useDispatch } from "react-redux";
import {decQuantity, deleteItem, incQuantity} from '../stores/store';
import {useNavigate} from 'react-router-dom';



function CartPage() {
    
    const navigate = useNavigate();
    const cartItems = useSelector((state) => { return state.cartItems} );
    const dispatch = useDispatch();

    //수량 감소 버튼
    const decrease = (item) =>{
        dispatch(decQuantity(item))
    }
    //수량 증가 버튼
    const increase = (item) =>{
        dispatch(incQuantity(item))
    }

    //삭제 버튼
    const delBtn = (item) =>{
        dispatch(deleteItem(item));
    }

    return (
        <div className="cart-container">
            <h2>장바구니</h2>

            {/* 헤더 */}
            <div className="cart-header">
                <div>상품정보</div>
                <div>가격</div>
                <div>수량</div>
                <div>선택</div>
            </div>

            {/* 상품 행 */
            cartItems?.map((x,i) => (
            <div className="cart-row" key={i}>
                <div className="info" onClick={() =>  navigate(`/detail/${x.id}`)}>
                    <img src={`https://codingapple1.github.io/shop/shoes${x.id}.jpg`} alt="상품이미지" />
                    <div className="info-box">
                        <div className="title">{x.title}</div>
                        <div className="desc">{x.content}</div>
                        <div className="desc">{x.size}</div>
                    </div>
                </div>
                <div>{x.price}</div>
                <div>
                    <div className="quant">
                        <button type="button" onClick={() => decrease(x)}>-</button>
                        <span>{x.quantity}</span>
                        <button type="button" onClick={() => increase(x)}>+</button>
                    </div>
                </div>
                <div>
                    <button type="button" className="delete-btn" onClick={() => delBtn(x)}>X</button>
                </div>
            </div>
            ))
            
            }
            <div className='order-box'>
                <button type='button'>결제하기</button>
            </div>
        </div>
    );
}

export default CartPage;
