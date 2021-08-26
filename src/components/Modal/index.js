import React from 'react'

const Modal = ({showModal, children, hideModale}) => {

    return (
        showModal && (
            <div className="modalBackground" onClick={hideModale}>
                <div className="modalContainer">
                    {children}
                </div>
            </div>
        )
    )
}

export default Modal
