import React, { useEffect, useState, useContext } from 'react'
import { FirebaseContext } from '../Firebase'
import ReactTooltip from 'react-tooltip';

const Logout = () => {

    const firebase = useContext(FirebaseContext)

    const [checked, setChecked] = useState(false)

    useEffect(() => {
        if(checked) {
            console.log("ko")
            firebase.signoutUser()
        }
    }, [checked, firebase])

    const handleChange = (e) => {
        setChecked(e.target.checked)
    }

    return (
        <div className="logoutContainer">
            <label className="switch">
                <input 
                    onChange={handleChange}
                    type="checkbox" 
                    checked={checked}
                />
                <span className="slider round" data-tip="Deconnexion"></span>
            </label>
            <ReactTooltip place="left" effect="solid" />
        </div>
    )
}

export default Logout
