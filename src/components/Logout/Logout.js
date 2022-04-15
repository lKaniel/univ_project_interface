import React from 'react';
import classes from "./Logout.module.scss"

const Logout = ({checkToken}) => {
    return (
        <button className={classes.Logout} onClick={()=>{
            document.cookie = `token=null`
            checkToken()
        }}>
            Logout
        </button>
    );
};

export default Logout;