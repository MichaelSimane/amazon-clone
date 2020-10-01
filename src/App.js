import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route }
from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import { auth } from './firebase';
import { useStateValue } from './StateProvider';
import Payment from './Payment';
import { loadStripe, loadstripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Orders';

const promise = loadStripe(
  "pk_test_51HWL9fAIN1ggyqv7aKjK7HwCdAnrhtMaYJhVEMgIhv5GXbPJC67qRYI2Bbx0MYdVh8cdqrpkYPIb38eMmnY5HPph00Ot4B2ouN"
);

function App() {

  const [{}, dispatch] = useStateValue();

  useEffect(() => {
  //  will only run once when the app component loads   
    auth.onAuthStateChanged(authUser => {
      console.log('the user is >>> ', authUser);
      if (authUser) {
        // the user just logged in / the user was logged in 

        dispatch({
          type: 'SET_USER',
          user: authUser
        })
      }else {
        // the user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })
  }, [])

  return (
    // BEM
    <Router>
      <div className="App">
        
        <Switch>
               {/* is like url in django and the default route should be at the bottom */}
          <Route path='/orders'> 
            <Header/>           
            <Orders/>            
          </Route>

          <Route path='/login'>            
            <Login/>            
          </Route>

          <Route path='/checkout'> 
            <Header/>           
            <Checkout/>
          </Route>

          <Route path='/payment'> 
            <Header/>    
            <Elements stripe={promise}>
              <Payment/>
            </Elements>       
            
          </Route>  

          <Route path='/'>   
            <Header/>         
            <Home />
          </Route>          
        </Switch>  
      </div>
    </Router>
  );
}

export default App;
