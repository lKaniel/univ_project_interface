import React, {useCallback, useState} from 'react';
import classes from "./Login.module.scss"
import axios from "axios";

const Login = ({checkToken}) => {

    const [state, setState] = useState({
        isLogin: true
    })

    const changeMode = useCallback(() => {
        setState(prev => {
            return {
                ...prev,
                isLogin: !prev.isLogin
            }
        })
    }, [])

    let signIn = useCallback(async (event) => {
        event.preventDefault();
        let email = event.target[0].value.trim()
        let password = event.target[1].value.trim()
        if (email === "" || password === "") return
        let response = await axios.post("http://localhost:4000/login", {
            email,
            password
        });
        let data = response.data;
        if (data === null || data === "") return
        document.cookie = `token=${data}`
        checkToken()
    }, [checkToken])

    let register = useCallback(async (event) => {
        event.preventDefault();
        let email = event.target[0].value.trim()
        let password = event.target[1].value.trim()
        if (email === "" || password === "") return
        let response = await axios.post("http://localhost:4000/register", {
            email,
            password
        });
        let data = response.data;
        if (data){
            changeMode()
        }
    }, [changeMode])

    return (
        <div className={classes.Login}>
            <div className={classes.Title}>
                Auth
            </div>
            <form method="POST" onSubmit={state.isLogin ? signIn : register}>
                <input type="text" name="email" placeholder="E-mail"/>
                <input type="password" name="password" placeholder="Password"/>
                <input type="submit" value={state.isLogin ? "Sign in" : "Register"}/>
                <button onClick={changeMode}>{state.isLogin ? "Register" : "Sign in"}</button>
            </form>
        </div>
    );
};

export default Login;