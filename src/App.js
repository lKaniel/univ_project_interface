import Layout from "./components/Layout/Layout";
import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import Login from "./components/Login/Login";

function App() {

    const [state, setState] = useState({
        isValid: false
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
        // checkToken()
    }, [checkToken])
    return (
        <Layout>
            {!state.isValid ? <Login checkToken={checkToken}/>
                : null
            }
            {state.isValid

            }
        </Layout>
    );
}

export default App;
