import React, {useCallback, useEffect, useState} from 'react';
import AdressBar from "../AdressBar/AdressBar";
import FileContainer from "../FileContainer/FileContainer";
import axios from "axios";
const FileDownload = require('js-file-download');

const FileExplorer = ({openPopup, reload}) => {

    const [state, setState] = useState({
        path: "/",
        files: []
    })

    const getFiles = useCallback(async () => {
        const cookie = document.cookie;
        let token = "";
        for (const title of cookie.split(";")) {
            if (title.includes("token=")) {
                token = title.replace("token=", "")
            }
        }
        const response = await axios.get(`http://localhost:4000/getfiles?path=${state.path}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response.data)
        setState(prev => {
            return {
                ...prev,
                files: response.data
            }
        })
    }, [state.path])

    useEffect(() => {
        getFiles()
    }, [getFiles, reload])

    const clickOnFolder = useCallback(name => {
        setState(prev => {
            return {
                ...prev,
                path: `${prev.path}${name}/`
            }
        })
    }, [])

    const back = useCallback(() => {
        setState(prev => {
            if (prev.path === "/") return {...prev}
            let path = prev.path.split("/");
            console.log(path)
            path.splice(path.length - 2,1)
            console.log(path)
            path = path.join("/")
            return {
                ...prev,
                path
            }
        })
    })

    const clickOnFile = useCallback(async (name) => {
        const cookie = document.cookie;
        let token = "";
        for (const title of cookie.split(";")) {
            if (title.includes("token=")) {
                token = title.replace("token=", "")
            }
        }
        const response = await axios({
            method: 'GET',
            url:`http://localhost:4000/download?path=${state.path}${name}`,
            responseType: 'blob',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        FileDownload(response.data, name);
    }, [state.path])

    return (
        <div>
            <AdressBar path={state.path} back={back} openPopup={openPopup}/>
            <FileContainer files={state.files} clickOnFolder={clickOnFolder} clickOnFile={clickOnFile}/>
        </div>
    );
};

export default FileExplorer;