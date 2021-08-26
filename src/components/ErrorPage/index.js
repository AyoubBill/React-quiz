import React from 'react'
import panne from "../../images/car1.png"

const ErrorPage = () => {
    return (
        <div className="quiz-bg">
            <div className="container">
                <h2>Oups, cette page n'existe pas</h2>
                <img src={panne} alt="error page" />
            </div>
        </div>
    )
}

export default ErrorPage
