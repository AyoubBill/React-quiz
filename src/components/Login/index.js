import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FirebaseContext } from '../Firebase'

const Login = (props) => {

    const firebase = useContext(FirebaseContext)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [btn, setBtn] = useState(false)
    const [error, seterror] = useState("")

    useEffect(() => {
        if(password.length > 5 && email !== "") {
            setBtn(true)
        } else if(btn) {
            setBtn(false)
        }
    }, [email, password, btn])

    const handleSubmit = (e) => {
        e.preventDefault()
        firebase.loginUser(email, password)
        .then(user => {
            setEmail("")
            setPassword("")
            props.history.push("/welcome")
        })
        .catch(error => {
            seterror(error)
            setEmail("")
            setPassword("")
        })
    }

    //gestion d'erreur
    const errorMsg = (error !== "") && <span>{error.message}</span>

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftLogin">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">
                        {errorMsg}
                        <h2>Connexion</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="inputBox">
                                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" id="email" autoComplete="off" required />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="inputBox">
                                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" id="password" autoComplete="off" required />
                                <label htmlFor="password">Mot de passe</label>
                            </div>
                            {btn ? <button>Connexion</button> : <button disabled>Connexion</button>}
                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/signup">Inscrivez-vous</Link>
                            <br />
                            <Link className="simpleLink" to="/forgetpassword">Mot de passe oublié</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
