import React from 'react';
import classes from "./FileContainer.module.scss"
import file from "../../img/file.png";
import folder from "../../img/folder.png"

const FileContainer = ({files, clickOnFolder}) => {

    let i = 0
    files = files?.map((element, index) => {
        i += 1;
        if (element.file === ".DS_Store") return null
        return (
            <div className={classes.FileWrap} key={i} onClick={element.isDir ? ()=>{clickOnFolder(element.file)} : null}>
                <img className={classes.Icon} src={element.isDir ? folder : file}/>
                <div className={classes.Name}>
                    {element.file}
                </div>
            </div>
        )
    })

    return (
        <div className={classes.FileContainer}>
            {files}
        </div>
    );
};

export default FileContainer;