import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useNavigate} from 'react-router-dom';
import '../assets/css/JoinPageStyle.css';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../stores/store';

 const schema = yup.object().shape({
    name: yup.string()
        .required('이름을 입력하세요')
        .matches(/^[가-힣]+$/, '국문으로 성함을 입력하세요.'),
    phone: yup.string()
        .required('휴대폰번호를 입력하세요')
        .matches(/^[0-9]+$/, '숫자만 입력하세요'),
    id: yup.string()
        .required('아이디를 입력하세요')
        .matches(/^[A-Za-z]+$/, '아이디는 영문으로 입력하세요.'),
    pwd: yup.string()
        .required('비밀번호를 입력하세요')
        .matches(/^\d{6}$/, '비밀번호는 숫자 6자리로 입력하세요.'),
    pwdConfirm: yup.string()
        .trim()
        .required('패스워드를 확인하세요')
        .oneOf([yup.ref('pwd'), null], '패스워드 확인이 일치하지 않습니다.')
});

function JoinPage(props) {

    //react-form-hook 사용을 위해 useForm(handleSubmit, register, errors)선언
    const { register, handleSubmit, formState: { errors } } =  useForm({
        resolver: yupResolver(schema),
        mode: "onChange",    // ✅ 타이핑하면서 에러 체크
    });

    const navigate = useNavigate();

     const dispatch = useDispatch();
    // const user = useSelector((state) => { return state.user} );

    const joinBtn = (data) =>{
        try {
           dispatch(signup({ name: data.name, phone: data.phone, id: data.id, pwd: data.pwd, }));
            alert('회원가입이 완료되었습니다!');
            navigate('/');

        } catch (error) {
            alert(error.message);
        }
       
    };
    
    return (
        <div className='join-container'>
            <form className='join-form' onSubmit={handleSubmit(joinBtn)}>
            <h2>회원가입</h2>
            <label className='label-box'>이름
                <input {...register('name')} type='text' placeholder="이름을 입력하세요" />
                {errors.name&& 
                <p style={{color: 'red'}}>{errors.name.message}</p>}
            </label>
              <label className='label-box'>휴대폰 번호
                <input {...register('phone')} type='text' placeholder="휴대폰번호를 입력하세요" />
                {errors.phone&& 
                <p style={{color: 'red'}}>{errors.phone.message}</p>}
            </label>
            <label className='label-box'>아이디
                 <input {...register('id')} placeholder="영문 아이디 입력" />
                {errors.id&& 
                <p style={{color: 'red'}}>{errors.id.message}</p>}
            </label>
            <label className='label-box'>비밀번호
                <input type="password" {...register('pwd')} 
                placeholder="비밀번호 입력" 
                />
                {errors.pwd&& 
                <p style={{color: 'red'}}>{errors.pwd.message}</p>}
            </label>
            <label className='label-box'>비밀번호 확인
            <input type="password" {...register('pwdConfirm')} 
                placeholder="입력한 비밀번호와 동일하게 입력" 
                />
            {errors.pwdConfirm&& 
                <p style={{color: 'red'}}>{errors.pwdConfirm.message}</p>}
            </label>
            <button type='submit' className='loginBtn'>회원가입</button>
        </form>
        </div>
    );
}

export default JoinPage;