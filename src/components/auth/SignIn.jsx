import React, { useState, useCallback } from 'react'
import { auth } from '../../firebase';
import PrimaryButton from '..//UIkit/PrimaryButton';
import TextInput from '../UIkit/TextInput';

const SignIn = (props) => {  
    const [email, setEmail] = useState(""),
          [password, setPassword] = useState("");
  
    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    }, [setEmail])

    const inputPassword = useCallback((event) => {
        setPassword(event.target.value)
    }, [setPassword])

    const signIn = (e) => {
        e.preventDefault()
        if(email === "" || password === ""){
            alert('必須入力が未入力です!')
            return false
        }
        auth.signInWithEmailAndPassword(email, password)
        .then(() => props.history.push('/'))
        .catch(error => console.log(error))
    }

    return (
        <div className="c-section-container">
            <h2 className="u-text__headline u-text-center">サインイン</h2>
            <div className="module-spacer--medium" />

            <TextInput 
                fullWidth={true} label={"メールアドレス"} multiline={false} required={true} 
                rows={1} value={email} type={"email"} onChange={inputEmail}
            />
            <TextInput 
                fullWidth={true} label={"パスワード"} multiline={false} required={true} 
                rows={1} value={password} type={"password"} onChange={inputPassword}
            />

            <div className="module-spacer--medium"/>
            <div className="center">
                <PrimaryButton 
                    label={"Sign in"}
                    onClick={signIn}
                />
                <div className="module-spacer--medium"/>
                <p
                onClick={() => props.history.push('/signup')}
                >
                    アカウント登録はこちら
                </p>
                <p
                onClick={() => props.history.push('/reset')}
                >
                    パスワードをお忘れの方はこちら
                </p>
            </div>
        </div>
    )
}

export default SignIn
