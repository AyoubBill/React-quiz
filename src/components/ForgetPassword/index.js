import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { FirebaseContext } from '../Firebase'

const ForgetPassword = (props) => {

    const firebase = useContext(FirebaseContext)

    const [email, setEmail] = useState("")
    const [succes, setSucces] = useState(null)
    const [error, setError] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        firebase.passwordReset(email)
        .then(() => {
            setError(null)
            setSucces("Merci de consulter votre email, pour changer le mot de passe")
            setEmail("")
            setTimeout(() => {
                props.history.push("/login")
            }, 5000)
        })
        .catch(error => {
            setError(error)
            setEmail("")
        })
    }

    const disabled = email === ""
    const succesMsg = succes && <span className="btn-succes">{succes}</span>
    const errorMsg = error && <span>{error.message}</span>

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftForget">
                </div>
                <div className="formBoxRight">
                    <div className="formContent">
                        {succesMsg}
                        {errorMsg}
                        <h2>Mot de passe oublié</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="inputBox">
                                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" id="email" autoComplete="off" required />
                                <label htmlFor="email">Email</label>
                            </div>
                            <button disabled={disabled}>Récupérer</button>
                        </form>
                        <div className="linkContainer">
                            <Link className="simpleLink" to="/login">Connectez-vous</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword
