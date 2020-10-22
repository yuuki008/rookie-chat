import React, { createContext, useEffect, useState } from 'react'
import {db, auth} from './firebase/index'

export const AuthContext = createContext()


export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    
    const signOut = () => {
        auth.signOut()
        .then(() => {
            setUser(null)
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
        }
        })
    },[])

    return (
        <AuthContext.Provider value={user} signOut={signOut}>
            {children}
        </AuthContext.Provider>
    )
}

