import React, { Component } from "react";
import "./ModalComfirm.css";

const ModalComfirm = (props) => {
    if (!props.show) return null;
    const ShowHiderClassName = props.show
    ? "Modal__container display.block"
    : "Modal__container display.none";
    return(
        <div className={ShowHiderClassName}>
            <div className="Modal__main">
                <h3 className="text-bold">{props.children}</h3>
            </div>

        </div>
    )
};

export default ModalComfirm;