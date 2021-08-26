import React, { Component, Fragment } from 'react'
import Levels from '../Levels'
import ProgressBar from '../ProgressBar'
import { QuizPne } from '../QuizPne'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import QuizOver from "../QuizOver"
import { FaChevronRight } from 'react-icons/fa';
import { withRouter} from 'react-router-dom'

toast.configure()

const intialeState = {
    quizLevel: 0,
    maxQuestion: 10,
    storedQuestions: [],
    question: null,
    options: [],
    idQuestion: 0,
    btnDisabled: true,
    userAnswer: null,
    score: 0,
    showWelcomeMsg: true,
    quizEnd: false,
    percent: null,
    time: "00 : 00"
}

const levelNames= ["debutant", "confirme", "expert"]

class Quiz extends Component {

    constructor(props) {
        super(props)
        this.state = intialeState
        this.storedDataRef = React.createRef()
        this.interval = null
    }

    loadQuestion = (quizz) => {

        const fetchedArrayQuiz = QuizPne[0].quizz[quizz]

        if(fetchedArrayQuiz.length >= this.state.maxQuestion) {
            this.storedDataRef.current = fetchedArrayQuiz

            const newArray = fetchedArrayQuiz.map(({answer, ...keepRest}) => keepRest)
            this.setState({ storedQuestions: newArray })
        }
    }

    componentDidMount() {
        this.loadQuestion(levelNames[this.state.quizLevel])
    }

    componentDidUpdate(prevProps, prevState) {

        const {
            maxQuestion,
            storedQuestions,
            idQuestion,
            score,
            quizEnd,
        } = this.state

        if((storedQuestions !== prevState.storedQuestions) && storedQuestions.length) {
            this.setState({
                question: storedQuestions[idQuestion].question,
                options: storedQuestions[idQuestion].options
            })
        }

        if((idQuestion !== prevState.idQuestion) && storedQuestions.length) {
            this.setState({
                question: storedQuestions[idQuestion].question,
                options: storedQuestions[idQuestion].options,
                btnDisabled: true,
                userAnswer: null
            })
        }

        if(quizEnd !== prevState.quizEnd) {
            const gradePercent = this.getPercentage(score, maxQuestion)
            this.gameOver(gradePercent)
        }

        if(this.props.userData.pseudo !== prevProps.userData.pseudo) {
            this.showToastMsg(this.props.userData.pseudo)
        }   
    }

    submitAnswer = (option) => {
        this.setState({
            userAnswer: option,
            btnDisabled: false
        })
    }

    nextQuestion = () => {

        (this.state.idQuestion === 0) && this.startTimer()

        if(this.state.idQuestion === this.state.maxQuestion - 1) {
            clearInterval(this.interval)
            this.setState({ quizEnd: true })
        } else {
            this.setState( prevState => ({ idQuestion: prevState.idQuestion + 1 }))
        }

        const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer

        if(this.state.userAnswer === goodAnswer) {
            this.setState( prevState => ({ score: prevState.score + 1 }))
            toast.success('Bravo +1', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        } else {
            toast.warn('Raté 0', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        }
    }

    showToastMsg = (pseudo) => {

        if(this.state.showWelcomeMsg) {

            this.setState({ showWelcomeMsg: false })

            toast.info(`Bienvenue ${pseudo}, vous avez 2 minutes pour chaque partie`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
            });
        }
    }

    getPercentage = (note, max) => (note / max) * 100

    gameOver = (percent) => {  

        if(percent >= 50) {
            this.setState({
                quizLevel: this.state.quizLevel + 1,
                percent: percent
            })
        } else {
            this.setState({ percent: percent })
        }
    }

    loadLevelQuestions = (param) => {
        this.setState({...intialeState, quizLevel: param})
        this.loadQuestion(levelNames[param])
    }

    startTimer = () => {

        const countDownTime = Date.now() + 122000

        this.interval = setInterval(() => {
            const now = new Date()
            const distance = countDownTime - now
    
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((distance % (1000 * 60)) / 1000)
    
            if(distance < 0) {
                clearInterval(this.interval)
                this.setState({
                    time: "00 : 00" 
                })
                toast.error(`Oups, le temps est terminé`, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                });
                        
                this.props.history.push("/")
    
            } else {
                const min = (minutes > 9) ? minutes : `0${minutes}`
                const sec = (seconds > 9) ? seconds : `0${seconds}`
                this.setState({
                    time: `${min} : ${sec}`
                })
            }
    
        }, 1000)
    }

    render() {

        const {
            quizLevel,
            maxQuestion,
            question,
            options,
            idQuestion,
            btnDisabled,
            userAnswer,
            score,
            quizEnd,
            percent,
            time
        } = this.state
        
        const displayOptions = options.map((option, index) => {
            return (
                <p className={`answerOptions ${userAnswer === option ? "selected" : null}`}
                    key={index} 
                    onClick={() => this.submitAnswer(option)}>
                    <FaChevronRight />
                    {option}
                </p>
            )
        })

        return (
            quizEnd ? (
                <QuizOver 
                    ref={this.storedDataRef} 
                    levelNames={levelNames}
                    score={score}
                    maxQuestion={maxQuestion}
                    quizLevel={quizLevel}
                    percent={percent}
                    loadLevelQuestions={this.loadLevelQuestions}
                    time={time}
                />
            ) : (
                <Fragment>
                    <Levels levelNames={levelNames} quizLevel={quizLevel} />
                    <ProgressBar 
                        idQuestion={idQuestion} 
                        maxQuestion={maxQuestion} 
                        time={time}
                    />
                    <h2>{question}</h2>
                    {displayOptions}
                    <button className="btnSubmit" 
                        disabled={btnDisabled}
                        onClick={this.nextQuestion}>
                        {(idQuestion < maxQuestion - 1) ? "Suivant" : "Terminer"}
                    </button>
                </Fragment>
            )
        )
    } 
}

export default withRouter(Quiz)