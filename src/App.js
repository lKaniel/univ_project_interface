import Layout from "./components/Layout/Layout";
import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import Login from "./components/Login/Login";
import FileExplorer from "./components/FileExplorer/FileExplorer";
import PopUp from "./components/PopUp/PopUp";

function App() {

    const [state, setState] = useState({
        isValid: false,
        popup: null,
        reload: false
    })

    let checkToken = useCallback(async () => {
        const cookie = document.cookie;
        let token = "";
        for (const title of cookie.split(";")) {
            if (title.includes("token=")) {
                token = title.replace("token=", "")
            }
        }
        let isValid = await axios.get("http://localhost:4000/test", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (isValid.data === true) {
            setState(prev => {
                return {
                    ...prev,
                    isValid: true
                }
            })
            return
        }
        setState(prev => {
            return {
                ...prev,
                isValid: false
            }
        })

    }, [])

    useEffect(() => {
        checkToken()
    }, [checkToken])

    let reload = useCallback(()=>{
        setState(prev => {
            return{
                ...prev,
                reload:!prev.reload
            }
        })
    },[])

    const openPopup = useCallback((popup)=>{
        setState(prev => {
            return{
                ...prev,
                popup
            }
        })
    },[])
    return (
        <Layout>
            {
                state.popup != null ?
                    <PopUp openPopup={openPopup} type={state.popup} reload={reload}/> : null

            }
            {!state.isValid ? <Login checkToken={checkToken}/>
                : null
            }
            {state.isValid ? <FileExplorer reload={state.reload} openPopup={openPopup}/>
                :null
            }
        </Layout>
    );
}

export default App;
