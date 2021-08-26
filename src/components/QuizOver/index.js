import React, { Fragment, useEffect, useState } from 'react'
import { GiTrophyCup } from 'react-icons/gi'
import Modal from '../Modal'

const QuizOver = React.forwardRef((props, ref) => {

    const {levelNames, score, maxQuestion, quizLevel, percent, loadLevelQuestions, time} = props
    
    const [ascked, setAscked] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [infos, setInfos] = useState([])
    
    useEffect(() => {
        setAscked(ref.current)
    }, [ref])

    if(score < maxQuestion / 2) {
        setTimeout(() => {
            loadLevelQuestions(quizLevel)
        }, 3000)
    }
    
    const questionAnswer = (score >= maxQuestion / 2) ? (

        ascked.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.question}</td>
                    <td>{item.answer}</td>
                    <td><button className="btnInfo" onClick={() => showModal(item.infos)}>Info</button></td>
                </tr>
            )
        })
    ) : (
        <tr>
            <td colSpan="3">
                <div className="loader"></div>
                <p style={{textAlign: "center", color: "red"}}>Pas de réponse</p>
            </td>
        </tr>
    )
    
    const decision = (score >= maxQuestion / 2) ? (
        <Fragment>
            <div className="stepsBtnContainer">{
                (quizLevel < levelNames.length) ? (
                    <>
                        <p className="successMsg">Bravo ! passez au niveau suivant</p>
                        <button className="btnResult success" onClick={() => loadLevelQuestions(quizLevel)}>Niveau Suivant</button>
                    </>
                ) : (
                    <>
                        <p className="successMsg">
                            <GiTrophyCup size="50px" />
                            Bravo ! Vous êtes un expert
                        </p>
                        <button className="btnResult gameOver" onClick={() => loadLevelQuestions(0)}>Accueil</button>
                    </>
                )
            }</div>
            <div className="percentage">
                <div className="progressPercent">Réussite: {percent}%</div>
                    <div className="timer"><span>{time}</span></div>
                <div className="progressPercent">Note: {score}/{maxQuestion}</div>
            </div>
        </Fragment>
    ) : (
        <Fragment>
            <div className="stepsBtnContainer">
                <p className="failureMsg">Oups ! Vous avez échoué</p>
            </div>
            <div className="percentage">
                <div className="progressPercent">Réussite: {percent}%</div>
                <div className="progressPercent">Note: {score}/{maxQuestion}</div>
            </div>
        </Fragment>
    )

    const showModal = (id) => {
        setOpenModal(true)
        setInfos(id)
    }

    const hideModale = () => {
        setOpenModal(false)
    }

    return (
        <Fragment>
            {decision}
            <hr />
            <p>Réponses aux questions posées:</p>
            <div className="answerContainer">
                <table className="answers">
                    <thead>
                        <tr>
                            <th>Questions</th>
                            <th>Réponses</th>
                            <th>Infos</th>
                        </tr>
                    </thead>
                    <tbody>{questionAnswer}</tbody>
                </table>
            </div>
            <Modal showModal={openModal} hideModale={hideModale}>
                <div className="modalHeader">
                    <h2>Plus d'infos</h2>
                </div>
                <div className="modalBody">
                    <h3>{infos}</h3>
                </div>
                <div className="modalFooter">
                    <button className="modalBtn">Fermer</button>
                </div>
            </Modal>
        </Fragment>
    )
})

export default React.memo(QuizOver) 
