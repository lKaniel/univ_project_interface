import React from 'react';
import classes from "./AdressBar.module.scss"
import add_file_blue from "../../img/add_file_blue.png"
import add_file_white from "../../img/add_file_white.png"
import folder_blue from "../../img/folder_blue.png"
import folder_white from "../../img/folder_white.png"

const AdressBar = ({path, back}) => {
    return (
        <div className={classes.AdressBar}>
            <div className={classes.Back} onClick={back}>
                ⬅
            </div>
            <div className={classes.Bar}>
                {path}
            </div>
            <div className={classes.Create}>
                <img src={add_file_white}/>
                <img src={add_file_blue}/>
            </div>
            <div className={classes.Create}>
                <img src={folder_white} className={classes.small}/>
                <img src={folder_blue} className={classes.small}/>
            </div>
        </div>
    );
};

export default AdressBar;