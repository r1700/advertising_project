import './App.css'
import BrandingSignInPage from './Component/login'
import SlotsSignIn from './Component/login'
import { Router, Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import SlotsSignUp from './Component/SignUp'
import PurchaseHistory from './Component/PurchaseHistory'
import NavSaide from './Component/navSide'
import SubScriptionsList from './Component/SubScriptionsList'
import ProductList from './Component/productList'
import ActiveRental from './Component/ActiveRental'
// import InputFileUpload, { ChooseDate } from './Component/NewRental'
import NewRental from './Component/NewRental'
// import CrudListDataGrid from './Component/Realization'
import { useLocation } from 'react-router-dom'
import AboutPageMUI from './Component/About'
import AboutPageMUI222222 from './Component/About222'
import Rel from './Component/rel'



function App() {
  const location = useLocation();

  // בדיקה אם הנתיב הוא login או signUp
  const hideNav = location.pathname === '/SignUp' || location.pathname === '/';

  return (
    <>
      <>
        {!hideNav && <NavSaide />}
        <Routes>
          <Route
            path='SignUp' element={<SlotsSignUp></SlotsSignUp>}>
          </Route>
          <Route
            path='Subscriptions' element={<SubScriptionsList></SubScriptionsList>}>
          </Route>
          <Route
            path='ProductList' element={<ProductList></ProductList>}>
          </Route>
          <Route
            path='ActiveRental' element={<ActiveRental></ActiveRental>}>
          </Route>
          <Route
            path='PurchaseHistory' element={<PurchaseHistory></PurchaseHistory>}>
          </Route>
          <Route
            path='Realization' element={<Rel></Rel>}>
          </Route>
          <Route
            path='newRental' element={<NewRental></NewRental>}>
          </Route>
          <Route
            path='about' element={<AboutPageMUI></AboutPageMUI>}>
          </Route>
          <Route
            path='about22' element={<AboutPageMUI222222></AboutPageMUI222222>}>
          </Route>   
          <Route
            path='/' element={<SlotsSignIn></SlotsSignIn>}>
          </Route>

        </Routes>



      </>

    </>
  )
}

export default App
