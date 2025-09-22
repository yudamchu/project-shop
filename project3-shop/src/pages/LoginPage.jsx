import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import '../assets/css/LoginPageStyle.css';
import { useDispatch, useSelector } from 'react-redux';
import store, { loadCart, login } from '../stores/store';

function LoginPage(props) {

    const navigate = useNavigate(); //경로이동
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => { return state.cartItems} );

    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');

    //로그인버튼 클릭시
    const handleLogin = (event) =>{
        event.preventDefault();

                 
            let users = JSON.parse(localStorage.getItem("users")) || [];
            let found = users.find(x => x.id === id && x.pwd === pwd);

        try {

            dispatch(login(found));

             //해당 사용자 장바구니 가져오기 (가져오는 동시에 없으면 []만들어 'card_휴대폰 번호'를 키로 가지는 배열을 sacedCart라는 localStorage에 저장)
            const savedCart = JSON.parse(localStorage.getItem(`cart_${found.phone}`)) || [];
            store.dispatch(loadCart(savedCart));

            alert(`안녕하세요 ${found.id}님 🧸`);
            navigate('/'); //로그인시 메인페이지로 이동


        } catch (error) {
            alert(error.message); //회원가입페이지로 이동
        }
    }

    //회원가입 버튼 클릭시
    const handleJoin = () =>{
        navigate('/join');
    }
    return (
        <>
           <div className='login-container'>
                <h2>로그인</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor='userId'>아이디</label>
                <input type="text" name='userId' id='userId' 
                    placeholder="영문 이름을 입력하세요(소문자)" 
                    onChange={(e) => setId(e.target.value)} 
                />
                <label htmlFor='passwd'>비밀번호</label>
                <input type="password" name='passwd' id='passwd' 
                    placeholder="생년월일 8자리를 입력하세요" 
                    onChange={(e) => setPwd(e.target.value)} 
                />
                <button type='submit' className='loginBtn'>로그인</button>
            </form>
                <button type='button' className='joinBtn' onClick={handleJoin}>회원가입</button>
           </div> 
        </>
    );
}

export default LoginPage;