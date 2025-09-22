import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import DetailPage from './pages/DetailPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import JoinPage from './pages/JoinPage';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}>
          <Route index element={<ProductsPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/join' element={<JoinPage/>}/>
          <Route path='detail/:id' element={<DetailPage/>}/> {/*✅ */}
          <Route path='cart' element={<CartPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
