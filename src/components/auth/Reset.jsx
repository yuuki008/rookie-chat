import React, { useState, useCallback } from 'react'
import TextInput from '../UIkit/TextInput'
import PrimaryButton from '../UIkit/PrimaryButton';
import { auth } from '../../firebase';

const Reset = (props) => { 
    const [email, setEmail] = useState("")

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    }, [setEmail])

    const resetPassword = (e) => {
        e.preventDefault()
        if(email === ""){
            alert('必須項目が未入力です')
            return false
        }
        auth.sendPasswordResetEmail(email)
        .then(() => {
            alert('入力されたアドレスにパスワードリセット用のパスワードを送信しました。')
            props.history.push('/signin')
        })
        .catch(() => {
            alert('送信失敗しました。通信環境を整えてサイドお試しください!')
        })
    }

    return (
        <div className="c-section-container">
            <h2 className="u-text__headline u-text-center">パスワードのリセット</h2>
            <div className="module-spacer--medium" />

            <TextInput 
                fullWidth={true} label={"メールアドレス"} multiline={false} required={true} 
                rows={1} value={email} type={"email"} onChange={inputEmail}
            />
            <div className="module-spacer--medium"/>
            <div className="center">
                <PrimaryButton 
                    label={"Reset Password"}
                    onClick={resetPassword}
                />
                <div className="module-spacer--medium"/>
                <p
                onClick={() => props.history.push('/signup')}
                >アカウント登録はこちら</p>
                <p
                onClick={() => props.history.push('/signin')}
                >アカウントをお持ちの方はこちら</p>
            </div>
        </div>
    )
}

export default Reset