import React, { useState } from 'react'
import { signIn, getAuth } from '../../firebase/firebase.js';

export const Login = ({ handleLogin }) => {
    const [loginId, setLoginId] = useState()

    getAuth();
    signIn();


    return (
        <div>
            <div>Login</div>
            <form onSubmit={() => {
                    sessionStorage.setItem('id', 'value');
                handleLogin(loginId)
            }}>
                <input onChange={(e) => setLoginId(e.target.value)} />
                <button type="submit">ログイン</button>
            </form>
        </div>
    ) 
}