import { configureStore, createSlice } from '@reduxjs/toolkit'

//상태 값 생성

//장바구니 slice
  let cartItems = createSlice({
        name: 'cartItems', //상태 변수명
        initialState:[], //초기 값
        //함수 저장소
        reducers: {

          //장바구니 로드
            loadCart(state, action){
              return action.payload;
            },
          //장바구니 추가
            addCart(state, action) {
              const info = action.payload; // payload 구조 분리✅
              const idx = state.findIndex(x => 
                x.id === info.id && x.size === info.size
              );

            if (idx !== -1) {
              // 이미 있는 상품 + 같은 사이즈라면 수량만 증가
            state[idx].quantity += info.quantity;
            } else {
              // 없으면 새로 추가
              state.push(info);
            }
        },
        //장바구니에서 삭제
         deleteItem(state, action){
           const item = action.payload;
           return state.filter(x=> x.id !== item.id || x.size !== item.size);
         },

        //장바구니에서 수량 수정
        incQuantity(state, action){
          const item = action.payload;
          const idx = state.findIndex(x => x.id === item.id && x.size === item.size);
          state[idx].quantity += 1;
        },

        decQuantity(state, action){
          const item = action.payload;
          const idx = state.findIndex(x => x.id === item.id && x.size === item.size);
          state[idx].quantity -= 1;

          if(state[idx].quantity <= 0){
            confirm('장바구니에서 삭제하시겠습니까?') ?  state.splice(idx,1): state[idx].quantity=1 ;
           
          }
        }


      }
  });

  //사용자 slice
  let user = createSlice({
    name: 'user',
    initialState: {id: null, pwd: null, phone: '', address: '', isLogin: false},
    reducers:{
      signup(state, action){
         const info = action.payload;

         let users = JSON.parse(localStorage.getItem("users")) || [];

         let exist = users.find(x => x.phone === info.phone);
         if(exist){
             throw new Error("이미 존재하는 이메일입니다.");
         }

         users.push(info);
         localStorage.setItem("users", JSON.stringify(users));

      },

      login(state, action){
        const info = action.payload;
        
        let users = JSON.parse(localStorage.getItem("users")) || [];
        
        let found = users.find(x => x.phone === info.phone);
         if(!found){
             throw new Error("존재하지 않는 회원입니다.");
         }

         state.id = info.id;
         state.pwd = info.pwd;
         state.address = info.address;
         state.phone = info.phone;
         state.isLogin = true;
      },

      logout(state, action){
        const info = action.payload;

         state.id = null;
         state.pwd = null;
         state.address = '';
         state.phone = '';
         state.isLogin = false;

      },

      withdraw(state, action){
        const users = JSON.parse(localStorage.getItem('users'));
        const info = action.payload;
        const idx = users.findIndex(x => x.phone === info.phone);

        users.splice(idx,1);
        localStorage.setItem("users", JSON.stringify(users));

      }
    }
  })

//함수 값 등록
export let {loadCart, addCart, deleteItem, incQuantity, decQuantity} = cartItems.actions;
export let {signup, login, logout, withdraw} = user.actions;

//상태 값 등록
/*export default configureStore({
  reducer: { 
    cartItems: cartItems.reducer,
    user: user.reducer
  }
}) */
//추가 작업이 필요하기 때문에 해당 slice들 변수에 담은 후 export 하기
const store = configureStore({
  reducer: {
    cartItems: cartItems.reducer,
    user: user.reducer
  }
});


// 🛠 상태 변경 감지해서 localStorage에 사용자별 저장 
store.subscribe(() => {
  const state = store.getState();
  if (state.user.isLogin) {
    localStorage.setItem(`cart_${state.user.phone}`, JSON.stringify(state.cartItems));
  } else {
    // 로그아웃한 경우 => cartItems 초기화
    localStorage.removeItem(`cart_${state.user.phone}`);
  }
});

export default store;