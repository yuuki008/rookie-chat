import React, { useState, useCallback } from 'react'
import { auth, db, FirebaseTimestamp } from '../../firebase';
import PrimaryButton from '../UIkit/PrimaryButton'
import TextInput from '../UIkit/TextInput';
import {withRouter} from 'react-router'

const SignUp = (props) => {
    const [username, setUsername] = useState(""),
          [email, setEmail] = useState(""),
          [password, setPassword] = useState(""),
          [confirmPassword, setConfirmPassword] = useState("");

    const inputUsername = useCallback((event) => {
        setUsername(event.target.value)
    }, [setUsername])

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    }, [setEmail])

    const inputPassword = useCallback((event) => {
        setPassword(event.target.value)
    }, [setPassword])

    const inputConfirmPassword = useCallback((event) => {
        setConfirmPassword(event.target.value)
    }, [setConfirmPassword])

    const signUp = (e) => {
        e.preventDefault()
        if(username === "" || email === "" || password === ""){
            return false
        }
        if(password !== confirmPassword){
            return false
        }
        auth.createUserWithEmailAndPassword(email, password)
        .then(result => {
            const user = result.user
            if(user){
                const uid = user.uid
                const timestamp = FirebaseTimestamp.now()
                const data = {
                    created_at: timestamp,
                    eamil: email,
                    uid: uid,
                    username: username,
                }
                db.collection('users').doc(uid).set(data)
                .then(() => {
                    props.history.push('/signin')
                })
            }
        })
        .catch(error => console.log(error))
    }

    return (
        <div className="c-section-container">
            <h2 className="u-text__headline u-text-center">アカウント登録</h2>
            <div className="module-spacer--medium" />
            <TextInput 
                fullWidth={true} label={"ユーザー名"} multiline={false} required={true} 
                rows={1} value={username} type={"text"} onChange={inputUsername}
            />
            <TextInput 
                fullWidth={true} label={"メールアドレス"} multiline={false} required={true} 
                rows={1} value={email} type={"email"} onChange={inputEmail}
            />
            <TextInput 
                fullWidth={true} label={"パスワード"} multiline={false} required={true} 
                rows={1} value={password} type={"password"} onChange={inputPassword}
            />
            <TextInput 
                fullWidth={true} label={"パスワード（再確認）"} multiline={false} required={true} 
                rows={1} value={confirmPassword} type={"password"} onChange={inputConfirmPassword}
            />
            <div className="module-spacer--medium"/>
            <div className="center">
                <PrimaryButton 
                    label={"アカウントを登録する"}
                    onClick={signUp}
                />
                <div className="module-spacer--medium"/>
                <p
                onClick={() => props.history.push('/signin')}
                >アカウントをお持ちの方はこちら</p>
            </div>
        </div>
    )
}

export default SignUp