import React from 'react';
import {Outlet} from 'react-router-dom';
import '../assets/css/HomeStyle.css'
import {useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { logout, withdraw } from '../stores/store';


function Home(props) {

    const [isActive, setIsActive] = useState(false);

    const navigate = useNavigate();

    //장바구니에 아이템 몇개 들어갔는지 보여주기
    const cartItems = useSelector((state) => { return state.cartItems} )
    const [quantity, setQuantity] = useState(0); 

    const user = useSelector((state) => { return state.user} ); // 사용자 로그인 했는지
    const dispatch = useDispatch();

    const logoutBtn = () =>{
        
        if(confirm('로그아웃 하시겠습니까?')){
            dispatch(logout(user));
            navigate('/');
        }
    }

    //장바구니에 아이템 몇개 들어갔는지 보여주기
   useEffect(()=>{
    if(user.isLogin && cartItems.length > 0){
        let quant = cartItems.map(x => x.quantity).reduce((a,b) => a+b,0);
        setQuantity(quant);
    }else{
        setQuantity(0); // 로그아웃 했거나 장바구니가 비었을 때 0으로
    }
   },[cartItems, user]) // user도 의존성에 추가

   const withdrawBtn = () =>{
    if(confirm('정말 회원탈퇴를 진행하시겠습니까?')){
          dispatch(withdraw(user));
          dispatch(logout(user));
          alert('탈퇴되었습니다.');
    }
  
   }

    return (
        <div className='app-container'>
            <header className='header'>
                <nav className='nav-container'>
                    <div className='logo-box'>
                        <div onClick={() => navigate('/')}>Hike</div>
                    </div>
                    <div className="nav-box">
                        <div>New</div>
                        <div>Men</div>
                        <div>Women</div>
                        <div>Kids</div>
                    </div>
                    <div className='my-box'>
                        {
                            user.isLogin? 
                             <div onClick={logoutBtn}>로그아웃</div>
                             :
                             <div onClick={()=> navigate('/login')}>로그인</div>
                        }
                        <div onClick={()=> navigate('cart')}>{`장바구니(${quantity})`}</div>
                         {
                            user.isLogin? 
                             <div className='withdraw-box'>
                               <div onClick={() => setIsActive(!isActive)}>🧑‍💼</div>
                                <div className={`withdraw-btn ${isActive? 'active': ''}`}  onClick={withdrawBtn}>
                                    회원탈퇴
                                </div>
                            
                             </div> 
                             :
                             ''
                        }
                    </div>
                </nav>
            </header>
            <div className='main-box'>
                <Outlet/>
            </div>
    </div>
    );
}

export default Home;