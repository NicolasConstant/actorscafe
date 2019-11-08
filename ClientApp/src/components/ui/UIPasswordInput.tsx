import React, { InputHTMLAttributes, Fragment, useState } from "react";
import css from "./UI.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function UIPasswordInput(props: InputHTMLAttributes<HTMLInputElement> & {
    hasAutoComplete?: boolean;
}) {
    const [eye, setEye] = useState(false);
    return (
        <div className={css.passwordContainer}>
            <input type={eye ? "text" : "password"} autoComplete={props.hasAutoComplete ? "new-password" : props.autoComplete} {...props} className={css.textInput} />
            <div className={css.passwordEye}>
                <FontAwesomeIcon icon="eye" onMouseDown={() => setEye(true)} onMouseUp={() => setEye(false)} />
            </div>
        </div>
    );
}

