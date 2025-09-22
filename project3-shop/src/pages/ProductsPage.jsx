import { useState } from 'react';
import '../assets/css/ProductPageStyle.css'
import { useEffect } from 'react';
import { fetchProducts } from '../services/ProductService';
import Product from '../components/Product';
import {useNavigate} from 'react-router-dom';



function ProductsPage(props) {

    
    const [products, setProducts] = useState([]); //서버에서 가져온 상품
    const [count, setCount] = useState(3); //현재 페이지에 보여줄 상품 개수
    const [newProducts, setNewProducts] = useState([]); //현제 페이지에 보여줄 상품 리스트
    const [isActive , setIsActive] = useState(true); //더보기버튼 유무
    
    const navigate = useNavigate();

    //서버에서 상품 가져오기
    useEffect(() => {
        fetchProducts()
            .then(data => setProducts(data))
            .catch(err => console.error(err));
    }, []);
    

    //더보기 누르면 상품 추가적으로 보여주기
    //기본 3개 보여주기
    useEffect(()=>{

        if(products.length>0){
            const p = [...products].slice(0,3);
            setNewProducts(p);
        }

    },[products]);
    
    //더보기 버튼 클릭시
    let size = 3;

    const addBtn = () =>{
        let c = count+size

        //서버에 마지막 상품 이미지가 사이즈가 달라 불가피하게 제거..
        // 마지막 상품 제거 (예: 사이즈가 다른 이미지 제거 목적)
        const filtered = products.slice(0, products.length - 1);
        
        const newP = [...filtered].slice(0, c);

        setCount(c);
        setNewProducts(newP);

        if(newP.length === filtered.length){
            setIsActive(false);
        }
    }

    const detailBtn = (id) =>{
        navigate(`/detail/${id}`); //✅
    }

    return (
        <div className='products-container'>
            <div className='img-box'>
                <picture>
                    {/* 모바일 (≤767px) */}
                    <source media="(max-width: 767px)" srcSet="/banner3.png" />
                    {/* 태블릿 (768px ~ 1023px) */}
                    <source media="(min-width: 768px) and (max-width: 1023px)" srcSet="/banner2.png" />
                    {/* 데스크탑 (≥1024px) */}
                    <source media="(min-width: 1024px)" srcSet="/banner.png" />
                    {/* 기본 fallback */}
                    <img src="/banner.png" alt="배너" className="main-img"/>
                </picture>
            </div>
            <div className='content-box'>
                <h2>상품 전체</h2>
                <div className='products-box'>
                    {
                        newProducts?.map(x => (
                            <Product i={x.id}
                            title={x.title}
                            price={x.price}
                            detailBtn={() => detailBtn(x.id)}
                            />
                        ))
                    }
                </div>
                {
                    isActive?
                    <button type='button' className='add-btn' onClick={addBtn}>더보기</button>
                    :
                    null
                }
            </div>
        </div>
    );
}

export default ProductsPage;