import React, {useCallback} from 'react';
import classes from "./PopUp.module.scss"
import axios from "axios";

const PopUp = ({openPopup, type, reload}) => {

    let addFolder = useCallback(async (event) => {
        event.preventDefault();
        const cookie = document.cookie;
        let token = "";
        for (const title of cookie.split(";")) {
            if (title.includes("token=")) {
                token = title.replace("token=", "")
            }
        }
        let name = event.target[0].value.trim()
        if (name === "") return
        let response = await axios.post("http://localhost:4000/addfolder", {
            path: type.path,
            name: name
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        openPopup(null)
        reload()
    }, [openPopup, reload, type.path])

    return (
        <div className={classes.PopUpWrap} onClick={(e) => {
            if (e.target !== e.currentTarget) return;
            openPopup(null)
        }}>
            <div className={classes.PopUp}>
                <form method="POST" onSubmit={addFolder}>
                    {
                        type.name === "folder" ?
                            <input type="text" placeholder="Folder name"/>
                            :
                            <label>
                                Choose a file
                            <input hidden={true} type="file" placeholder="Upload file"/>
                            </label>
                    }

                    <input type="submit" value="create"/>
                </form>
            </div>
        </div>
    );
};

export default PopUp;