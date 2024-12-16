import React from 'react';
import './style.css';

const CustomModal = ({ children, onClose, open = true, title = '' }) => {
    return (
        open && <div className='modal'>
            <div className='modal_box'>
                <i onClick={onClose} className="ri-close-large-fill cross_icon"></i>
                {title && <h3 className='modal_title'> {title} </h3>}
                {children}
            </div>
        </div>
    )
}

export default CustomModal