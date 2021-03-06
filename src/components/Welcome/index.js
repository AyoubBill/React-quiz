import React, { Fragment, useState, useEffect, useContext } from 'react'
import Logout from '../Logout'
import Quiz from '../Quiz'
import { FirebaseContext } from '../Firebase'

const Welcome = (props) => {

    const [userSession, setUserSession] = useState(null)
    const [userData, setUserData] = useState({})

    const firebase = useContext(FirebaseContext)

    useEffect(() => {
        const listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push("/")
        })

        if(!!userSession) {
            firebase.user(userSession.uid)
            .get()
            .then(doc => {
                if(doc && doc.exists) {
                    const myData = doc.data()
                    setUserData(myData)
                }
            })
            .catch(error => {
                console.log(error)
            })
        }

        return () => {
            listener()
        }

    }, [userSession, firebase, props.history])

    return (
        userSession === null ? (
            <Fragment>
                <div className="loader"></div>
                <p className="loaderText">Loading ...</p>
            </Fragment>
        ) : (
            <div className="quiz-bg">
                <div className="container">
                    <Logout />
                    <Quiz userData={userData} />
                </div>
            </div>
        )
    )
}

export default Welcome
