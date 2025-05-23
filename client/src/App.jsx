import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './components/Login'
import { AppContext } from './context/AppContext'
import PaymentVerify from './pages/PaymentVerify';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import BGRHome from './pages/BGRHome';
import BGRresult from './pages/BGRresult';

const App = () => {
  const {showLogin, setShowLogin} = useContext(AppContext)




  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>
     <ToastContainer position='bottom-right'></ToastContainer>
      <Navbar></Navbar>
      {showLogin && <Login></Login>}
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/result' element={<Result></Result>}></Route>
        <Route path='/buy-credit' element={<BuyCredit></BuyCredit>}></Route>
        <Route path='/payment-redirect' element= {<PaymentVerify></PaymentVerify>}></Route>
        <Route path='/payment-success' element= {<PaymentSuccess></PaymentSuccess>}></Route>
        <Route path='/payment-failed' element= {<PaymentFailed></PaymentFailed>}></Route>
        <Route path='/bgr-home' element= {<BGRHome></BGRHome>}></Route>
        <Route path='/bgr-result' element={<BGRresult></BGRresult>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  )
}

export default App