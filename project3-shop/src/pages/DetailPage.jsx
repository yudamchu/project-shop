import React from 'react';
import { useEffect } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import { fetchProducts } from '../services/ProductService';
import { useState } from 'react';
import '../assets/css/DetailPageStyle.css';
import {useDispatch, useSelector} from 'react-redux';
import { addCart } from '../stores/store';

function DetailPage(props) {

    const user = useSelector((state) => state.user);
    let dispatch = useDispatch();

    const navigate = useNavigate();

    const [product, setProduct] = useState([]);//제품 리스트
    const { id } = useParams(); //✅
    const [count, setCount] = useState(1);//수량 상태
    const [selectSize, setSelectSize] = useState(240); //선택한 사이즈 담기
    

     //제품 정보 가져오기⭐️
    useEffect(() => {
        async function callData(params) {
            try{
                const prods = await fetchProducts();
                  const product = prods.find(x => x.id === Number(id)); //✅왜 Number?
                  setProduct(product);
                  console.log('렌더링2');
            }catch(error){
                console.log('호출 에러');
            }  
        } 
        callData();
    }, []);

    console.log('렌더링');
    //제품 사이즈 담은 배열
    const size = Array.from({length: 15},(_,i)=> 240+5*i);

    //수량
    const increase = () => setCount(count + 1);

    const decrease = () => {
        if (count > 1) setCount(count - 1); // 최소 1개
    };
   
    //비동기 처리
    if(!product){
        return <div>로딩중..</div>
    }


    //장바구니
    const addItemBtn = () => {

        if(!user.isLogin){
            if(confirm('로그인 후 사용할 수 있습니다. 로그인 하시겠습니까?')){
                navigate('/login');
            } 
        }else{
            const newItem = {
            ...product, 
            size: selectSize,
            quantity: count, 
        }

            dispatch(addCart(newItem));

            console.log(newItem);
            alert('장바구니에 상품이 추가되었습니다.');
        }
    }
    
    return (
        <>
            <div className='total-container'>
            <div className='detail-container'>
                <img src={`https://codingapple1.github.io/shop/shoes${product.id}.jpg`}/>
                <div className='detail-box'>
                    <h2>{product.title}</h2>
                    <span className='content'>{product.content}</span>
                    <span>{product.price} 원</span>
                    <div className='order-info'>
                        <label>사이즈 선택 
                        <br></br>
                        <select className='select-box' onChange={(e) => setSelectSize(e.target.value)}>
                            {
                                size?.map((x,i) => (
                                    <option key={i} value={x}>{x}</option>
                                ))
                            }
                        </select>
                        </label>
                        <div className='quant'>
                            <label>수량</label>
                            <button type='button' onClick={decrease}>-</button>
                            <span>{count}</span>
                            <button type='button' onClick={increase}>+</button>
                        </div>
                    </div>
                    <div className='btn-box'>
                        <button type='button' className='wish-btn' onClick={addItemBtn}>장바구니</button>
                        <button type='button' className='order-btn'>주문하기</button>
                    </div>
                </div>
            </div> 
                <div className='tap-container'>
                    <ul>
                        <li id='1'>상품 상세</li>
                        <li id='2'>리뷰</li>
                        <li id='3'>Q&A</li>
                    </ul>
                </div>                
            </div>
        </>
    );
}

export default DetailPage;