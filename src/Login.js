import { auth } from './firebase';
import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import './Login.css'
import userEvent from '@testing-library/user-event';
function Login() {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = e => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password).then(auth => {
            history.push('/')
        })
        .catch(error => alert(error.message))
        // some fancy firebase login shit
    }

    const register = e => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(email, password)
        .then((auth) => { 
            // it successfully created a new user with email and password
            console.log(auth);
            if (auth) {
                history.push('/')
            }
        })
        .catch(error => alert(error.message))
        //do some fancy firebase register shit 
    }
    return (
        <div className="login">
            <Link to='/'>
                <img className="login_logo" src="http://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"/>
            </Link>

            <div className="login_container">
                <h1>Signin</h1>
                <form action="">
                    <h5>E-mail</h5>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>

                    <h5>Password</h5>
                    <input type="password" value={password} onChange= {e => setPassword(e.target.value)}/>

                    <button type='submit' onClick={signIn} className='signinbutton'>Signin</button>

                </form>
                <p>
                    By signin in you agree to the Amazon
                     condition of use and sale.Please see our privacy notice,
                     our Cookies notice and our interstased ads notice.
                </p>

                <button onClick={register} className='registerbutton'>Create your Amazon Account</button>
            </div>
            
        </div>
    )
}

export default Login
