import React from 'react';
import '../assets/css/ProductStyle.css'
import { useEffect } from 'react';
import { useState } from 'react';



function Product({i, title, price, detailBtn}) {
    
    //transition 주기위함
    const [isActive, setIsActive] = useState(false);
    
    useEffect(()=>{
        setIsActive(true);
    })
  

    return (
        <>
         <div className={`product-box ${isActive? "active": ""}`} onClick={detailBtn}>
           <img src={`https://codingapple1.github.io/shop/shoes${i}.jpg`}/>
           <div className='info-box'>
                <h4>{title}</h4>
                <div>{price} 원</div>
            </div> 
          </div>   
        </>
    );
}

export default Product;