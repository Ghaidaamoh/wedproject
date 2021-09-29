import React, { useEffect, useState } from "react";
import superagent from "superagent";
import base64 from 'base-64';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';
import Swal from "sweetalert2";

export const LoginContext = React.createContext();
const API = 'https://wedproject-backend.herokuapp.com';// .env

export default function LoginProvider(props) {

    const [token, setToken] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    // initial render
    useEffect(() => {
        const tokenFromCookie = cookie.load('token');
        validateJwToken(tokenFromCookie);
        setToken(tokenFromCookie)

    }, []);

    const signup = async (userName, passWord, role) => {
        try {
            let userObj = {
                username: userName,
                password: passWord,
                role: role
            }
            console.log(userObj);
            const res = await superagent.post(`${API}/signup`, userObj);
            validateJwToken(res.body.token);
        } catch (error) {
            alert(error.message)
        }
    };

    const login = async (username, password) => {
        // {username: password} encoded
        //Basic base64(username:password)
        try {
            const encodedUsernameAndPassword = base64.encode(`${username}:${password}`);
            console.log("Before Request");
            console.log(username);
            console.log(password);

            const response = await superagent.post(`${API}/signin`).set('Authorization', `Basic ${encodedUsernameAndPassword}`);

            console.log(response);



            validateJwToken(response.body.token);
        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Invalid UserName or Password!'
            })
        }

    }

    const validateJwToken = (token) => {
        if (token) {
            // the user is logged in
            const user = jwt.decode(token);
            setLoginState(true, user);
            cookie.remove('token');
            cookie.save('token', token)
        } else {
            // the user is NOT logged in
            setLoginState(false, {});
        }
    }

    const setLoginState = (loggedIn, user) => {
        setLoggedIn(loggedIn);
        setUser(user);
    }

    const logout = () => {
        setLoginState(false, {});
        cookie.remove('token');
    }

    const can = (capability) => {
        return user?.capabilities?.includes(capability);
    };

    const state = {
        loggedIn,
        login,
        signup,
        logout,
        user,
        can,
        token
    }

    return (
        <LoginContext.Provider value={state}>
            {props.children}
        </LoginContext.Provider>
    )
}