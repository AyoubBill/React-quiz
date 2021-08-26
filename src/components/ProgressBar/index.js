import React, { Fragment } from 'react'

const ProgressBar = ({idQuestion, maxQuestion, time}) => {
    
    const actualQuestion = idQuestion + 1

    return (
        <Fragment>
            <div className="percentage">
                <div className="progressPercent">{`Question: ${actualQuestion}/${maxQuestion}`}</div>
                    <div className="timer"><span>{time}</span></div>
                <div className="progressPercent">{`Progression: ${actualQuestion * 10}%`}</div>
            </div>
            <div className="progressBar">
                <div className="progressBarChange" style={{width: `${actualQuestion * 10}%`}}></div>
            </div>
        </Fragment>
    )
}

export default ProgressBar
