import React from 'react';
import './Button.scss';
const Button = (props) => {
    return (
        <>
            <button className='mybutton'{...props}>{props.children}</button>
        </>
    );
};

export default Button;