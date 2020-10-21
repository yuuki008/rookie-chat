import React, { createContext, useContext, useEffect, useState } from 'react'
import {db, auth} from './firebase/index'

export const AuthContext = createContext()


export const AuthProvider = ({props, children}) => {
    const [user, setUser] = useState(null)
    const path = window.location.pathname
    
    const signOut = () => {
        auth.signOut()
        .then(() => {
            setUser(null)
            props.history.push('/signin')
        })
    }
    
    useEffect(() => {
        auth.onAuthStateChanged(user => {
        if(user){
            const uid = user.uid
            db.collection('users').doc(uid).get()
            .then(snapshot => {
                const data = snapshot.data()
                setUser(data)
            })
        }else{
            if(path === "/"){
                props.hisotry.push('/signin')
            }
        }
        })
    },[])

    return (
        <AuthContext.Provider value={user} signOut={signOut}>
            {children}
        </AuthContext.Provider>
    )
}

