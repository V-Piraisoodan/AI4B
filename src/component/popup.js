import React from "react";
import "./popup.css"

const Popup = (props) => {
  return (
    <div className="popup-con" ref={props.popref}>
        <button onClick={props.handleClose} className="del-btn">x</button>
        <div className="popup-val">{props.content}</div>
    </div>
  )
}
export default Popup