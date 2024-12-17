import React from 'react';

const CustomModal = ({ children, onClose, open = true, title = 'Update Note' }) => {
    return (
        open && <div className='fixed top-0 left-0 h-full w-full flex items-center justify-center bg-[rgba(0,0,0,0.2)]'>
            <div className='min-h-[20%] w-[450px] bg-white shadow-md rounded-lg relative p-[2%] flex flex-col gap-3'>
                <i onClick={onClose} className="ri-close-large-fill absolute top-[12px] right-[12px] cursor-pointer text-[20px]"></i>
                {title && <h3 className='py-[12px]'> {title} </h3>}
                {children}
            </div>
        </div>
    )
}

export default CustomModal